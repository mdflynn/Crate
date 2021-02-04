// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import { primary as primaryGradient } from '../../../ui/common/gradients'
import { level1 } from '../../../ui/common/shadows'

// App Imports
import home from '../../../setup/routes/home'
import user from '../../../setup/routes/user'
import crate from '../../../setup/routes/crate'
import admin from '../../../setup/routes/admin'
import Logo from './Logo'
import Menu from './Menu'
import MenuItem from './MenuItem'

// Component
const Header = (props) => {
  return (
    <header style={{
      backgroundImage: primaryGradient,
      boxShadow: level1,
      padding: '0 2em',
      height: '5em',
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0
    }}>
      <Grid alignCenter={true} style={{ marginTop: '1.5em' }}>
        <GridCell>
          {/* Logo */}
          <Logo style={{ float: 'left' }}/>

          {/* Left menu */}
          <Menu style={{ float: 'left', marginTop: '0.5em', marginLeft: '2em' }}>
            <MenuItem to={home.men.path}>Men</MenuItem>

            <MenuItem to={home.women.path}>Women</MenuItem>

            <MenuItem to={home.howItWorks.path}>How It Works</MenuItem>

            <MenuItem to={home.whatsNew.path}>What's New</MenuItem>

          </Menu>
        </GridCell>


        {/* Right menu */}
        <GridCell style={{ textAlign: 'right' }}>
        {/* 💻 some conditional rendering for the signed in user menu, user history will live here 💻 */}
          {
            props.user.isAuthenticated
              ?
              <Menu>
                { props.user.details.role === 'ADMIN' && <MenuItem to={admin.dashboard.path} section="admin">Admin</MenuItem> }

                <MenuItem to={crate.list.path}>Crates</MenuItem>

                <MenuItem to={user.subscriptions.path}>Subscriptions</MenuItem>

                <MenuItem to={user.profile.path}>Profile</MenuItem>

                {/* 💻  need MenuItem for NEW page, USER HISTORY 💻` */}

              </Menu>
              :
              <Menu>
                <MenuItem to={user.login.path}>Login</MenuItem>

                <MenuItem to={user.signup.path}>Signup</MenuItem>
              </Menu>
          }
        </GridCell>
      </Grid>
    </header>
  )
}

// Component Properties
Header.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
{/* 💻 create wrapper - equivalent to mapStateToProps 💻 */}
function headerState(state) {
  return {
    user: state.user
  }
}

{/* 💻 subscribe to store updates (headerState) 💻 */}
{/* 💻 The number of declared function parameters (a.k.a. arity) affects when it will be called. 💻 */}
{/* 💻 it will be called whenever the store state changes or when the wrapper component receives new props. 
It will be given the store state as the first parameter, and the wrapper component's props as the second parameter.. 💻 */}
{/* 💻 withRouter - Some components (commonly a header component) appear on every page, so are not wrapped in a <Route> 💻 */}
{/* 💻 This means the header cannot redirect the user. To get around this problem, the header component can be wrapped in a withRouter function, either when it is exported 💻 */}
{/* 💻 This gives the Header component access to this.props.history, which means the header can now redirect the user 💻 */}


export default withRouter(connect(headerState, {})(Header))
