import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import mui from 'material-ui'

import {CardTitle, CircularProgress, SelectField, Card, CardMedia, Avatar, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getInitialState () {
    return {
      endDate: this.props.endDate,
      limit: null,
      primaryProductName: null,
      percentageOff: null,
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

  saveThisDeal(){
    var primaryProductName = this.state.primaryProductName ? this.state.primaryProductName : this.props.deal.primaryProductName
    var limit = this.state.limit ? this.state.limit : this.props.deal.limit
    var percentageOff = this.state.percentageOff ? this.state.percentageOff : this.props.deal.percentageOff
    var dollarValue = this.state.dollarValue ? this.state.dollarValue : this.props.deal.dollarValue
    var beginDate = this.state.beginDate ? this.state.beginDate : this.props.deal.beginDate
    var endDate = this.state.endDate? new Date(this.state.endDate) : new Date(this.props.deal.endDate)
    beginDate = new Date(parseInt(beginDate))
    endDate = new Date(beginDate.getFullYear()+2, beginDate.getMonth())

    if (!primaryProductName || !percentageOff || !limit || !dollarValue || isNaN(beginDate) || isNaN(endDate)) {
      return null
    }

    var deal = {
      primaryProductName,
      percentageOff,
      limit,
      dollarValue,
      beginDate: beginDate.getTime(),
      endDate: endDate.getTime(),
      type: "POX"
    } 

    deal.dealText = 'Get ' + percentageOff + '% off of ' + primaryProductName
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

  changeLimit (e) {
    this.setState({
      limit: e.target.value
    })
  },

  changePercentage (e) {
    this.setState({
      percentageOff: e.target.value
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
    var percentageOff = this.state.percentageOff ? this.state.percentageOff : this.props.deal.percentageOff
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

    var percents = [
      {value: 25 , text: '25%'},
      {value: 30 , text: '30%'},
      {value: 40 , text: '40%'},
      {value: 50 , text: '50%'},
      {value: 60 , text: '60%'},
      {value: 70 , text: '70%'},
      {value: 75 , text: '75%'},
      {value: 80 , text: '80%'},
      {value: 90 , text: '90%'}
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
      ? 'Get ' + dollarValue + ' dollars off of ' + primaryProductName
      : 'Your deal text to show here'

    var expanded = this.props.deal.primaryProductName ? false : true
    return(
      <Card style={{padding: '15px 2%', margin: '10px 0' }} initiallyExpanded={expanded}>
        <CardTitle
          style={{padding: '0'}}
          title=<span style={{fontSize:'18px'}}>{offerText}</span>
          subtitle= {'Limit: ' + limit}
          showExpandableButton={true} />

        <SelectField
          expandable={true}
          value={percentageOff}
          hintText="Percentage off of offering"
          onChange={this.changePercentage}
          floatingLabelText="Percentage Off"
          valueMember="value"
          displayMember="text"
          fullWidth={true}
          menuItems={percents} 
          disabled={this.props.editDisabled}/>

        <TextField
          expandable={true}
          hintText="Percentage off of what?"
          floatingLabelText="Offering Item"
          fullWidth={true}
          onBlur={this.saveThisDeal} 
          onChange={this.changePrimaryProductName} 
          defaultValue={primaryProductName} 
          disabled={this.props.editDisabled}
          multiLine={true}
          errorText={this.state.descriptionCounter}
          errorStyle={{color:this.state.descriptionCounterColor}}/>

        <SelectField
          expandable={true}
          value={limit}
          hintText="How Many Times Can This Deal Be Used"
          onChange={this.changeLimit}
          floatingLabelText="Use Limit"
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