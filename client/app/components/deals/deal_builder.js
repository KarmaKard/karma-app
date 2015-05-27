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
      changedDeals: [],
      newDealPlaceholder: null
    }
  },

  saveDeal(deal){
    if(!deal.id){
      deal.organizationId = this.props.organizationId
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

  lookupDeal(deal, i) {
    switch(deal.type) {
      case "Free":
        return <FreeDeal key={i} saveDeal={this.saveDeal} deal={deal} changeMade={this.changeMade}/>
        break
      case "BXX":
        return <BXXDeal key={i} saveDeal={this.saveDeal} deal={deal} changeMade={this.changeMade}/>
        break
      case "BXY":
        return <BXYDeal key={i} saveDeal={this.saveDeal} deal={deal} changeMade={this.changeMade}/>
        break
      case "DOX":
        return <DOXDeal key={i} saveDeal={this.saveDeal} deal={deal} changeMade={this.changeMade}/>
        break
      case "POX":
        return <POXDeal key={i} saveDeal={this.saveDeal} deal={deal} changeMade={this.changeMade}/>
        break
    }
  },

  newDeal(){
    var newDeal = {type: React.findDOMNode(this.refs.dealTypeSelect).value}
    var newDealPlaceholder = this.lookupDeal(newDeal,0)
    this.setState({newDealPlaceholder})
  },

  changeMade(){
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(242, 29, 29)"
  },

  saveClicked(){
    React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(75, 187, 44)"
    this.props.saveDeals(this.state.changedDeals)
  },

  render() {
    if(!this.props.deals){
      return <span>No Deals</span>
    }
    
    var deals = this.props.deals
    var dealsComponents = deals.map(this.lookupDeal)

    return (
      <div>
        <div className="content_box-header">
          Deals
        </div>
        One free deal and one or more paid deal(s) are required
        {dealsComponents}
        <select ref="dealTypeSelect" onChange={this.newDeal} className="karma_select">
          <option>Add Another Deal</option>
          <option value="Free">Free</option>
          <option value="BXX">Buy X get X Free</option>
          <option value="BXY">Buy X get Y Free</option>
          <option value="DOX">Dollars off X</option>
          <option value="POX">Percentage off X</option>
        </select>
        <div ref="addDealPlaceholder">{this.state.newDealPlaceholder}</div>
        <button ref="saveButton" className="karma_button" onClick={this.saveClicked}>
          Save
        </button>
      </div>
    )
  }
})
