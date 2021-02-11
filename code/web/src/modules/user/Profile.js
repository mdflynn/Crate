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
  white,
  grey,
  grey2,
  primaryAccent,
  secondaryAccent,
} from "../../ui/common/colors";
import { Tile } from "../../ui/image";
import Card from "../../ui/card";
import { level5 } from "../../ui/common/shadows";
import { APP_URL } from "../../setup/config/env";

// App Imports
import userRoutes from "../../setup/routes/user";
import { logout, update } from "./api/actions";

const mockedDetails = 
{
  name: "DUH ADMIN",
  streetAddress: "123 Admin St",
  email: "coolemail@stuff.com",
  city: "Denver",
  state: "Colorado",
  zip: "80123",
  country: "USA",
  image: "https://www.chicagotribune.com/resizer/NUc4EPJ-swl5GzWbfbKR8vH0pd0=/800x440/top/www.trbimg.com/img-546459ac/turbine/redeye-jake-from-state-farm-commercial-20141112",
  description: "Jake from State Farm"
}

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
const Profile = (props) => {
  
  const {user} = props

  function saveFakeDataToUser() {
    console.log(user)
    props.update(mockedDetails)
  }

  return(
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: "2em", textAlign: "center" }}>
        <H3 font="secondary">{user.details.name}'s profile</H3>
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
          image={user.details.image ? user.details.image : "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"}
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
          {user.details.description}
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
            {user.details.email}
          </p>
        </div>
        <div
          style={{ flex: 1, display: "flex", justifyContent: "space-between" }}
        >
          <H4>ADDRESS </H4>
          <p style={{ color: grey2, fontSize: "1.5em", marginBottom: "2em" }}>
            {user.details.streetAddress}
            <br />
            {`${user.details.city}, ${user.details.state} ${user.details.zip}`}
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
          {/* <Link to="/edit-profle"> */}
            <Button type="button" theme="primary" style={{ marginLeft: "1em" }} onClick={saveFakeDataToUser}>
              UPDATE WITH CANNED DATA
            </Button>
          {/* </Link> */}
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
)};

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

// Component State
function profileState(state) {
  return {
    user: state.user,
  };
}

export default connect(profileState, { logout, update })(Profile);