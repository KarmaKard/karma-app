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

  render () {
    return (
      <div>
        <div className='page_header'>
          <div className='page_header_title'>KarmaKard</div>
          <Link to='root' ><div className='page_header_link'> Login </div></Link>
        </div>
        <div className='content_box'>
          <PasswordReset resetEmailSent={this.state.user.resetEmailSent} />
        </div>
      </div>
    )
  }
})
