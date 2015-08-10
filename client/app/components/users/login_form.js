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
    FB.getLoginStatus(function (response) {
      this.statusChangeCallback(response)
    }.bind(this))
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

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback (response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      this.getInfo()
    } else if (response.status === 'not_authorized') {

    } else {

    }
  },

  handleClick () {
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

    var { router } = this.context
    var email = React.findDOMNode(this.refs.email).value
    var password = React.findDOMNode(this.refs.password).value
    flux.actions.users.clearLoginErrors()
    flux.actions.users.login(router, email, password)
    React.findDOMNode(this.refs.button).disabled = false
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
      </div>
    )
  }
})
