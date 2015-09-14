import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Link } from 'react-router'
import { flux } from './../../main'
import FundraiserProfile from './edit_fundraiser_profile'
import FundraiserTeam from './fundraiser_team'
import FundraiserBank from './fundraiser_bank'
import mui from 'material-ui'
import {CardTitle, CircularProgress, Card, CardMedia, Avatar, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  propTypes: {
    organization: React.PropTypes.object.isRequired,
    updateOrganization: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
    payments: React.PropTypes.array.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      organization: {}
    }
  },

  componentWillMount () {
    if (this.props.organization) {
      this.setState({organization: this.props.organization})
    }
  },

  submitToReview () {
    var organization = this.state.organization
    organization.status = 'pending'
    this.props.updateOrganization(organization)
  },

  rejectOrganization () {
    var organization = this.state.organization
    organization.status = 'inactive'

    this.props.updateOrganization(organization)
  },

  confirmOrganization () {
    var organization = this.props.organization
    organization.status = 'active'
    var fundraiserMembers = this.props.fundraiserMembers.filter(fundraiserMember => fundraiserMember.organizationId === organization.id)
    flux.actions.organizations.confirmFundraiser(organization, fundraiserMembers)
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
  injectTapEventPlugin()
    var organization = this.props.organization
    var payments = this.props.payments.filter(payment => payment.fundraiserId === organization.id)
    var submitButton
    var message = 'You have some task(s) remaining before your business can be reviewed:'
    var paymentPerDayChart = null
    var fundraiserMembers = this.props.fundraiserMembers.filter(fundraiserMember => fundraiserMember.organizationId === organization.id)

    var profileStatus = !this.props.organization.description ||
    !this.props.organization.purpose ||
    !this.props.organization.logoURL ||
    !this.props.organization.name ? 0 : 1

    var teamStatus = fundraiserMembers.length === 0 ? 0 : 1

    var bankStatus = !this.props.organization.bankInfo ||
    !this.props.organization.bankInfo.accountNumber ||
    !this.props.organization.bankInfo.birthDate ||
    !this.props.organization.bankInfo.firstName ||
    !this.props.organization.bankInfo.lastName||
    !this.props.organization.bankInfo.routingNumber ||
    !this.props.organization.bankInfo.tosChecked ? 0 : 1
    

    if (bankStatus && teamStatus && profileStatus) {
      message = "All required information has been completed. Please thoroughly review your information before you submit this fundraiser to be reviewed."
      submitButton = <RaisedButton className='raisedButton' primary={true} 
              fullWidth={true} 
              onClick={this.submitToReview} 
              label="Submit To Review" 
              style={{
                margin: '0 0 25px 0'
              }}/>
    }

    if (organization.status === 'pending' && this.props.user.roles.superadmin) {
      message = "Please Review this organization and Click the button to authorize their deals on our app."
      submitButton = (
        <div>
          <RaisedButton className='raisedButton' primary={true} 
            fullWidth={true} 
            onClick={this.confirmOrganization} 
            label="Confirm Organization" 
            style={{
              margin: '0 0 25px 0'
            }}/>
          <RaisedButton className='raisedButton' primary={true} 
            fullWidth={true} 
            onClick={this.rejectOrganization} 
            label="Reject Organization" 
            style={{
              margin: '0 0 25px 0'
            }}/>
        </div>
      )
    } else if (organization.status === 'pending') {
      message = 'Your Organization is now being reviewed. Do not change any of the information you have already submitted.'
      submitButton = null
    }

    if (organization.status === 'active') {

      var cardAmount = 0
      var totalFundraised = 0
      var cashFundraised = 0
      var squareFundraised = 0
      var onlineFundraised = 0

      payments.forEach(payment => {
        cardAmount += payment.cardAmount
        totalFundraised += payment.amount
        switch (payment.paymentType) {
          case 'cash':
              cashFundraised += payment.amount
              break
          case 'square':
              squareFundraised += payment.amount
              break
          case 'stripe':
              onlineFundraised += payment.amount
              break
          default:
        }
      })

      message = (<div>
                  <h2>Status: Active</h2>
                  <h2>Cards Sold: {cardAmount}</h2>
                  <h2>Total Fundraised: {'$' + (totalFundraised / 100)}</h2>
                  <h2>Cash Fundraised: {'$' + (cashFundraised / 100)}</h2>
                  <h2>Square Fundraised: {'$' + (squareFundraised / 100)}</h2>
                  <h2>Online Fundraised: {'$' + (onlineFundraised / 100)}</h2>
                  <h2>KarmaKard Balance:</h2>
                </div>)

      submitButton = null
    }
    teamStatus = this.getStatusIcon(teamStatus)
    bankStatus = this.getStatusIcon(bankStatus)
    profileStatus = this.getStatusIcon(profileStatus)

    return (
      <div>
        <CardTitle className='cardTitle'  title={this.props.organization.name} />
        <CardText className='cardText' >{message}</CardText>
        {submitButton}
        <Card style={{padding: '0 2%'}} initiallyExpanded={false}>
          <CardHeader className='cardHeader' 
            title=<span style={{fontSize:'30px'}}>Profile</span>
            avatar={profileStatus}
            showExpandableButton={true}>
          </CardHeader> 
          <FundraiserProfile expandable={true} {... this.props}/>
          <CardText className='cardText'  style={{padding: '5px 0'}} expandable={true}></CardText>
        </Card>
        <Card style={{padding: '0 2%'}} initiallyExpanded={false}>
          <CardHeader className='cardHeader' 
            title=<span style={{fontSize:'30px'}}>Team</span>
            avatar={teamStatus}
            showExpandableButton={true}>
          </CardHeader> 
          <FundraiserTeam expandable={true} {... this.props} />
          <CardText className='cardText'  style={{padding: '5px 0'}} expandable={true}></CardText>
        </Card>
        <Card style={{padding: '0 2%'}} initiallyExpanded={false}>
          <CardHeader className='cardHeader' 
            title=<span style={{fontSize:'30px'}}>Bank Information</span>
            avatar={bankStatus}
            showExpandableButton={true}>
          </CardHeader> 
          <FundraiserBank expandable={true} {... this.props} />
          <CardText className='cardText'  style={{padding: '5px 0'}} expandable={true}></CardText>
        </Card>
      </div>
    )
  }
})
