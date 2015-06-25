import React from 'react'
import { flux } from '../../../main'
import DonateForm from '../donate'

export default React.createClass({
 contextTypes: {
     router: React.PropTypes.func
   },

  getInitialState() {
    var storeState = this.getStoreState()
    return storeState
  },

  getStoreState() {
    return {
      usersStoreState: flux.stores.users.getState()
    }
  },
  render() {
    if(!this.state.usersStoreState){return <p>Waiting...</p>}
    var user = this.state.usersStoreState.currentUser
    var stripePubKey = this.context.router.getCurrentParams().organizationStripePubKey
    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">KarmaKard</div>
        </div>
        <div className="content_box">
          <DonateForm organizationStripeKey={stripePubKey} currentUser={user} />
        </div>
      </div>
    )
  }
})