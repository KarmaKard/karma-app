import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    return {
      mismatchPasswords: false,
      incorrectEmail: false
    }
  },

  componentDidMount () {

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=549948578487024"
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },

  getInfo () {
  var {router} = this.context
  var setFbLogin = this.props.setFbLogin
  FB.api('/me', {fields: 'email, first_name, last_name'}, function (response) {
    var user = {
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      fbUserId: response.id
    }
    setFbLogin(user)
  })
  },

  statusChangeCallback (response) {
    if (response.status === 'connected') {
      this.getInfo()
    } else if (response.status === 'not_authorized') {

    } else {

    }
  },

  handleFbClick () {
      // fix iOS Chrome
    if ( navigator.userAgent.match('CriOS') ) {
      alert("Chrome on iOS doesn't like facebook login. Try Safari.")
    } 

    FB.login(function (response) {
      this.statusChangeCallback(response)
    }.bind(this),
    {
     scope: 'public_profile, email',
     return_scopes: true
    })
  },

  registerClicked () {

    var email = React.findDOMNode(this.refs.registerEmail).value
    var firstName = React.findDOMNode(this.refs.registerFirstName).value
    var lastName = React.findDOMNode(this.refs.registerLastName).value
    var password = React.findDOMNode(this.refs.registerPassword).value
    var passwordConfirm = React.findDOMNode(this.refs.registerPasswordConfirm).value
    var roles = {}

    if (password && passwordConfirm && password !== passwordConfirm) {
      return this.setState({
        mismatchPasswords: true
      })
    }

    if (email) {
      var emailValidator = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
      if (!emailValidator.test(email)) {
        return this.setState({
          incorrectEmail: true
        })
      }
    }

    var user = { email, firstName, lastName, password, roles}
    this.props.createUser(user)
    React.findDOMNode(this.refs.button).disabled = false
  },

  render () {
    var mismatchPasswords = this.state.mismatchPasswords
      ? <div className='error-message'>Mismatched Passwords</div>
      : null

    var incorrectEmail = this.state.incorrectEmail
      ? <div className='error-message'>Not An Email Format</div>
      : null
    return (
      <div>
        {mismatchPasswords}
        {incorrectEmail}
          <div className='content_box-header'>Register</div>
          <div className='form-row'>
            <label>
              <span>First Name</span>
              <input type='text' onBlur={this.setUserInfo} ref='registerFirstName' className='karma_input' placeholder='First Name' />
            </label>
          </div>
          <div className='form-row'>
            <label>
              <span>Last Name</span>
              <input type='text' onBlur={this.setUserInfo} ref='registerLastName' className='karma_input' placeholder='Last Name' />
            </label>
          </div>
          <div className='form-row'>
            <label>
              <span>Email</span>
              <input type='text' onBlur={this.setUserInfo} ref='registerEmail' className='karma_input' placeholder='Email'/>
           </label>
          </div>
          <div className='form-row'>
            <label>
              <span>Password</span>
              <input type='password' onBlur={this.setUserInfo} ref='registerPassword' className='karma_input' placeholder='Password' />
            </label>
          </div>
          <div className='form-row'>
            <label>
              <span>Confirm Password</span>
              <input type='password' onBlur={this.setUserInfo} ref='registerPasswordConfirm' className='karma_input' placeholder='Confirm Password' />
            </label>
          </div>
          <input type='submit' ref='button' onClick={this.registerClicked} className='karma_button' value='Create Account'/>

          <hr/>

          <button href="#" className="facebookButton" onClick={this.handleFbClick}>
            <i className="fa fa-facebook fa-3x fa-inverse"></i>
            <span>Login</span>
          </button>
          <div className="g-signin2" data-onsuccess="onGoogleSignIn"></div>
      </div>

    )
  }
})
