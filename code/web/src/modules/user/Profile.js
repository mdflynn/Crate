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
import { white, grey, grey2, black } from "../../ui/common/colors";
import { Tile } from "../../ui/image";
import Card from "../../ui/card";
import { level1 } from "../../ui/common/shadows";

// App Imports
import userRoutes from "../../setup/routes/user";
import { logout } from "./api/actions";

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
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    <Grid>
      <GridCell style={{ padding: "2em", textAlign: "center" }}>
        <H4 style={{ marginBottom: "0.5em" }}>{props.user.details.name}</H4>

        <p style={{ color: grey2, marginBottom: "2em" }}>
          {props.user.details.email}
        </p>
      </GridCell>
    </Grid>

    <Grid>
      <GridCell>
        <Tile
          image="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"
          width={250}
          height={250}
          shadow={level1}
        ></Tile>
        <H3 font="secondary">User Description</H3>
      </GridCell>
      <GridCell>
        <Tile
          image="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"
          width={250}
          height={250}
          shadow={level1}
        ></Tile>
      </GridCell>
    </Grid>

    <Grid style={{ padding: "2em" }}>
      <GridCell style={{ padding: "2em" }}>
        {/* create function to generate cards */}

        <Card
          style={{
            display: "flex",
            width: "80em",
            backgroundColor: white,
            marginBottom: "2em",
            justifyContent: "space-around"
          }}
        >
          <div style={{ padding: "1em 1.2em" }}>
            <H4 font="secondary" style={{ color: black }}>
              CRATE INFO
            </H4>
            <p style={{ color: grey2, marginTop: "1em" }}>More Info</p>
          </div>
          <div style={{ padding: "1em 1.2em" }}>
            <H3 font="secondary">Deliverd on</H3>
            <H3 font="secondary">Items</H3>
            <H3 font="secondary">Status</H3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1em 1.2em",
            }}
          >
            <Button theme="primary">KEEP Items</Button>
            <Button theme="secondary">RETURN Items</Button>
          </div>
        </Card>

        <Card
          style={{
            display: "flex",
            width: "80em",
            backgroundColor: white,
            marginBottom: "2em",
            justifyContent: "space-around"
          }}
        >
          <div style={{ padding: "1em 1.2em" }}>
            <H4 font="secondary" style={{ color: black }}>
              CRATE INFO
            </H4>
            <p style={{ color: grey2, marginTop: "1em" }}>More Info</p>
          </div>
          <div style={{ padding: "1em 1.2em" }}>
            <H3 font="secondary">Deliverd on</H3>
            <H3 font="secondary">Items</H3>
            <H3 font="secondary">Status</H3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1em 1.2em",
            }}
          >
            <Button theme="primary">KEEP Items</Button>
            <Button theme="secondary">RETURN Items</Button>
          </div>
        </Card>

        <Card
          style={{
            display: "flex",
            width: "80em",
            backgroundColor: white,
            marginBottom: "2em",
            justifyContent: "space-around"
          }}
        >
          <div style={{ padding: "1em 1.2em" }}>
            <H4 font="secondary" style={{ color: black }}>
              CRATE INFO
            </H4>
            <p style={{ color: grey2, marginTop: "1em" }}>More Info</p>
          </div>
          <div style={{ padding: "1em 1.2em" }}>
            <H3 font="secondary">Deliverd on</H3>
            <H3 font="secondary">Items</H3>
            <H3 font="secondary">Status</H3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1em 1.2em",
            }}
          >
            <Button theme="primary">KEEP Items</Button>
            <Button theme="secondary">RETURN Items</Button>
          </div>
        </Card>
      </GridCell>
    </Grid>

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
