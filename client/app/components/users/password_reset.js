import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'

export default React.createClass({

   propTypes: {
    resetEmailSent: React.PropTypes.bool
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  reset (e) {
    e.preventDefault()
    var email = React.findDOMNode(this.refs.email).value
    flux.actions.users.emailPasswordReset(email)
  },

  render() {
  injectTapEventPlugin()
    var content = this.props.resetEmailSent
      ? <div className='reset' >
          <div className='content_box-header'>Email Sent</div>
          <p>Email has been sent with a link to change your password. Go check it out!</p>
        </div>
      : <div className='reset' >
          <div className='content_box-header'>Password Reset</div>
          <form>
            <input type='text' ref='email' className='karma_input' placeholder='Email' />
            <input type='submit' ref='button' onClick={this.reset} className='karma_button' value='Submit' />
          </form>
        </div>

    var emailError
    if (this.props.resetEmailSent === false) {
      emailError = <p>We couldnt find your email in our system.</p>
    }

    return (
      <div>
        {emailError}
        {content}
      </div>
    )
  }
})
