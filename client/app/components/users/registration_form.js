import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      mismatchPasswords: false
    }
  },

  didClick(e) {
    e.preventDefault()
    React.findDOMNode(this.refs.button).disabled = true

    var { router } = this.context
    var email = React.findDOMNode(this.refs.registerEmail).value
    var firstName = React.findDOMNode(this.refs.registerFirstName).value
    var lastName = React.findDOMNode(this.refs.registerLastName).value
    var password = React.findDOMNode(this.refs.registerPassword).value
    var passwordConfirm = React.findDOMNode(this.refs.registerPasswordConfirm).value

    if (password !== passwordConfirm) {
      return this.setState({
        mismatchPasswords: true
      })
    }

    var user = { email, firstName, lastName, password }
    flux.actions.users.create(router, user)
    React.findDOMNode(this.refs.button).disabled = false
  },

  render() {
    var mismatchPasswords = this.state.mismatchPasswords
      ? <div className="error-message">Mismatched Passwords</div>
      : null

    return (
      <div className="register" >
        <h2>Register</h2>
        {mismatchPasswords}
        <form>
          <input type="text" ref="registerFirstName" className="karma_input" placeholder="First Name" />
          <input type="text" ref="registerLastName" className="karma_input" placeholder="Last Name" />
          <input type="text" ref="registerEmail" className="karma_input" placeholder="Email"/>
          <input type="password" ref="registerPassword" className="karma_input" placeholder="Password" />
          <input type="password" ref="registerPasswordConfirm" className="karma_input" placeholder="Confirm Password" />
          <input type="submit" ref="button" onClick={this.didClick} className="karma_button" value="Submit"/>
        </form>
      </div>
    )
  }
})