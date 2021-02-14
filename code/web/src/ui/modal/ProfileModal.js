// Imports
import React from 'react'
import PropTypes from 'prop-types'
import EditProfileForm from '../form/EditProfileForm'

// Component
const Modal = (props) => {
  const { children, visible, setEdit, ...other } = props

  return (
    <div className='modal' {...other}>
      <div className='modal-contents'>
        {children}
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9;
          visibility: ${visible ? 'visible' : 'hidden'};
          opacity: ${visible ? 1 : 0};
          transition: opacity 0.25s ease-in-out;
          max-height: 85vh;
        }
        .modal-contents {
          background-image: linear-gradient(89deg, #7e349094, #1600ff91);
          backdrop-filter: blur(15px);
          background-size: cover;
          position: block;
          z-index: -1;
          margin: auto;
          margin-top: 3vh;
          width: 80%;
          border-radius: 10px;
          box-shadow: 5px 11px 20px 7px #000000a1;
          padding: 3em;
          height: fit-content;
        }
      `}</style>
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