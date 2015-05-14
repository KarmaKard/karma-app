import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  getDefaultProps() {
    return {
      loginErrors: []
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  didLogin(e) {
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
      ? <div className="karma_error">Incorrect Credentials</div>
      : null

    return (
      <div className="login" >
        <div className="content_box-header">Login</div>
        {loginErrorMessage}
        <form>
          <input type="text" ref="email" className="karma_input" placeholder="Email" />
          <input type="password" ref="password" className="karma_input" placeholder="Password" />
          <a className="login_forgot">Forgot Password?</a>
          <input type="submit" ref="button" onClick={this.didLogin} className="karma_button" value="Submit" />
        </form>
      </div>
    )
  }
})
