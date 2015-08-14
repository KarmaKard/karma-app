import React from 'react'
import { flux } from '../../main'
import {Link} from 'react-router'

export default React.createClass({
  getDefaultProps() {
    return {
      loginErrors: []
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount () {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '550843868397495',
        xfbml      : true,
        version    : 'v2.4',
        cookie     : true
      });

    FB.getLoginStatus(function (response) {
        this.statusChangeCallback(response)
      }.bind(this)
    )}.bind(this)

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=550843868397495";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  getInfo () {
    var {router} = this.context
    FB.api('/me', {fields: 'email, first_name, last_name'}, function (response) {
      var user = {
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        fbUserId: response.id
      }
      flux.actions.users.facebookLogin(router, user)
    })
  },

  statusChangeCallback (response) {
    if (response.status === 'connected') {
      this.getInfo()
    } else if (response.status === 'not_authorized') {

    } else {

    }
  },

  handleClick () {
      // fix iOS Chrome
    if ( navigator.userAgent.match('CriOS') ) {
      window.opener.fbCompleteLogin()
      window.close()
      var response = window.open('https://www.facebook.com/dialog/oauth?client_id=550843868397495&redirect_uri=' + document.location.href + '&scope=email,public_profile', '', null)
      alert(response)
      this.statusChangeCallback(response)
    } else {
      FB.login(function (response) {
        this.statusChangeCallback(response)
      }.bind(this),
      {
       scope: 'public_profile, email',
       return_scopes: true
      })
    }
  },

  didLogin (e) {
    e.preventDefault()
    React.findDOMNode(this.refs.button).disabled = true

    var { router } = this.context
    var email = React.findDOMNode(this.refs.email).value
    var password = React.findDOMNode(this.refs.password).value
    flux.actions.users.clearLoginErrors()
    flux.actions.users.login(router, email, password)
    React.findDOMNode(this.refs.button).disabled = false
  },

  onGoogleSignIn (googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); 
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  },

  render() {
    var loginErrorMessage = this.props.loginErrors.length !== 0
      ? <div className='karma_error'>Incorrect Credentials</div>
      : null

    return (
      <div className='login' >
        <div className='content_box-header'>Login</div>
        {loginErrorMessage}
        <form>
          <input type='email' ref='email' className='karma_input' placeholder='Email' />
          <input type='password' ref='password' className='karma_input' placeholder='Password' />
          <div className="login_buttons">
          <input type='submit' ref='button' onClick={this.didLogin} className='karma_button' value='Login' />
          <Link to='password_reset'><div className='login_forgot' >Forgot Password?</div></Link>
          </div>
        </form>
        <hr/>

        <button href="#" className="facebookButton" onClick={this.handleClick}>
          <i className="fa fa-facebook fa-3x fa-inverse"></i>
          <span>Login with Facebook</span>
        </button>
        <div className="g-signin2" data-onsuccess="onGoogleSignIn"></div>
      </div>
    )
  }
})
