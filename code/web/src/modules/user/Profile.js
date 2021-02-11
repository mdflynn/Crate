// Imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ProfileModal } from "../../ui/modal/index";
import EditProfileForm from "../../ui/form/EditProfileForm";

// UI Imports
import { Grid, GridCell } from "../../ui/grid";
import { H2, H3, H4 } from "../../ui/typography";
import Button from "../../ui/button";
import {
  grey,
  grey2,
  primaryAccent,
  secondaryAccent,
} from "../../ui/common/colors";
import { Tile } from "../../ui/image";
import { level5 } from "../../ui/common/shadows";
import OrderHistory from "./OrderHistory";

// App Imports
import userRoutes from "../../setup/routes/user";
import { logout } from "./api/actions";
import { routeImage } from "../../setup/routes/index";

// props.user.details.name
const mockOrderData = [
  {
    user: {
      details: {
        id: 1,
        crateName: "Men's Accesories",
        deliveryDate: "1612221348680",
        orderProducts: [
          {
            name: "Belt for Men",
            returned: false,
          },
          {
            name: "Watch for Men",
            returned: true,
          },
        ],
        status: "delivered",
      },
    },
  },
  {
    user: {
      details: {
        id: 2,
        crateName: "Men's Clothing",
        deliveryDate: "1612221348744",
        orderProducts: [
          {
            name: "Shirt for Men",
            returned: false,
          },
          {
            name: "Pants for Men",
            returned: false,
          },
        ],
        status: "pending delivery",
      },
    },
  },
  {
    user: {
      details: {
        id: 3,
        crateName: "Men's Clothing",
        deliveryDate: "1612303095881",
        orderProducts: [
          {
            name: "Shirt for Men",
            returned: true,
          },
        ],
        status: "pending delivery",
      },
    },
  },
];

const sortOrderHistory = () => {
  return mockOrderData.sort((a, b) => {
    return b.user.details.deliveryDate - a.user.details.deliveryDate;
  });
};

const generateOrderHistory = () => {
  const sortedOrders = sortOrderHistory();
  return sortedOrders.map((order, index) => {
    return <OrderHistory key={index} data={order} />;
  });
};

const displayOrders = generateOrderHistory();

// Component
const Profile = props => {
  const { user, logout } = props;

  const [edit, setEdit] = useState(false);

  const showEditProfileModal = e => {
    setEdit(!edit);
  };

  return (
    <div>
      {/* SEO */}
      <Helmet>
        <title>My Profile - Crate</title>
      </Helmet>

      {/* Top title bar */}
      <Grid style={{ backgroundColor: grey }}>
        <GridCell style={{ padding: "2em", textAlign: "center" }}>
          <H3 font="primary">Details & Orders</H3>
        </GridCell>
      </Grid>

      {/* modal fixed and hidden */}
      <ProfileModal visible={edit}>
        <EditProfileForm>
          <Button theme="secondary" onClick={() => setEdit(!edit)}>
            CLOSE
          </Button>
        </EditProfileForm>
      </ProfileModal>

      <Grid>
        <GridCell style={{ margin: "2em", minHeight: "60vh", display:'flex' }}>
          <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {user.details.image && (
              <img
                src={routeImage + user.details.image}
                alt="User Image"
                style={{
                  width: "100%",
                  maxHeight: "70vh",
                  borderRadius: "15px",
                  boxShadow: '4px 4px 20px 0px #00000038'
                }}
              />
            )}
          </div>
        </GridCell>

        {/* User Profile Details */}
        <GridCell
          style={{
            width: "25%",
            // backgroundImage: 'linear-gradient(76deg, #cf9ffc57, #7368f0ba)',
            borderRadius: '15px',
            padding: '3em',
            border: 'solid',
            // borderColor: secondaryAccent,
            // borderStyle: "solid",
            display: "flex",
            flexDirection: "column",
            margin: '2em'
          }}>
          <caption
            style={{
              // backgroundColor: "hotpink",
              // border: "solid 3px gray",
              borderRadius: "5px",
              width: "100%",
              height: '8em'
            }}>
            <h3 style={{ marginBottom: "0.5em", fontSize:'2em', color: 'black' }}>
              {user.details?.description}
            </h3>
          </caption>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}>
              <H4>
                {props.user.details.name}
              </H4>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}>
              <H4>EMAIL </H4>
              <p
                style={{
                  color: 'black',
                  fontSize: "1.5em",
                  marginBottom: "2em",
                }}>
                {props.user.details.email}
              </p>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}>
            <H4>ADDRESS </H4>
            <p style={{ color: 'black', fontSize: "1.5em", marginBottom: "2em" }}>
              {`${user.details.streetAddress}`}
              <br />
              {`${user.details.city}, ${user.details.state} ${user.details.zip}`}
            </p>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}>
            <H4>Perferred Shipping Date: </H4>
            <p
              style={{
                color: 'black',
                fontSize: "1.5em",
                marginBottom: "2em",
                alignSelf: "center",
              }}>
              2nd week of the month
            </p>
          </div>
        </GridCell>
      </Grid>

      <section
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "3em",
        }}>
        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>
        <Button
          theme="secondary"
          onClick={logout}
          style={{ marginLeft: "1em" }}>
          Logout
        </Button>
        <Button
          theme="secondary"
          onClick={() => setEdit(!edit)}
          style={{ marginLeft: "1em" }}>
          EDIT PREFS
        </Button>
      </section>

      {/* Order history display */}
      <Grid
        style={{
          padding: "2em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <H2 font="secondary" style={{ alignSelf: "start" }}>
          Orders
        </H2>
        <GridCell
          style={{
            padding: "2em",
            borderWidth: 5,
            borderColor: primaryAccent,
            borderStyle: "solid",
            borderRadius: "1em",
          }}>
          {displayOrders}
        </GridCell>
      </Grid>
    </div>
  );
};

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

// Component State
function profileState(state) {
  return {
    user: state.user,
  };
}

export default connect(profileState, { logout })(Profile);
