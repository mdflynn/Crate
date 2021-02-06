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
import { grey, grey2 } from "../../ui/common/colors";

// App Imports
import userRoutes from "../../setup/routes/user";
import { logout } from "./api/actions";

// Component
const Profile = (props) => (
  <div>
    {/* SEO */}
    {/* sets the document title */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    {/* This is the general container for the following code block*/}
    <Grid style={{ backgroundColor: grey }}>
      {/* This is the container and positioning for the following H3 */}
      <GridCell style={{ padding: "2em", textAlign: "center" }}>
        {/* This sets the stying for the text */}
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>
    {/* this is the general container for the following code block */}
    <Grid>
      {/* this is the general container and positioning for the child components */}
      <GridCell style={{ padding: "2em", textAlign: "center" }}>
        {/* This sets the stying for the text of the user name*/}
        <H4 style={{ marginBottom: "0.5em" }}>{props.user.details.name}</H4>
        {/* This sets the stying for the text of the user email */}
        <p style={{ color: grey2, marginBottom: "2em" }}>
          {props.user.details.email}
        </p>
        {/* this is the react router link which routes to the attached path on button click */}
        <Link to={userRoutes.subscriptions.path}>
          {/* subscriptions button linked with router */}
          <Button theme="primary">Subscriptions</Button>
        </Link>
        {/* logout button with different theme which logs a user out on click */}
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
// type checking props
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

// Component State
// redux state
function profileState(state) {
  return {
    user: state.user,
  };
}
// mapStateToProps, gives access to store in this component
export default connect(profileState, { logout })(Profile);
