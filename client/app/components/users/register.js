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

  didClick () {

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
    flux.actions.users.create(user)
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
           <input type='submit' ref='button' onClick={this.didClick} className='karma_button' value='Create Account'/>
      </div>

    )
  }
})
