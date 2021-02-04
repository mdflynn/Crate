// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import File from '../../ui/input/File'

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
    </Helmet>


    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>
    

    {/*💻  need image upload functionality, may be a part of 1st UX  💻 */}
    {/*💻  onChange will be key in collecting the uploaded file info, not an onClick  💻 */}
    {/*💻  onClick of the submit will need to call ACTION to vet file then upload if OK  💻 */}
    {/*💻  image upload could be its own component 💻 */}

    {/*💻  <input> need user description field, may be a part of 1st UX 💻 */}
    {/*💻  <input> need user address, may be a part of 1st UX 💻 */}
    {/*💻  <input> need user availability (i.e. deliver on second monday of each month - canned choices), may be a part of 1st UX 💻 */}

    {/* 💻 just seeing how this file uploading works 💻 */}
    <File onChange={(e) => console.log(e.target.files)}/>
    <Button theme="secondary" onClick={(e) => console.log(e.target.files)}>test upload</Button>

    {/* 💻 Seems to work like a styled component - pass in style props 💻 */}
    <Grid>

    {/* 💻 Will need to render new components inside of a GridCell component💻 */}
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>

        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>
  </div>
)

    {/* 💻 declaring proptypes 💻 */}

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

  {/* 💻 create wrapper - equivalent to mapStateToProps 💻 */}
  {/* 💻 DOCS: If your mapStateToProps function is declared as taking one parameter, it will be called whenever the store state changes, and given the store state as the only parameter. 💻 */}
  {/* 💻 DOCS: If your mapStateToProps function is declared as taking two parameters, it will be called whenever the store state changes or when the wrapper component receives new props (based on shallow equality comparisons). It will be given the store state as the first parameter, and the wrapper component's props as the second parameter. 💻 */}
// https://react-redux.js.org/using-react-redux/connect-mapstate#return-values-determine-if-your-component-re-renders
// Component State
function profileState(state) {
  return {
    user: state.user
  }
}
  {/* 💻 subscribe to store updates (profileState) 💻 */}
  {/* 💻 {logout} object shorthand(?) for mapDispatchToProps param - an action creator - to clear user's cookies, etc. on logout 💻 */}

export default connect(profileState, { logout })(Profile)
