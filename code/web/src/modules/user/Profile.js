// Imports
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

// UI Imports
import { Grid, GridCell } from "../../ui/grid";
import { H3, H4 } from "../../ui/typography";
import Button from "../../ui/button";
import {
  white,
  grey,
  grey2,
  black,
  primaryAccent,
  secondaryAccent,
} from "../../ui/common/colors";
import { Tile } from "../../ui/image";
import Card from "../../ui/card";
import { level1 } from "../../ui/common/shadows";
import { APP_URL } from "../../setup/config/env";

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
        deliveryDate: "02/20/2021",
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
        deliveryDate: "03/20/2021",
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
        deliveryDate: "04/20/2021",
        orderProducts: [
          {
            name: "Shirt for Men",
            returned: false,
          },
        ],
        status: "pending delivery",
      },
    },
  },
];

const generateOrderHistory = () => {
  return mockOrderData.map((order) => {
    return (
      <Card
        key={order.user.details.id}
        style={{
          backgroundColor: grey,
          borderWidth: 5,
          borderColor: secondaryAccent,
          borderStyle: "solid",
          display: "flex",
          width: "80em",
          backgroundColor: white,
          marginBottom: "2em",
          justifyContent: "space-between",
          borderRadius: "1em",
        }}
      >
        <div style={{ padding: "1em 1.2em", width: "250px" }}>
          <img
            src={`${APP_URL}/images/crate.png`}
            alt={order.crateName}
            style={{ width: "100%" }}
          />
          <p style={{ color: grey2, marginTop: "1em" }}>
            {order.user.details.crateName}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "1em 1.2em",
          }}
        >
          <H3 font="secondary">
            Deliverd on: {order.user.details.deliveryDate}
          </H3>
          <H3 font="secondary">Items: TBD </H3>
          <H3 font="secondary">Status: {order.user.details.status}</H3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1em 1.2em",
          }}
        >
          <Button style={{ marginBottom: "10px" }} theme="primary">
            KEEP Items
          </Button>
          <Button style={{ marginTop: "10px" }} theme="secondary">
            RETURN Items
          </Button>
        </div>
      </Card>
    );
  });
};

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
          shadow={level1}
          style={{ margin: "auto" }}
        ></Tile>
        <H3
          font="secondary"
          style={{
            textAlign: "center",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "lightblue"
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
          flexDirection: "column"
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
          <H4>EMAIL </H4>
          <p style={{ color: grey2, fontSize: "1.5em", marginBottom: "2em" }}>
            {props.user.details.email}
          </p>
          <Button type="button" theme="primary" style={{ marginLeft: "1em" }}>
            edit
          </Button>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
          <H4>ADDRESS </H4>

          <p style={{ color: grey2, fontSize: "1.5em", marginBottom: "2em" }}>
            12345 Main Lane
            <br />
            Coolsville, CO, 80420
          </p>
          <Button type="button" theme="primary" style={{ marginLeft: "1em" }}>
            edit
          </Button>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
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
          <Button type="button" theme="primary" style={{ marginLeft: "1em" }}>
            edit
          </Button>
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
      <H3 font="secondary" style={{ alignSelf: "start" }}>Orders</H3>
      <GridCell
        style={{
          padding: "2em",
          borderWidth: 5,
          borderColor: primaryAccent,
          borderStyle: "solid",
          borderRadius: "1em",
        }}
      >
        {generateOrderHistory()}
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

{
  /* <Card style={{ width: "18em", backgroundColor: white }}>
<p style={{ padding: "2em 3em 0 3em" }}>
  <img
    src='https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg'
    alt="test alt"
    style={{ width: "100%" }}
  />
</p>
<div style={{ padding: "1em 1.2em" }}>
  <H4 font="secondary" style={{ color: black }}>
    Men's Clothes
  </H4>
</div>
</Card> */
}
