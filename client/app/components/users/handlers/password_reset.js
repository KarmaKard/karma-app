import React from 'react'
import { flux } from '../../../main'
import PasswordReset from '../password_reset'
import {Link} from 'react-router'

export default React.createClass({
  getInitialState () {
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

  goBack () {
    history.back()
  },

  render () {
    return (
      <div>
        <div className='page_header'>
          <div>
            <i onClick={this.goBack} className='fa fa-chevron-left fa-2x back_button'></i>
            <div className='header_center karmatitle'>KarmaKard</div>
          </div>        </div>
        <div className='guest_box'>
          <PasswordReset resetEmailSent={this.state.user.resetEmailSent} />
        </div>
      </div>
    )
  }
})
