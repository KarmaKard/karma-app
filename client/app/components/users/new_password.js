import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  propTypes: {
    passwordResetCode: React.PropTypes.number
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    return {
      mismatchPasswords: false
    }
  },

  reset (e) {
    e.preventDefault()
    var password = React.findDOMNode(this.refs.password).value
    var passwordConfirm = React.findDOMNode(this.refs.passwordConfirm).value

    if (password && passwordConfirm && password !== passwordConfirm) {
      return this.setState({
        mismatchPasswords: true
      })
    }

    var passwordResetId = this.context.router.getCurrentParams().passwordResetId
    var passwordResetObject = {
      id: passwordResetId,
      password: password
    }
    var { router } = this.context
    flux.actions.users.saveNewPassword(router, passwordResetObject)
  },

  render () {
    var mismatchPasswords = this.state.mismatchPasswords
      ? <div className='error-message'>Mismatched Passwords</div>
      : null

    var content = this.props.passwordResetCode === 401
      ? <div className='reset' >
          <div className='content_box-header'>Password Expired</div>
          <p>This link to change your password has expired.</p>
        </div>
      : <div className='reset' >
          {mismatchPasswords}
          <div className='content_box-header'>Password Reset</div>
          <form>
            <input type='password' ref='password' className='karma_input' placeholder='Password' />
            <input type='password' ref='passwordConfirm' className='karma_input' placeholder='Confirm Password' />
            <input type='submit' ref='button' onClick={this.reset} className='karma_button' value='Submit' />
          </form>
        </div>

    return (
      <div>
        {content}
      </div>
    )
  }
})
