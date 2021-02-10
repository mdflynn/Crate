// Imports
import React from 'react'
import PropTypes from 'prop-types'
import EditProfileForm from '../form/EditProfileForm'

// Component
const Modal = (props) => {
  const { children, visible, setEdit, ...other } = props

  return (
    <div {...other} style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 9,
      visibility: (visible ? 'visible' : 'hidden'),
      opacity: (visible ? 1 : 0),
      transition: 'opacity 0.25s ease-in-out'
    }}>
      <div style={{
        // backgroundColor: 'gold',
        backgroundImage: "linear-gradient(89deg, #7e349094, #1600ff91)",
        backdropFilter: "blur(15px)",
        backgroundSize: 'cover',
        position: 'fixed',
        top: '10%',
        right: '10%',
        // top: '-40px',
        // right: '-40px',
        // bottom: '-40px',
        // left: '-40px',
        zIndex: -1,
        height: '80%',
        width: '80%',
        borderRadius: '10px',
        boxShadow: '5px 11px 20px 7px #000000a1'
        // filter: 'blur(25px)'
      }}>
      
        {children}
      </div>
    </div>
  )
}

// Component Properties
Modal.propTypes = {
  visible: PropTypes.bool.isRequired
}
Modal.defaultProps = {
  visible: false
}

export default Modal