
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

// const EditProfileForm = ({children, user}) => {  
  // const initialUserState = {
  //   email: user.details.email,
  //   name: user.details.name,
  //   description: '',
  //   address: '',
  //   image: '',
  //   twitter: '',
  // }
  class EditProfileForm extends Component {  
    constructor (props) {
      super(props)
    }

    state = {
      user: this.props.user,
      editName: this.props.user.details.name,
      editEmail: this.props.user.details.email,
      editAddress: '',
      editDescription: '',
      editTwitter: '',
      editImage: ''
    }

    componentDidMount() {
      console.log(this.props.user)
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
            // required="required"
            name="editName"
            autoComplete="off"
            value={this.state.editName}
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

          {/* email, physical address, twitter */}

          {/* Description */}
          <Textarea
            fullWidth={true}
            placeholder="Description"
            required="required"
            name="description"
            // value={this.state.product.description}
            // onChange={this.onChange}
            style={{ marginTop: "1em" }}
          />

          {/* Type */}
          {/* <Select
        fullWidth={true}
        required="required"
        name="type"
        value={this.state.product.type}
        onChange={this.onChangeSelect}
        style={{ marginTop: "1em" }}>
        {this.state.productTypes.length > 0 ? (
          this.state.productTypes.map(type => (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ))
        ) : (
          <option disabled="disabled" selected="selected">
            Select type
          </option>
        )}
      </Select> */}

          {/* Gender */}
          {/* <Select
        fullWidth={true}
        required="required"
        name="gender"
        value={this.state.product.gender}
        onChange={this.onChangeSelect}
        style={{ marginTop: "1em" }}>
        {this.state.userGenders.length > 0 ? (
          this.state.userGenders.map(gender => (
            <option value={gender.id} key={gender.id}>
              {gender.name}
            </option>
          ))
        ) : (
          <option disabled="disabled" selected="selected">
            Select gender
          </option>
        )}
      </Select> */}

          {/* Upload File */}
          <div style={{ marginTop: "1em" }}>
            <input
              type="file"
              // onChange={this.onUpload}
              // required={this.state.product.id === 0}
            />
          </div>

          {/* Uploaded image */}
          {/* {renderIf(this.state.product.image !== "", () => (
        <img
          src={routeImage + this.state.product.image}
          alt="Product Image"
          style={{ width: 200, marginTop: "1em" }}
        />
      ))} */}

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
