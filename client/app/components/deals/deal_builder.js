import React from 'react'
import { flux } from '../../main'
import FreeDeal from './free_deal'
import BXXDeal from './bxx_deal'
import BXYDeal from './bxy_deal'
import POXDeal from './pox_deal'
import DOXDeal from './dox_deal'

export default React.createClass({

  getInitialState() {
    return {
      changedDeals: []
    }
  },

  saveDeal(deal){
    if(!deal.id){
      deal.organizationId = this.props.organization.id
      flux.actions.deals.create(deal)
    }
    else{
      var changedDeals = this.state.changedDeals
      for (let i in changedDeals) {
        if (changedDeals[i].id === deal.id) {
          changedDeals.splice(i, 1, deal)
          this.setState({changedDeals})
          return
        }
      }
      changedDeals = this.state.changedDeals.concat(deal)
      this.setState({changedDeals})
    }
  },

  saveDeals(){
    flux.actions.deals.updateDeals(this.state.changedDeals)
  },

  lookupDeal(deal, i) {
    switch(deal.type) {
      case "Free":
        return <FreeDeal key={i} saveDeal={this.saveDeal} deal={deal} />
        break
      case "BXX":
        return <BXXDeal key={i} saveDeal={this.saveDeal} deal={deal} />
        break
      case "BXY":
        return <BXYDeal key={i} saveDeal={this.saveDeal} deal={deal} />
        break
      case "DOX":
        return <DOXDeal key={i} saveDeal={this.saveDeal} deal={deal} />
        break
      case "POX":
        return <POXDeal key={i} saveDeal={this.saveDeal} deal={deal} />
        break
    }
  },

  render() {
    if(!this.props.deals){
      return <span>No Deals</span>
    }
    
    var deals = this.props.deals
    var dealsComponents = deals.map(this.lookupDeal)

    return (
      <div>
        <div className="content_box-header">Deals</div>
        One free deal and one or more paid deal(s) are required
        {dealsComponents}
        <button className="karma_button" onClick={this.saveDeals}>Save</button>
      </div>
    )
  }
})
