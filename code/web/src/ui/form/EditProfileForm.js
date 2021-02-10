
import React, { Component, useState } from 'react';
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

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
import CreateOrEdit from '../../modules/admin/product/CreateOrEdit'

// TODO add dispatch inside this component

  class EditProfileForm extends Component {  
    constructor (props) {
      super(props)
    }

    state = {
      user: this.props.user,
      editName: this.props.user.details.name,
      editEmail: this.props.user.details.email,
      editAddress: '123 madeup address',
      editDescription: 'I am such a wonderful person',
      editTwitter: '@dickhands',
      editImage: ''
    }

    componentDidMount() {
      console.log('edit profile form mount', this.props.user)
    }

    onChange = (e) => {
      let formField = e.target.name
      this.setState({
        [formField]: e.target.value
      })
    }
  
    render() {
      return (
      <form onSubmit={e => console.log(e.target)}>
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
              // onChange={this.onUpload}
              // required={this.state.product.id === 0}
            />
          </div>

          {/* Uploaded image */}
          {renderIf(this.state.editImage !== "", () => (
        <img
          src={routeImage + this.state.editImage}
          alt="User Image"
          style={{ width: 400, marginTop: "1em" }}
        />
      ))}

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

export default EditProfileForm;
