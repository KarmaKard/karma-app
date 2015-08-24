import React from 'react'
import { flux } from '../../main'
import {Link} from 'react-router'

export default React.createClass({
  getDefaultProps () {
    return {
      loginErrors: []
    }
  },

  propTypes: {
    loginErrors: React.PropTypes.array.isRequired,
    userLogin: React.PropTypes.func.isRequired,
    setFbLogin: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount () {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=549948578487024'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },

  getInfo () {
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

  fbChromeiOSLogin () {
    FB.getLoginStatus(function (response) {
      this.statusChangeCallback(response)
    }, true)
  },

  handleClick () {
      // fix iOS Chrome
    if (navigator.userAgent.match('CriOS')) {
      alert('May experience issues with Chrome iOS FB Login')
    }

    FB.login(function (response) {
      this.statusChangeCallback(response)
    }.bind(this),
    {
     scope: 'public_profile, email',
     return_scopes: true
    })
  },

  didLogin (e) {
    e.preventDefault()
    React.findDOMNode(this.refs.button).disabled = true
    var email = React.findDOMNode(this.refs.email).value
    var password = React.findDOMNode(this.refs.password).value

    flux.actions.users.clearLoginErrors()
    this.props.userLogin(email, password)

    React.findDOMNode(this.refs.button).disabled = false
  },

  render () {
    var loginErrorMessage = this.props.loginErrors.length !== 0
      ? <div className='karma_error'>Incorrect Credentials</div>
      : null

    return (
      <div className='login' >
        <div className='content_box-header login_header'>Login</div>
        {loginErrorMessage}
          <input type='email' ref='email' className='karma_input' placeholder='Email' />
          <input type='password' ref='password' className='karma_input' placeholder='Password' />
          <div className='login_buttons'>
          <button ref='button' onClick={this.didLogin} className='login_button' >Login</button>
          <Link to='password_reset'><div className='login_forgot' >Forgot Password?</div></Link>
          </div>
        <hr/>

        <button href='#' className='facebookButton' onClick={this.handleClick}>
          <i className='fa fa-facebook fa-3x fa-inverse'></i>
          <span>Login</span>
        </button>
      </div>
    )
  }
})
