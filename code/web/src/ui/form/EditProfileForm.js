
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI 
import Button from '../button/Button'
import Input from "../input/Input";
import Icon from "../icon/Icon";
import { grey2, grey4, black, white } from "../common/colors";
import { H1 } from "../typography/index";

// App
import { routeImage } from "../../setup/routes"
import { upload, messageShow, messageHide } from '../../modules/common/api/actions'
import {updateUser} from '../../modules/user/api/actions'


class EditProfileForm extends Component {  
  constructor (props) {
    super(props)
  }

  state = {
    isLoading: false,
    editName: this.props.user.details.name,
    editEmail: this.props.user.details.email,
    editStreetAddress: this.props.user.details.streetAddress,
    editCity: this.props.user.details.city,
    editState: this.props.user.details.state,
    editZip: this.props.user.details.zip,
    editCountry: this.props.user.details.country,
    editDescription: this.props.user.details.description,
    editImage: this.props.user.details.image,
    user: this.props.user,
  }

  componentDidMount() {
    this.setState({user: this.props.user})
  }

  onChange = (e) => {
    let formField = e.target.name
    this.setState({
      [formField]: e.target.value,
    })
  }

  onUpload = (event) => {
    this.props.messageShow('Uploading profile image, please wait...')

    this.setState({
      isLoading: true
    })

    let data = new FormData()
    data.append('file', event.target.files[0]) 

    // Upload image
    this.props.upload(data)
      .then(response => {
        if (response.status === 200) {
          this.props.messageShow('Profile image uploaded successfully.')
          console.log(response);

          let user = this.state.user
          user.details.image = `/images/uploads/${ response.data.file }`

          this.setState({
            user,
            editImage: user.details.image
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
        }, 2200)
      })
  }

  onSubmit = (event) => {
    event.preventDefault()
    
    const userUpdates = {
      name: this.state.editName,
      email: this.state.editEmail,
      streetAddress: this.state.editStreetAddress,
      city: this.state.editCity,
      state: this.state.editState,
      zip: this.state.editZip,
      country: this.state.editCountry,
      description: this.state.editDescription,
      image: this.state.editImage,
    }

    let updatedUser = this.state.user
    updatedUser.details = {...updatedUser.details, ...userUpdates}
    
    this.props.messageShow('Saving, please wait...')
    this.setState({isLoading: true})
    this.props.updateUser(updatedUser)   
      .then(() => {
        window.setTimeout(() => {
          this.props.messageShow('Information updated successfully.')
          this.props.messageHide()
        }, 2200)
      })
  }

  render() {

    return (
      <form onSubmit={this.onSubmit} style={{ height: "100%" }}>
        <H1 font={'secondary'} style={{ textAlign: "center", color: "white", fontWeight: '800', fontSize: '3rem'}}>Edit Profile</H1><br/>
        <div style={{ width: "25em", margin: "0 auto" }}>
          {/* Name */}
          <Input
            color="white"
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
            color="white"
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
            color="white"
            type="text"
            fullWidth={true}
            placeholder="StreetAddress"
            required="required"
            name="editStreetAddress"
            autoComplete="off"
            value={this.state.editStreetAddress}
            onChange={this.onChange}
          />
          <Input
            color="white"
            type="text"
            fullWidth={true}
            placeholder="City"
            required="required"
            name="editCity"
            autoComplete="off"
            value={this.state.editCity}
            onChange={this.onChange}
          />
          <Input
            color="white"
            type="text"
            fullWidth={true}
            placeholder="Zip"
            required="required"
            name="editZip"
            autoComplete="off"
            value={this.state.editZip}
            onChange={this.onChange}
          />
          <Input
            color="white"
            type="text"
            fullWidth={true}
            placeholder="State"
            required="required"
            name="editState"
            autoComplete="off"
            value={this.state.editState}
            onChange={this.onChange}
          />
          <Input
            color="white"
            type="text"
            fullWidth={true}
            placeholder="Country"
            required="required"
            name="editCountry"
            autoComplete="off"
            value={this.state.editCountry}
            onChange={this.onChange}
          />
          {/* Description */}
          <Input
            color="white"
            type="text"
            fullWidth={true}
            placeholder="Description"
            required="required"
            name="editDescription"
            autoComplete="off"
            value={this.state.editDescription}
            onChange={this.onChange}
          />

          {/* Upload File */}
          <div style={{ marginTop: "1em" }}>
            <input
              type="file"
              style={{ color: white }}
              onChange={this.onUpload}
              required={this.state.user.details.image ? false : true}
            />
          </div>

          {/* Uploaded image */}
          {this.state.user.details.image &&
            <img
              src={this.state.user.details.image.charAt(0) === '/' ? (routeImage + this.props.user.details.image) : this.props.user.details.image}
              alt="User Image"
              style={{ width: 400, marginTop: "1em" }}
            />
          }

        </div>
        {/* Form submit */}
        <section style={{ marginTop: '2em', textAlign: 'center' }}>
          <Button type="submit" theme="secondary" disabled={this.state.isLoading}>
            <Icon size={1.2} style={{ color: white }}>check</Icon> Save
          </Button>
          {this.props.children}
        </section>
        <style jsx>{`
          form {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
          section {
            display: flex;
            justify-content: space-around;
          }
        `}</style>
      </form>
    )
  };
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default withRouter(connect(profileState, {
  updateUser,
  upload,
  messageShow,
  messageHide
})(EditProfileForm))
