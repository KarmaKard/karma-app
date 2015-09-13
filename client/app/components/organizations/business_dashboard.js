import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import { Link } from 'react-router'
import BusinessProfile from './business_profile'
import Locations from './locations'
import Keywords from './keywords'
import DealBuilder from './../deals/deal_builder.js'
import mui from 'material-ui'
import {CardTitle, CircularProgress, Card, CardMedia, Avatar, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  propTypes: {
    organization: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      organization: {}
    }
  },

  componentWillMount() {
    if(this.props.organization){
      this.setState({
        organization: this.props.organization
      })
    }
  },

  submitToReview(){
    var organization = this.state.organization
    organization.status = "pending"
    this.props.updateOrganization(organization)
  },

  confirmOrganization(){
    var organization = this.state.organization
    organization.status = "active"

    this.props.updateOrganization(organization)
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  getStatusIcon (status) {
    return status 
      ? <i style={{color: '#73BF73'}} className="material-icons md-36">check_circle</i>
      : <i style={{color: '#F67385'}} className="material-icons md-36">mode_edit</i>
  },

  render() {

    var addLocations, addDeals, addKeywords, submitButton
    var message = "You have some task(s) remaining before your business can be reviewed:"

    var profileStatus = !this.props.organization.description ||
      !this.props.organization.logoURL ||
      !this.props.organization.name ||
      !this.props.organization.beginDate ? 0 : 1

    var locationsStatus = this.props.organization.locations.length === 0 ? 0 : 1

    var keywordsStatus = 0
    for (var i = 0; i < this.props.organization.keywords.length; i++) {
      if (this.state.organization.keywords[i]) {
        keywordsStatus = 1
      }
    }
        
    var dealsStatus
    if(this.props.deals.length >= 2){
      var freeDealExists
      this.props.deals.forEach(function(deal){
        if(deal.type === "Free"){
          freeDealExists = true
        }
      })
      if(freeDealExists !== true){
        dealsStatus = 0
      } else {
        dealsStatus = 1
      }
    }
    else{
      dealsStatus = 0
    }

    if(dealsStatus && keywordsStatus && locationsStatus && profileStatus) {
        message = "All required information has been completed. Please thoroughly review your information before you submit this business to be reviewed."
        submitButton = <RaisedButton 
                fullWidth={true} 
                onClick={this.submitToReview} 
                label="Submit To Review" 
                style={{
                  margin: '0 0 25px 0'
                }}/>
    }

    if(this.props.organization.status === "pending" && this.props.user.roles.superadmin){
      message = "Please Review this organization and Click the button to authorize their deals on our app."
      submitButton = <RaisedButton 
                fullWidth={true} 
                onClick={this.confirmOrganization} 
                label="Confirm Organization" 
                style={{
                  margin: '0 0 25px 0'
                }}/>
    }
    else if(this.props.organization.status === "pending"){
      message = "Your Organization is now being reviewed. Do not change any of the information you have already submitted."
      submitButton = null
    }

    if(this.props.organization.status === "active"){
      message = "Your Organization is now active! Any changes you make to your information will require another review."
      submitButton = null
    }

    dealsStatus = this.getStatusIcon(dealsStatus)
    keywordsStatus = this.getStatusIcon(keywordsStatus)
    locationsStatus = this.getStatusIcon(locationsStatus)
    profileStatus = this.getStatusIcon(profileStatus)
    
    return (
      <div>
        <CardTitle title={this.props.organization.name} />
        <CardText>{message}</CardText>
        {submitButton}
        <Card style={{padding: '0 2%'}} initiallyExpanded={false}>
          <CardHeader
            title=<span style={{fontSize:'30px'}}>Profile</span>
            avatar={profileStatus}
            showExpandableButton={true}>
          </CardHeader> 
          <BusinessProfile expandable={true} {... this.props}/>
          <CardText style={{padding: '5px 0'}} expandable={true}></CardText>
        </Card>
        <Card style={{padding: '0 2%'}} initiallyExpanded={false}>
          <CardHeader
            title=<span style={{fontSize:'30px'}}>Locations</span>
            avatar={locationsStatus}
            showExpandableButton={true}>
          </CardHeader> 
          <Locations expandable={true} {... this.props} />
          <CardText style={{padding: '5px 0'}} expandable={true}></CardText>
        </Card>
        <Card style={{padding: '0 2%'}} initiallyExpanded={false}>
          <CardHeader
            title=<span style={{fontSize:'30px'}}>Keywords</span>
            avatar={keywordsStatus}
            showExpandableButton={true}>
          </CardHeader> 
          <Keywords expandable={true} {... this.props} />
          <CardText style={{padding: '5px 0'}} expandable={true}></CardText>
        </Card>
        <Card style={{padding: '0 2%'}} initiallyExpanded={false}>
          <CardHeader
            title=<span style={{fontSize:'30px'}}>Deals</span>
            avatar={dealsStatus}
            showExpandableButton={true}>
          </CardHeader> 
          <DealBuilder expandable={true} {... this.props} />
          <CardText style={{padding: '5px 0'}} expandable={true}></CardText>
        </Card>

        <ul className="toDoList">
          {addLocations}
          {addDeals}
          {addKeywords}
        </ul>
      </div>
    )
  }
})
