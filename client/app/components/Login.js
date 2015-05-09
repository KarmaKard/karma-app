import React from 'react'
import { flux } from '../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return Object.assign(this.getStoreState(),{
      mismatchPasswords: false
    })
  },

  getStoreState() {
    return {
      users: flux.stores.users.getState()
    }
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  componentWillMount() {
    flux.stores.users.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.users.removeListener('change', this.storeChange)
  },

  loginClicked (e){
    e.preventDefault()
    var { router } = this.context
    var email = React.findDOMNode(this.refs.loginEmail).value
    var password = React.findDOMNode(this.refs.loginPassword).value
    flux.actions.users.clearLoginErrors()
    flux.actions.users.login(router, email, password)
  },

  registerClicked (e){
    e.preventDefault()
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
  },

  render() {
    var loginErrorMessage = this.state.users.loginErrors.length !== 0
      ? <div className="error-message">Incorrect Credentials</div>
      : null

    var mismatchPasswords = this.state.mismatchPasswords
      ? <div className="error-message">Mismatched Passwords</div>
      : null

    return (
      <div className="loginwrap"> 
        <div className="login" >
          <h2>Login</h2>
          {loginErrorMessage}
          <form>
            <input type="text" ref="loginEmail" className="karma_input" placeholder="Email" />
            <input type="password" ref="loginPassword" className="karma_input" placeholder="Password" />
            <input type="submit" onClick={this.loginClicked} className="karma_button" value="Submit" />
          </form>
        </div>
        <div className="register" >
          <h2>Register</h2>
          {mismatchPasswords}
          <form>
            <input type="text" ref="registerFirstName" className="karma_input" placeholder="First Name" />
            <input type="text" ref="registerLastName" className="karma_input" placeholder="Last Name" />
            <input type="text" ref="registerEmail" className="karma_input" placeholder="Email"/>
            <input type="password" ref="registerPassword" className="karma_input" placeholder="Password" />
            <input type="password" ref="registerPasswordConfirm" className="karma_input" placeholder="Confirm Password" />
            <input type="submit" onClick={this.registerClicked} className="karma_button" value="Submit"/>
          </form>
         </div>
      </div>
    )
  }
})
