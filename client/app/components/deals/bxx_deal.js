import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import mui from 'material-ui'

import {CardTitle, CircularProgress, SelectField, Card, CardMedia, Avatar, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getInitialState(){
    return {
      endDate: this.props.endDate,
      limit: null,
      primaryProductName: null,
      primaryUsageLimit: null,
      secondaryProductName: null,
      secondaryUsageLimit: null,
      dollarValue: null,
      beginDate: this.props.deal.beginDate,
      valueErrorMessage: null,
      dealText: null
    }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  saveThisDeal () {
    var primaryProductName = this.state.primaryProductName ? this.state.primaryProductName : this.props.deal.primaryProductName
    var primaryUsageLimit =this.state.primaryUsageLimit ? this.state.primaryUsageLimit : this.props.deal.primaryUsageLimit
    var secondaryProductName = this.state.secondaryProductName ? this.state.secondaryProductName : this.props.deal.secondaryProductName
    var secondaryUsageLimit = this.state.secondaryUsageLimit ? this.state.secondaryUsageLimit : this.props. deal.secondaryUsageLimit
    var limit = this.state.limit ? this.state.limit : this.props.deal.limit
    var dollarValue = this.state.dollarValue ? this.state.dollarValue : this.props.deal.dollarValue
    var beginDate = this.state.beginDate ? this.state.beginDate : this.props.deal.beginDate
    var endDate = this.state.endDate? new Date(this.state.endDate) : new Date(this.props.deal.endDate)
    beginDate = new Date(parseInt(beginDate))
    endDate = new Date(beginDate.getFullYear()+2, beginDate.getMonth())

    if (!primaryProductName || !primaryUsageLimit || !secondaryProductName || !secondaryUsageLimit || !limit || !dollarValue || isNaN(beginDate) || isNaN(endDate)) {
      return null
    }

    var deal = {
      primaryProductName,
      primaryUsageLimit,
      secondaryProductName,
      secondaryUsageLimit,
      limit,
      dollarValue,
      beginDate: beginDate.getTime(),
      endDate: endDate.getTime(),
      type: "BXX"
    } 

    deal.dealText = "Buy " + primaryUsageLimit + " "+ primaryProductName + ", get " + secondaryUsageLimit + " " + secondaryProductName + " Free!"
    this.setState({dealText: deal.dealText})
    if(this.props.deal){
      deal.id = this.props.deal.id
    }    
    this.props.saveDeal(deal)
  },

  deleteClicked() {
    flux.actions.deals.deleteDeal(this.props.deal)
  },  
  
  changeDates(e){
    var beginDate = new Date(parseInt(e.target.value))
    var endDate = new Date(beginDate.getFullYear()+2, beginDate.getMonth())
    endDate = endDate.toDateString()
    this.setState({endDate, beginDate: parseInt(e.target.value)})
    this.props.changeMade()
  },

  changePrimaryProductName (e) {
    this.setState({
      primaryProductName: e.target.value
    })
  },

  changePrimaryUsageLimit (e) {
    this.setState({
      primaryUsageLimit: e.target.value
    })
  },

  changeSecondaryProductName (e) {
    this.setState({
      secondaryProductName: e.target.value
    })
  },

  changeSecondaryUsageLimit (e) {
    this.setState({
      secondaryUsageLimit: e.target.value
    })
  },

  changeLimit (e) {
    this.setState({
      limit: e.target.value
    })
  },

  changeDollarValue (e) {
    if(!e.target.value) {
      this.setState({dollarValue: e.target.value, valueErrorMessage: null})
      return
    }

    if (isNaN(e.target.value) || !/^(?:\d*\.\d{0,2}|\d+)$/.test(e.target.value)) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
      this.setState({valueErrorMessage: 'Must be a digit'})
      return
    }

    this.setState({dollarValue: e.target.value, valueErrorMessage: null})
  },

  render() {
    
  
    
    if (!this.props.deal){
      return <span />
    }

    var primaryProductName = this.state.primaryProductName ? this.state.primaryProductName : this.props.deal.primaryProductName
    var primaryUsageLimit = this.state.primaryUsageLimit ? this.state.primaryUsageLimit : this.props.deal.primaryUsageLimit
    var secondaryProductName = this.state.secondaryProductName ? this.state.secondaryProductName : this.props.deal.secondaryProductName
    var secondaryUsageLimit = this.state.secondaryUsageLimit ? this.state.secondaryUsageLimit : this.props.deal.secondaryUsageLimit
    var limit = this.state.limit ? this.state.limit : this.props.deal.limit
    var dollarValue = this.state.dollarValue ? this.state.dollarValue : this.props.deal.dollarValue
    var beginDate = this.state.beginDate ? this.state.beginDate : this.props.deal.beginDate
    var endDate = this.state.endDate? new Date(this.state.endDate) : new Date(this.props.deal.endDate)
    var endDateText = endDate
      ? endDate.toDateString()
      : null

    var limits = [
      {value: 1 , text: '1'},
      {value: 2 , text: '2'},
      {value: 3 , text: '3'},
      {value: 4 , text: '4'},
      {value: 5 , text: '5'},
      {value: 6 , text: '6'},
      {value: 7 , text: '7'},
      {value: 8 , text: '8'},
      {value: 9 , text: '9'},
      {value: 10, text: '10'},
      {value: 'unlimited', text: 'unlimited'}
    ]

    var usageLimits = [
      {value: 1 , text: '1'},
      {value: 2 , text: '2'},
      {value: 3 , text: '3'},
      {value: 4 , text: '4'},
      {value: 5 , text: '5'},
      {value: 6 , text: '6'},
      {value: 7 , text: '7'},
      {value: 8 , text: '8'},
      {value: 9 , text: '9'},
      {value: 10, text: '10'}
    ]

    var startDate = [
      {value:this.props.activePeriod.beginDate1.getTime(), text:this.props.activePeriod.beginDate1.toDateString()},
      {value:this.props.activePeriod.beginDate2.getTime(), text:this.props.activePeriod.beginDate2.toDateString()}
    ]

    var displayDeleteButton = this.props.deal.primaryProductName
      ? (<RaisedButton 
          expandable={true}
          fullWidth={true} 
          onClick={this.deleteClicked} 
          disabled={this.props.editDisabled}
          label="Delete" 
          style={{
            margin: '15px 0 0 0'
          }}/>)
      : null

    var offerText = primaryProductName 
      ? "Buy " + primaryUsageLimit + " "+ primaryProductName + ", get " + secondaryUsageLimit + " " + secondaryProductName + " Free!"
      : 'Your Deal Text To Show Here'

    var expanded = this.props.deal.primaryProductName ? false : true

    return(
      <Card style={{padding: '15px 2%', margin:'10px 0'}} initiallyExpanded={expanded}>
        <CardTitle
          style={{padding: '0'}}
          title=<span style={{fontSize:'18px'}}>{offerText}</span>
          subtitle= {'Limit: ' + limit}
          showExpandableButton={true} />
        
        <SelectField
          expandable={true}
          value={primaryUsageLimit}
          hintText="Buy 'X' amount of..."
          onChange={this.changePrimaryUsageLimit}
          floatingLabelText="Required Purchase Amount"
          valueMember="value"
          displayMember="text"
          fullWidth={true}
          menuItems={usageLimits} 
          disabled={this.props.editDisabled}/>

        <TextField
          expandable={true}
          hintText="The required purchase item"
          floatingLabelText="Required Purchase Item"
          fullWidth={true}
          onBlur={this.saveThisDeal} 
          onChange={this.changePrimaryProductName} 
          defaultValue={primaryProductName} 
          disabled={this.props.editDisabled}
          multiLine={true}/>

        <SelectField
          expandable={true}
          value={secondaryUsageLimit}
          hintText="Get 'Y' amount of ..."
          onChange={this.changeSecondaryUsageLimit}
          floatingLabelText="Offering Amount"
          valueMember="value"
          displayMember="text"
          fullWidth={true}
          menuItems={usageLimits} 
          disabled={this.props.editDisabled}/>

        <TextField
          expandable={true}
          hintText="The offer item"
          floatingLabelText="Offer Item"
          fullWidth={true}
          onBlur={this.saveThisDeal} 
          onChange={this.changeSecondaryProductName} 
          defaultValue={secondaryProductName} 
          disabled={this.props.editDisabled}
          multiLine={true}/>

        <SelectField
          expandable={true}
          value={limit}
          hintText="How Many Times Can This Deal Be Used"
          onChange={this.changeLimit}
          floatingLabelText="How Many Times Can This Deal Be Used?"
          valueMember="value"
          displayMember="text"
          fullWidth={true}
          menuItems={limits} 
          disabled={this.props.editDisabled}/>

        <TextField
          expandable={true}
          hintText="Maximum Value of Deal (Ex. 0.00)"
          floatingLabelText="Maximum Value"
          fullWidth={true}
          onBlur={this.saveThisDeal} 
          onChange={this.changeDollarValue} 
          value={dollarValue} 
          disabled={this.props.editDisabled}
          multiLine={true}
          errorText={this.state.valueErrorMessage}/>


        <SelectField
          expandable={true}
          value={beginDate}
          hintText="Beginning Date"
          onBlur={this.saveThisDeal} 
          onChange={this.changeDates}
          floatingLabelText="Deal Contract Start Date"
          valueMember="value"
          displayMember="text"
          fullWidth={true}
          menuItems={startDate} 
          disabled={this.props.editDisabled}/>

        <TextField
          expandable={true}
          hintText="Deal Term End Date"
          floatingLabelText="Deal Contract End Date"
          fullWidth={true}
          value={endDateText} 
          disabled={true}
          multiLine={true}/>

        {displayDeleteButton}
      </Card>
    )
  }
})
