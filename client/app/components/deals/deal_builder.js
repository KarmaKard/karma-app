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
      newDeals: [],
      changedDeals: [],
      activePeriod: this.getActivePeriod(),
      newDealPlaceholder: null,
      editDisabled: false
    }
  },

  componentWillMount() {
    if(this.props.editDisabled === null){
      return null
    }
    var editDisabled  = 
      this.props.organization.status === "active" || 
      this.props.organization.status === "pending" || 
      this.props.user.roles.superadmin
      ? true 
      : false

    this.setState({editDisabled})
  },

  saveDeal(deal){
    if(!deal.id){
      deal.organizationId = this.props.organization.id
      var newDeals = this.state.newDeals
      for (let i in newDeals) {
        if (newDeals[i].dealText === deal.dealText) {
          newDeals.splice(i, 1, deal)
          this.setState({newDeals})
          return
        }
      }
      newDeals = this.state.newDeals.concat(deal)
      this.setState({newDeals})
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
        return <FreeDeal key={i} saveDeal={this.saveDeal} activePeriod={this.state.activePeriod} deal={deal} editDisabled={this.state.editDisabled} changeMade={this.changeMade}/>
        break
      case "BXX":
        return <BXXDeal key={i} saveDeal={this.saveDeal} activePeriod={this.state.activePeriod} deal={deal} editDisabled={this.state.editDisabled} changeMade={this.changeMade}/>
        break
      case "BXY":
        return <BXYDeal key={i} saveDeal={this.saveDeal} activePeriod={this.state.activePeriod} deal={deal} editDisabled={this.state.editDisabled} changeMade={this.changeMade}/>
        break
      case "DOX":
        return <DOXDeal key={i} saveDeal={this.saveDeal} activePeriod={this.state.activePeriod} deal={deal} editDisabled={this.state.editDisabled} changeMade={this.changeMade}/>
        break
      case "POX":
        return <POXDeal key={i} saveDeal={this.saveDeal} activePeriod={this.state.activePeriod} deal={deal} editDisabled={this.state.editDisabled} changeMade={this.changeMade}/>
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
    if(this.state.newDeals.length > 0){
      this.setState({newDealPlaceholder:null})
      flux.actions.deals.create(this.state.newDeals)
      this.setState({newDeals: []})
      React.findDOMNode(this.refs.dealTypeSelect).value = "add"
      React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(75, 187, 44)"
    }
    if(this.state.changedDeals.length > 0){
      flux.actions.deals.updateDeals(this.state.changedDeals)
      this.setState({changedDeals: []})
      React.findDOMNode(this.refs.saveButton).style.border="3px solid rgb(75, 187, 44)"
    }

  },

  getActivePeriod(){
    var date = new Date()
    var thisMonth = date.getMonth()
    var thisYear = date.getFullYear()
    var nextYear = thisYear + 1


    var beginDate1, beginDate2, beginDate1Text, beginDate2Text, endDate1Text, endDate2Text
    
    if(thisMonth < 3){
      beginDate1 = new Date(thisYear, 3)
      beginDate2 = new Date(thisYear, 6)
    }
    else if(thisMonth < 6){
      beginDate1 = new Date(thisYear, 6)
      beginDate2 = new Date(thisYear, 9)
    }
    else if(thisMonth < 9){
      beginDate1 = new Date(thisYear, 9)
      beginDate2 = new Date(nextYear, 0)
    }
    else {
      beginDate1 = new Date(thisYear, 0)
      beginDate2 = new Date(nextYear, 3)
    }

    var activePeriod = {
      beginDate1,
      beginDate2,
    }

    return activePeriod
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
        <select 
          ref="dealTypeSelect" 
          onChange={this.newDeal} 
          defaultValue="add" 
          className="karma_select"
          disabled={this.state.editDisabled}>
          <option value="add">Add Another Deal</option>
          <option value="Free">Free</option>
          <option value="BXX">Buy X get X Free</option>
          <option value="BXY">Buy X get Y Free</option>
          <option value="DOX">Dollars off X</option>
          <option value="POX">Percentage off X</option>
        </select>
        <div ref="addDealPlaceholder">{this.state.newDealPlaceholder}</div>
        <button 
          ref="saveButton" 
          className="karma_button" 
          hidden={this.state.editDisabled} 
          onClick={this.saveClicked}>
            Save
        </button>
      </div>  
    )
  }
})
