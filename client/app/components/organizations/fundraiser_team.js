import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import mui from 'material-ui'

import {AppBar, FlatButton, Card, CardText, CardHeader, SelectField, CardTitle, TextField, RaisedButton, Slider} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  propTypes: {
    organization: React.PropTypes.object.isRequired,
    editDisabled: React.PropTypes.bool,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      newName: '',
      newEmail: '',
      organization: {},
      disableInput: false,
      fundraiserPayment: {},
      buttonDisabled: false,
      emailErrorMessage: null,
      nameErrorMessage: null
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

  componentWillMount () {
    if (this.props.organization) {
      this.setState({organization: this.props.organization})
    }
  },

  updateName (e) {
    if(e.target.value && this.validateEmail(this.state.newEmail)) {
      this.setState({newName: e.target.value, buttonDisabled: false})
      return
    }
    this.setState({
      newName: e.target.value
    })
  },

  updateNewEmail (e) {
    if(this.state.newName && this.validateEmail(e.target.value)) {
      this.setState({newEmail: e.target.value, buttonDisabled: false})
      return
    }
    this.setState({newEmail: e.target.value})
  },

  handleAddNew () {

    if (!this.validateEmail(this.state.newEmail)) {
      this.setState({emailErrorMessage: 'Must Be Email Format'})
      return
    }

    var fundraiserMembers = this.props.fundraiserMembers.filter(fundraiserMember => 
      fundraiserMember.organizationId === this.props.organization.id)

    var sameNameMembers = fundraiserMembers.filter(fundraiserMember =>
      fundraiserMember.name.toLowerCase().replace(/ /g,'') === this.state.newName.toLowerCase().replace(/ /g,''))

    if (sameNameMembers.length > 0) {
      this.setState({nameErrorMessage: 'Must have unique name'})
      return
    }

    var sameEmailMembers = fundraiserMembers.filter(fundraiserMember =>
      fundraiserMember.email.toLowerCase().replace(/ /g,'') === this.state.newEmail.toLowerCase().replace(/ /g,''))

    if (sameEmailMembers.length > 0) {
      this.setState({emailErrorMessage: 'This is already associated with another team mate'})
      return
    }

    var newMember = {
      name: this.state.newName,
      email: this.state.newEmail
    }

    var organization = this.state.organization

    flux.actions.organizations.createFundraiserMember(organization, newMember)

    this.setState({
      newName: null,
      newEmail: null,
      organization,
      emailErrorMessage: null,
      nameErrorMessage: null
    })
    React.findDOMNode(this.refs.add_form).style.display = 'none'
    React.findDOMNode(this.refs.add_button).style.display = 'inherit'
    this.setState({
      disableInput: false
    })
    React.findDOMNode(this.refs.saveButton).style.border = '3px solid rgb(75, 187, 44)'
  },

  validateEmail (emailString) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(emailString)
  },

  addClicked () {
    React.findDOMNode(this.refs.add_form).style.display = 'inherit'
    React.findDOMNode(this.refs.add_button).style.display = 'none'
    this.setState({
      disableInput: true
    })
  },

  saveAll () {
    this.setState({buttonDisabled: true})
    flux.actions.organizations.updateOwedAmounts(this.state.fundraiserPayment)

    React.findDOMNode(this.refs.add_form).style.display = 'none'
    React.findDOMNode(this.refs.add_button).style.display = 'inherit'
    React.findDOMNode(this.refs.save_all_button).style.display = 'none'
  },

  SaveClicked () {

  },

  cancelClicked () {
    React.findDOMNode(this.refs.add_form).style.display = 'none'
    React.findDOMNode(this.refs.add_button).style.display = 'inherit'
    this.setState({
      disableInput: false
    })
  },

  render() {
  injectTapEventPlugin()
    var fundraiserMembers = this.props.fundraiserMembers.filter(fundraiserMember => fundraiserMember.organizationId === this.props.organization.id)
    var listItems = fundraiserMembers.map((member, index) => {
      var disableInput = false
      if (member.oweAmount === 0 || this.state.disableInput) {
        disableInput = true
      }

      var statusIcon = member.status === 'inactive'
      ? <i className='fa fa-clock-o fa-2x'></i>
      : <i className='fa fa-check fa-2x'></i>
      console.log(member)
      var payment = member.status === 'active' && member.oweAmount > 0
        ? (
            <div expandable={true}>
              <TextField
                hintText="Cash Paid By This Person"
                floatingLabelText="Cash Payment"
                fullWidth={true}
                onChange={function(e){
                  React.findDOMNode(this.refs.add_form).style.display = 'none'
                  React.findDOMNode(this.refs.add_button).style.display = 'none'
                  if (parseInt(e.target.value, 10) > (member.oweAmount / 100) || isNaN(e.target.value)) {
                    e.target.value = e.target.value.substring(0, e.target.value.length - 1)
                    return
                  }
                  var newOweAmount = (member.oweAmount - (parseInt(e.target.value, 10) * 100))
                  var fundraiserPayment = {fundraiserMemberId: e.target.id, newOweAmount: newOweAmount}
                  this.setState({fundraiserPayment: fundraiserPayment, buttonDisabled: false})
                }.bind(this)} 
                id={member.id}
                expandable={true}/>
           
              <RaisedButton 
                expandable={true}
                fullWidth={true} 
                onClick={this.saveAll} 
                disabled={this.state.buttonDisabled}
                label="Record Payment" 
                style={{
                  margin: '15px 0 0 0'
                }}/>
            </div>
          )
        : null

        var subDirectory = location.hostname.charAt(0)
        var URL = subDirectory + '.kkrd.org/' + this.props.organization.name.toLowerCase().replace(/ /g,'') + '/' + member.name.toLowerCase().replace(/ /g,'')

      return (
        <Card style={{padding: '0 2%'}} initiallyExpanded={false}>
          <CardHeader
            title=<span style={{fontSize:'22px'}}>{member.name}</span>
            avatar={statusIcon}
            showExpandableButton={true}>
          </CardHeader> 
          <CardText style={{padding: '5px 0'}} expandable={true}>Affiliate Link: {URL}</CardText>
          <CardText style={{padding: '5px 0'}} expandable={true}>Raised Amount: ${member.raisedAmount / 100}</CardText>
          <CardText style={{padding: '5px 0'}} expandable={true}>Owed Amount: ${member.oweAmount / 100}</CardText>
          {payment}
        </Card>
      )
    })
    return (
      <div>

        {listItems}

        <RaisedButton 
            ref='add_button'
            fullWidth={true} 
            onClick={this.addClicked}
            disabled={this.state.buttonDisabled}
            label="Add" 
            style={{
              margin: '15px 0 0 0'
            }}/>
        <div className='add_member' ref='add_form'>
          <TextField
            hintText="Jon H, Alex, Haley"
            floatingLabelText="Name"
            fullWidth={true}
            onChange={this.updateName} 
            value= {this.state.newName}
            errorText={this.state.nameErrorMessage}/>

          <TextField
            hintText="abc@example.com"
            floatingLabelText="Email"
            fullWidth={true}
            onChange={this.updateNewEmail} 
            value= {this.state.newEmail}
            errorText={this.state.emailErrorMessage}/>

          <RaisedButton 
            fullWidth={true} 
            onClick={this.handleAddNew} 
            disabled={this.state.buttonDisabled}
            label="Save" 
            style={{
              margin: '15px 0 0 0'
            }}/>
          <RaisedButton 
            fullWidth={true} 
            onClick={this.cancelClicked} 
            label="Cancel" 
            style={{
              margin: '15px 0 0 0'
            }}/>
        </div>
      </div>
    )
  }
})
