import React from 'react'
import { flux } from '../../main'
import FreeDeal from './free_deal'
import BXXDeal from './bxx_deal'
import BXYDeal from './bxy_deal'
import POXDeal from './pox_deal'
import DOXDeal from './dox_deal'

export default React.createClass({
  getInitialState() {
    var storeState = this.getStoreState()
    if(storeState.deals.deals.length === 0){
      flux.actions.deals.getDeals()
    }
    return storeState
  },

  storeChange() {
    this.setState(this.getStoreState())
  },

  getStoreState() {
    return {
      deals: flux.stores.deals.getState(),
      changedDeals: []
    }
  },

  componentWillMount() {
    flux.stores.deals.addListener('change', this.storeChange)
  },

  componentWillUnmount() {
    flux.stores.deals.removeListener('change', this.storeChange)
  },

  saveDeal(deal){
    if(!deal.id){
      deal.organizationId = this.props.currentOrganization.id
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

  render() {
    var deals = this.state.deals.deals
    if(!deals){
      return "Wait!"
    }
    
    var freeDeal = <FreeDeal saveDeal={this.saveDeal} />
    var bxxDeal, bxyDeal, doxDeal, poxDeal
    for (let deal of deals) {
      if (deal.organizationId === this.props.currentOrganization.id){
        switch(deal.type) {
          case "Free":
              freeDeal = <FreeDeal saveDeal={this.saveDeal} freeDeal={deal} />
              break
          case "BXX":
              break
          case "BXY":
              break
          case "DOX":
              break
          case "POX":
              break
        }
      }

    } 

    return (
      <div>
        <div className="content_box-header">Deals</div>
        One free deal and one or more paid deal(s) are required
        {freeDeal}
        <BXXDeal saveDeal = {this.saveDeal} />
        <hr/>
        <BXYDeal saveDeal = {this.saveDeal} />
        <hr/>
        <DOXDeal saveDeal = {this.saveDeal} />
        <hr/>
        <POXDeal saveDeal = {this.saveDeal} />
        <button className="karma_button" onClick={this.saveDeals}>Save</button>
      </div>
    )
  }
})
