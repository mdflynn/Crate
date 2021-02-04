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

    {/*💻  need user description field, may be a part of 1st UX 💻 */}
    
    {/*💻  need user address, may be a part of 1st UX 💻 */}

    {/*💻  need user availability (i.e. deliver on second monday of each month - canned choices), may be a part of 1st UX 💻 */}

    <File onChange={(e) => console.log(e.target.files)}/>
    <Button theme="secondary" onClick={(e) => console.log(e.target.files)}>test upload</Button>

    <Grid>
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

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
