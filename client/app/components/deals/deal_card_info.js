import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from './../../main'
import { Link } from 'react-router'
import { formatDateString } from './../../utils/transforms'
import mui from 'material-ui'
import {CardTitle,  List, ListItem, TextField, Avatar, RaisedButton, FlatButton, Card, CardText, CardHeader, FontIcon} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({ 

  getInitialState () {
    return {
      showShare: false,
      buttonDisabled: true,
      email: null
    }
  },

  showShare() {
    this.setState({showShare: true})
  },

  sendShare() {
    flux.actions.users.shareCard(this.state.email, this.props.donation, this.props.user)
    this.setState({showShare: false})
  },

  cancelShare() {
    this.setState({showShare: false})
  },

  emailChanged (e) {
    if (this.validateEmail(e.target.value)) {
      this.setState({buttonDisabled: false, email: e.target.value})
    } else {
      this.setState({buttonDisabled: true})
    }
  },

  validateEmail (emailString) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(emailString)
  },

  render() {

    var showShare = this.state.showShare
    ? <div expandable={true}>
        <TextField
          fullWidth={true}
          hintText="Email of person you want to give card to."
          floatingLabelText="Recipient's Email" 
          onChange={this.emailChanged}/>
        <RaisedButton style={{margin:'10px 0'}} fullWidth={true} onClick={this.sendShare} disabled={this.state.buttonDisabled} label='Send Share' />
        <RaisedButton style={{margin:'10px 0'}} fullWidth={true} onClick={this.cancelShare} label='Cancel Share' />
      </div>
    : <div expandable={true}>
        <RaisedButton style={{margin:'10px 0'}} fullWidth={true} onClick={this.showShare} label='Share This Card' />
      </div>
    return (
      <Card style={{padding:'5px 10px'}}> 
        <CardHeader
          title={'Card Active Dates: ' + formatDateString(this.props.donationDate) + ' - ' + formatDateString(this.props.expirationDate)}
          subtitle={'Fundraiser: ' + this.props.organization.name}
          avatar=<Avatar>{this.props.cardCounter}</Avatar>
          showExpandableButton={true}/>
        <CardText expandable={true}>Usage Amount: {this.props.redemptions.length}</CardText>
        <CardText expandable={true}>Saved Amount: ${this.props.savedAmount}</CardText>
        {showShare}

      </Card>
    )
  }
})
