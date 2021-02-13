// Imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ProfileModal } from "../../ui/modal/index";
import EditProfileForm from "../../ui/form/EditProfileForm";
// impor {placeholder} from './profile-placeholder.svg'

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

// Mock Data
import mockOrderData from './mockOrderData'

const sortOrderHistory = () => {
  const orderData = cleanData();
  return orderData.sort((a, b) => {
    return b.deliveryDate - a.deliveryDate;
  });
};

const cleanData = () => {
  return mockOrderData.user.subscriptions.reduce((accum, subscription) => {
    let orderData = {
      deliveryDate: "",
      status: "",
      crateName: subscription.crate.name,
      orderProducts: [],
    };

    subscription.orders.forEach(order => {
      orderData.deliveryDate = order.deliveryDate;
      orderData.status = order.status;

      order.orderProducts.forEach(product => {
        orderData.orderProducts.push(product);
      });
    });
    accum.push(orderData);
    return accum;
  }, []);
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
  
  const profileImage = () => {
    if (user.details.image === null || user.details.image === "") {
      return "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    } else if (user.details.image.charAt(0) === "/") {
      return routeImage + user.details.image;
    } else {
      return user.details.image;
    }
  };

  return (
    <div style={{ backgroundColor: 'cornsilk'}}>
      {/* SEO */}
      <Helmet>
        <title>My Profile - Crate</title>
      </Helmet>

      {/* Top title bar */}
      <Grid style={{ backgroundColor: grey }}>
        <GridCell style={{ padding: "2em", textAlign: "center" }}>
          <H2 font="secondary">Details & Orders</H2>
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

      <Grid style={{justifyContent: 'center', margin: '0 4vh'}}>

        <div className="profile-image-container">
          <div className="profile-image">
            {user.details.image && (
              <img src={profileImage()} alt="User Image" />
            )}
          </div>
        </div>

        {/* User Profile Details */}
        <div className="user-details-container">
          <h3>
            {user.details.description
              ? user.details.description
              : "Edit your profile and add a description to tell us a little about yourself..."}
          </h3>
          <div>
            <H4>{props.user.details.name}</H4>
          </div>
          <div>
            <H4>EMAIL </H4>
            <p>{props.user.details.email}</p>
          </div>
          <div>
            <H4>ADDRESS </H4>
            <p>
              {`${user.details.streetAddress}`}
              <br />
              {`${user.details.city}, ${user.details.state} ${user.details.zip}`}
            </p>
          </div>
        </div>
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
        <H2 font="secondary">
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

      <style jsx>{`
        .profile-image-container {
          margin: 2em;
          max-height: 90%;
          display: flex;
          justify-content: center;
          flex: 1;
        }
        .profile-image {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .profile-image img {
          width:100%;
          border-radius: 15px;
          box-shadow: 4px 4px 20px 0px #00000038;
        }
        .user-details-container {
          flex: 1;
          width: 25% !important;
          border-radius: 15px !important;
          padding: 3em !important;
          border: solid !important;
          display: flex !important;
          flex-direction: column !important;
          margin: 2em !important;
          box-shadow: 3px 6px 20px 0px #00000038 !important;
        }
        h3 {
          margin-bottom: 0.5em;
          font-size: 1.5em;
          font-weight: 300;
          color: black;
        }
        .user-details-container div {
          flex: 1;
          display: flex;
          justify-content: space-between;
        }
        .user-details-container div p {
          color: black;
          font-size: 1.5em;
          margin-bottom: 2em;
        }
        section {
          padding: 3em;
          background-image: linear-gradient(45deg, #d59ddca3, #5740d2e0);
        }
      `}</style>
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
