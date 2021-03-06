import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
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

  render() {
  injectTapEventPlugin()
    return (
      <div>
        <div className='page_header'>
          <div>
            <button onClick={this.goBack} className='back_button'><i className='fa fa-chevron-left fa-2x'></i></button>
            <div className='header_center karmatitle'>KarmaKard</div>
          </div>        </div>
        <div className='main_card'>
          <PasswordReset resetEmailSent={this.state.user.resetEmailSent} />
        </div>
      </div>
    )
  }
})
