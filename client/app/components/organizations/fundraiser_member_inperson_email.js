import React from 'react'

export default React.createClass({
  propTypes: {
    setEmail: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  setEmail () {
    var email = React.findDOMNode(this.refs.email).value
    if (this.validateEmail(email)) {
      this.props.setEmail(email)
    } else {
      React.findDOMNode(this.refs.email).style.border = '3px solid rgb(242, 29, 29)'
    }

  },

  validateEmail (emailString) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(emailString)
  },

  render () {
    return (
      <div>
        <div className='organization_information' >
          <div className='content_box-header'>Donor Email</div>
        </div>
        <h2>Email</h2>
        <h3>For each card purchased an activation link will be sent to the following email. User can share these links as gifts.</h3>
        <input className='karma_input' ref='email' placeholder='email@email.com'></input>
        <button className='karma_button' onClick={this.setEmail}>Send</button>
      </div>
    )
  }
})
