// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
const Profile = (props) => (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
      {/* 🐉 Optional: Add 'Edit Profile Button', will need to create EditProfile.js 🐉 */}
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    <Grid>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>
        
        {/* 🐉 Add img with default nondescript image and edit icon to upload user picture may need additional package to allow user to select an image from their computer 🐉 */}
        {/* 🐉 We'll need a popup window for this? Likely an additional UploadPopup.js file? 🐉 */}

        {/* 🐉 Add description field with edit icon to change details in an input 🐉 */}
        {/* 🐉 Perhaps for input we can have an edit caret that allows for a dropdown input that updats on state of user.details.details on submit 🐉 */}

        {/* 🐉 Add field for shipping address and an edit icon to make changes 🐉 */}
        {/* 🐉 Need to work with Backend in regards to how we want to update user info, edit icons might not work best 🐉 */}

        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>
        {/* 🐉 Add order history caret for dropping down container of all orders with details of what has been kept  🐉 */}
        {/* 🐉 Add future delivery caret for dropping down container of next deliveries calendar icon to expand and close calendar to change date available for receiving which will push to api on change 🐉 */}

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>
  </div>
)

// Component Properties
/* 🐉 declaring prop types 🐉 */ 

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}
/* 🐉 logout clears local storage 🐉 */ 

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
