// Imports
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

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
    return  b.user.details.deliveryDate - a.user.details.deliveryDate
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
const Profile = (props) => (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: "2em", textAlign: "center" }}>
        <H3 font="secondary">{props.user.details.name}'s profile</H3>
      </GridCell>
    </Grid>

    {/* User image and description */}
    <Grid
      style={{
        borderWidth: 5,
        borderColor: primaryAccent,
        borderStyle: "solid",
      }}
    >
      <GridCell
        style={{
          width: "25%",
          borderWidth: 5,
          borderColor: secondaryAccent,
          borderStyle: "solid",
        }}
      >
        <Tile
          image="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"
          width={250}
          height={250}
          shadow={level5}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        ></Tile>
        <H3
          font="secondary"
          style={{
            textAlign: "center",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "lightblue",
          }}
        >
          I ❤️ taking pictures of food and buying clothes
        </H3>
      </GridCell>

      {/* User Profile Details */}
      <GridCell
        style={{
          width: "25%",
          borderWidth: 5,
          borderColor: secondaryAccent,
          borderStyle: "solid",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{ flex: 1, display: "flex", justifyContent: "space-between" }}
        >
          <H4>EMAIL </H4>
          <p style={{ color: grey2, fontSize: "1.5em", marginBottom: "2em" }}>
            {props.user.details.email}
          </p>
        </div>
        <div
          style={{ flex: 1, display: "flex", justifyContent: "space-between" }}
        >
          <H4>ADDRESS </H4>
          <p style={{ color: grey2, fontSize: "1.5em", marginBottom: "2em" }}>
            12345 Main Lane
            <br />
            Coolsville, CO, 80420
          </p>
        </div>
        <div
          style={{ flex: 1, display: "flex", justifyContent: "space-between" }}
        >
          <H4>Perferred Shipping Date: </H4>
          <p
            style={{
              color: grey2,
              fontSize: "1.5em",
              marginBottom: "2em",
              alignSelf: "center",
            }}
          >
            2nd week of the month
          </p>
        </div>
        <div style={{ flex: 1, alignSelf: "flex-end" }}>
          <Link to="/edit-profle">
            <Button type="button" theme="primary" style={{ marginLeft: "1em" }}>
              edit profile
            </Button>
          </Link>
        </div>
      </GridCell>
    </Grid>

    {/* Order history display */}
    <Grid
      style={{
        padding: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
        }}
      >
        {displayOrders}
      </GridCell>
    </Grid>

    {/* Subsription and logout buttons */}
    <Grid style={{ padding: "2em", textAlign: "center" }}>
      <GridCell>
        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button
          theme="secondary"
          onClick={props.logout}
          style={{ marginLeft: "1em" }}
        >
          Logout
        </Button>
      </GridCell>
    </Grid>
  </div>
);

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
