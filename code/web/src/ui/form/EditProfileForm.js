
import React, { Component, useState } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI 
import Button from '../button/Button'
import Textarea from "../input/Textarea";
import Input from "../input/Input";
import Icon from "../icon/Icon";
import { grey2, grey4, black, white } from "../common/colors";

// App
import { routeImage } from "../../setup/routes"
import { renderIf, slug } from '../../setup/helpers'
import { upload, messageShow, messageHide } from '../../modules/common/api/actions'
import {createOrUpdate} from '../../modules/product/api/actions'

// TODO add dispatch inside this component to edit options
// TODO add dispatch to profile on login to pull more data

  class EditProfileForm extends Component {  
    constructor (props) {
      super(props)
    }

    state = {
      isLoading: false,
      user: this.props.user,
      editName: this.props.user.details.name,
      editEmail: this.props.user.details.email,
      editAddress: '123 madeup address',
      editDescription: 'I am such a wonderful person',
      editTwitter: '@dickhands',
      editImage: this.props.user.details.image | null
    }

    componentDidMount() {
      this.setState({user: this.props.user})
    }

    onChange = (e) => {
      let formField = e.target.name
      this.setState({
        [formField]: e.target.value
      })
    }
  
    onUpload = (event) => {
      this.props.messageShow('Uploading profile image, please wait...')
  
      this.setState({
        isLoading: true
      })
  
      let data = new FormData()
      console.log('upload formData => data', data);
      // data.append('userimage', event.target.files[0]) // change to user+id
      data.append('file', event.target.files[0]) 
      console.log('data.append', data);
  
      // Upload image
      this.props.upload(data)
        .then(response => {
          if (response.status === 200) {
            this.props.messageShow('Profile image uploaded successfully.')
            console.log(response);
            let user = this.state.user
            user.details.image = `/images/uploads/${ response.data.file }`
  
            this.setState({
              user
            })
          } else {
            this.props.messageShow('Please try again.')
          }
        })
        .catch(error => {
          this.props.messageShow('There was some error. Please try again.')
  
        })
        .then(() => {
          this.setState({
            isLoading: false
          })
  
          window.setTimeout(() => {
            this.props.messageHide()
          }, 5000)
        })
    }

    onSubmit = (event) => {
      event.preventDefault()
  
      this.setState({
        isLoading: true
      })
  
      this.props.messageShow('Saving image, please wait...')
  
      // Save image
      // this.props.productCreateOrUpdate(this.state.product)
      this.props.createOrUpdate(this.state.user)
        .then(response => {
          this.setState({
            isLoading: false
          })
  
          if (response.data.errors && response.data.errors.length > 0) {
            this.props.messageShow(response.data.errors[0].message)
          } else {
            this.props.messageShow('Product saved successfully.')
  
            // this.props.history.push(admin.productList.path)
          }
        })
        .catch(error => {
          this.props.messageShow('There was some error. Please try again.')
  
          this.setState({
            isLoading: false
          })
        })
        .then(() => {
          window.setTimeout(() => {
            this.props.messageHide()
          }, 5000)
        })
    }

    render() {
      return (
      <form onSubmit={this.onSubmit}>
        {/* <form onSubmit={this.onSubmit}> */}
        <div style={{ width: "25em", margin: "0 auto" }}>
          {/* Name */}
          <Input
            type="text"
            fullWidth={true}
            placeholder="Name"
            required="required"
            name="editName"
            autoComplete="off"
            value={this.state.editName}
            onChange={this.onChange}
          />
          {/* Email */}
          <Input
            type="text"
            fullWidth={true}
            placeholder="Email"
            required="required"
            name="editEmail"
            autoComplete="off"
            value={this.state.editEmail}
            onChange={this.onChange}
          />
          {/* Address */}
          <Input
            type="text"
            fullWidth={true}
            placeholder="Address"
            required="required"
            name="editAddress"
            autoComplete="off"
            value={this.state.editAddress}
            onChange={this.onChange}
          />
          {/* Description */}
          <Input
            type="text"
            fullWidth={true}
            placeholder="Description"
            required="required"
            name="editDescription"
            autoComplete="off"
            value={this.state.editDescription}
            onChange={this.onChange}
          />
          {/* Twitter */}
          <Input
            type="text"
            fullWidth={true}
            placeholder="Twitter"
            required="required"
            name="editTwitter"
            autoComplete="off"
            value={this.state.editTwitter}
            onChange={this.onChange}
          />

          {/* Upload File */}
          <div style={{ marginTop: "1em" }}>
            <input
              type="file"
              onChange={this.onUpload}
              required={this.state.user.details.image}
            />
          </div>

          {/* Uploaded image */}
          {/* {renderIf(this.state.user.details.image !== "", () => ( */}
          {this.state.user.details.image &&
            <img
              // src={this.state.editImage}
              src={routeImage + this.state.user.details.image}
              alt="User Image"
              style={{ width: 400, marginTop: "1em" }}
            />
          }

          {/* Form submit */}
          <div style={{ marginTop: '2em', textAlign: 'center' }}>
            <Button type="submit" theme="secondary" disabled={this.state.isLoading}>
              <Icon size={1.2} style={{ color: white }}>check</Icon> Save
            </Button>
          </div>
        </div>
        {this.props.children}
      </form>
    )
  };
}

// TODO subscribe to user???

// export default EditProfileForm;

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default withRouter(connect(profileState, {
// export default withRouter(connect(null, {
  createOrUpdate,
  upload,
  messageShow,
  messageHide
})(EditProfileForm))
