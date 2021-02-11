// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

// App Imports
import { routeApi } from '../../../setup/routes'
import { store } from '../../../setup/store'

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const UPDATE_USER = 'AUTH/UPDATE_USER'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'
// Actions

// Set a user after login or using localStorage token
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return { type: SET_USER, user }
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {id, name, email, role, streetAddress, city, state, zip, country, image, description}', 'token']
    }))
      .then(response => {
        let error = ''

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user

          dispatch(setUser(token, user))

          loginSetUserLocalStorageAndCookie(token, user)
        }

        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// TEST EDIT USER INFO              &&&&&&%%%*******************************
export function updateUser(user) {
  console.log('update action fired with:', user);

  // pass in correct user info
  // make mutation and wait for success response
  // err handle bad response
  // if response is OK then get user info
  // then set it in state

  return dispatch => {
    // return axios.post(routeApi, mutation({
    //   operation: 'userUpdate',
    //   variables: userDetails,
    //   // fields: ['user {name, email, streetAddress, city, state, zip, country, image, description}']
    //   fields: ['name', 'email', "streetAddress", "city", "state", "zip", "country", "image", "description"]
    // })).then(response => {
    //   // return dispatch({
    //   //   type: UPDATE_USER,
    //   //   user: userDetails
    //   // })
    // }).catch(error => {
    //   console.log(error)
    // })

    const token = window.localStorage.getItem('token')
    if (token && token !== 'undefined' && token !== '') {
      dispatch(setUser(token, user))
      loginSetUserLocalStorageAndCookie(token, user)
      // dispatch UPDATE_USER
    }
  }
}

// export function updateUser(user) {
//   const token = window.localStorage.getItem('token')
//   if (token && token !== 'undefined' && token !== '') {
//     // const user = JSON.parse(window.localStorage.getItem('user'))
//     // if (user) {
//       // Dispatch action
//       store.dispatch(setUser(token, user))
  
//       loginSetUserLocalStorageAndCookie(token, user)
//     // }
//   }  
// }
// export function updateUser(userDetails) {
//   return dispatch => {
//     return axios.post(routeApi, mutation({
//       operation: 'userSignup',
//       variables: userDetails,
//       fields: ['id', 'name', 'email', 'description', 'address', 'twitter']
//     }))
//   }
// }

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  console.log('rookie move');
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}
