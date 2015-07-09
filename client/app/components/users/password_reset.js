import React from 'react'
import { flux } from '../../main'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  reset(e){
    e.preventDefault()
    var email = React.findDOMNode(this.refs.email).value
    flux.actions.users.emailPasswordReset(email)
  },

  render() {
    return (
      <div className="reset" >
        <div className="content_box-header">Password Reset</div>
        <form>
          <input type="text" ref="email" className="karma_input" placeholder="Email" />
          <input type="submit" ref="button" onClick={this.reset} className="karma_button" value="Submit" />
        </form>
      </div>
    )
  }
})