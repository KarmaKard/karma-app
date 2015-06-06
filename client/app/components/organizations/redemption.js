import React from 'react'
import { flux } from '../../main'
import Router from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  redeem(){
    var amountSaved = React.findDOMNode(this.refs.amountSaved).value
    var redemption = {
      dealId: this.context.router.getCurrentParams().dealId,
      organizationId: this.props.organization.id,
      userId: this.props.user.id,
      amountSaved
    }
    var { router } = this.context
    flux.actions.deals.createRedemption(router, redemption)
  },

  render() {
    return(
      <div>
        <p>Let the store clerk click on the button below to confirm this coupon</p>

        <input ref="amountSaved" className="karma_input"/>
        <button className="karma_button" onClick={this.redeem}>Redeem Deal</button>
      </div>
      )
  }
})