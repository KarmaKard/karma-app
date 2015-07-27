import React from 'react'
import NewPassword from '../new_password'
import { flux } from '../../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    flux.actions.users.checkPasswordResetExpiration(this.context.router.getCurrentParams().passwordResetId)
    var storeState = this.getStoreState()
    return storeState
  },

  storeChange () {
    this.setState(this.getStoreState)
  },

  getStoreState () {
    return {
      user: flux.stores.users.getState()
    }
  },

  componentWillMount () {
    flux.stores.users.addListener('change', this.storeChange)
  },

  componentWillUnmount () {
    flux.stores.users.removeListener('change', this.storeChange)
  },

  render () {
    return (
      <div>
        <div className='page_header'>
          <div className='page_header_title'>KarmaKard</div>
        </div>
        <div className='content_box'>
          <NewPassword resetLinkActive={this.state.user.resetLinkActive} />
        </div>
      </div>
    )
  }
})
