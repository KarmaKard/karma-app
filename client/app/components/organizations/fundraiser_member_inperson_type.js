import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  propTypes: {
    setPaymentType: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  setType (e) {
    this.props.setPaymentType(e.target.value)
  },

  render () {
    return (
      <div>
        <div className='organization_information' >
          <div className='content_box-header'>Payment Type</div>
        </div>
        <button className='karma_button' value='cash' onClick={this.setType}>Cash / Check</button>
        <button className='karma_button' value='square' onClick={this.setType}>Square Slider</button>

      </div>
    )
  }
})
