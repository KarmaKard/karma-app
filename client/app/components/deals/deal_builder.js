import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import FreeDeal from './free_deal'
import BXXDeal from './bxx_deal'
import BXYDeal from './bxy_deal'
import POXDeal from './pox_deal'
import DOXDeal from './dox_deal'
import mui from 'material-ui'

import {CardTitle, CircularProgress, SelectField, Card, CardMedia, Avatar, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  getInitialState() {
    return {
      newDeals: [],
      changedDeals: [],
      activePeriod: this.getActivePeriod(),
      newDealPlaceholder: null,
      editDisabled: false, 
      buttonDisabled: true,
      dealOptionSelected:null,
      displayAddDropdown: false
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

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  showDropDown () {
    this.setState({displayAddDropdown: true})
  },

  hideDropDown () {
    this.setState({displayAddDropdown: false, buttonDisabled: true, newDealPlaceholder: null, dealOptionSelected: null })
  },

  saveDeal(deal){
    if(!deal.id){
      deal.organizationId = this.props.organization.id
      var newDeals = this.state.newDeals
      for (let i in newDeals) {
        if (newDeals[i].dealText === deal.dealText) {
          newDeals.splice(i, 1, deal)
          this.setState({newDeals, buttonDisabled: false})
          return
        }
      }
      newDeals = this.state.newDeals.concat(deal)
      this.setState({newDeals, buttonDisabled: false})
    }
    else{
      var changedDeals = this.state.changedDeals
      for (let i in changedDeals) {
        if (changedDeals[i].id === deal.id) {
          changedDeals.splice(i, 1, deal)
          this.setState({changedDeals, buttonDisabled: false})
          return
        }
      }
      changedDeals = this.state.changedDeals.concat(deal)
      this.setState({changedDeals, buttonDisabled: false})
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

  newDeal(e){
    var newDeal = {type: e.target.value}
    var newDealPlaceholder = this.lookupDeal(newDeal,0)
    this.setState({newDealPlaceholder, dealOptionSelected: e.target.value})
  },

  changeMade(){
    this.setState({buttonDisabled: false})
  },

  saveClicked(){
    if(this.state.newDeals.length > 0){
      this.setState({newDealPlaceholder:null, buttonDisabled: true, displayAddDropdown: false})
      flux.actions.deals.create(this.state.newDeals)
      this.setState({newDeals: []})
    }
    if(this.state.changedDeals.length > 0){
      flux.actions.deals.updateDeals(this.state.changedDeals)
      this.setState({changedDeals: [], buttonDisabled: true, displayAddDropdown: false})
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

  selectDealType (e) {

  },

  render () {
    if (!this.props.deals){
      return <span>No Deals</span>
    }
    var deals = this.props.deals
    var dealsComponents = deals.map(this.lookupDeal)
    var saveButton = this.state.buttonDisabled
      ? null
      : (<RaisedButton 
          fullWidth={true} 
          onClick={this.saveClicked} 
          disabled={this.state.buttonDisabled}
          hidden={this.state.editDisabled} 
          label="Save" 
          style={{
            margin: '15px 0 0 0'
          }}/>)

    var options = [
      {value: "Free", text: 'Free'},
      {value: "BXX", text: 'Buy X get X Free'},
      {value: "BXY", text: 'Buy X get Y Free'},
      {value: "DOX", text: 'Dollars off X'},
      {value: "POX", text: 'Percentage off X'}
    ]

    var displayAddDropdown = !this.state.displayAddDropdown
      ? (<RaisedButton 
          expandable={true}
          fullWidth={true} 
          onClick={this.showDropDown} 
          disabled={this.props.editDisabled}
          label="Add Deal" 
          style={{
            margin: '15px 0 0 0'
          }}/>)
      : (
          <SelectField
            expandable={true}
            value={this.state.dealOptionSelected}
            hintText="Select Deal Type"
            onChange={this.newDeal}
            floatingLabelText="Select Deal Type"
            valueMember="value"
            displayMember="text"
            fullWidth={true}
            menuItems={options} 
            disabled={this.state.editDisabled}/>
        )
    var cancelButton = this.state.displayAddDropdown
      ? <RaisedButton 
          expandable={true}
          fullWidth={true} 
          onClick={this.hideDropDown} 
          disabled={this.props.editDisabled}
          label="Cancel" 
          style={{
            margin: '15px 0 0 0'
          }}/>
      : null
    return (
      <div>
        <CardText>*One free deal and one or more paid deal(s) are required</CardText>
        {dealsComponents}
        {displayAddDropdown}
        <div ref="addDealPlaceholder">{this.state.newDealPlaceholder}</div>
        {saveButton}
        {cancelButton}
      </div>  
    )
  }
})
