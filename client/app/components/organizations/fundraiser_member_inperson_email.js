import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import mui from 'material-ui'

import {AppCanvas, AppBar, SelectField, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  getInitialState () {
    return {
      disabledButton: true,
      email: null
    }
  },

  propTypes: {
    setEmail: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  setEmail () {
    var email = this.state.email
    if (this.validateEmail(email)) {
      this.props.setEmail(email)
    } 
  },

  setEmailValue (e) {
    if(this.validateEmail(e.target.value)) {
      this.setState({disabledButton: false, email: e.target.value})
    }
    else {
      this.setState({disabledButton: true})
    }
  },

  validateEmail (emailString) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(emailString)
  },

  render() {
  injectTapEventPlugin()
    
  
    return (
      <div>
        <CardTitle title='Donor Email' />
        <CardText>If card(s) are being purchased, an email will be sent with easy activation.</CardText>
        <TextField
          hintText="peter@karmakard.org"
          onChange={this.setEmailValue}
          fullWidth={true}
          floatingLabelText="Donor's Email" />
        <RaisedButton 
          style={{margin: '15px 0'}} 
          label="Next" 
          fullWidth={true} 
          value='Send' 
          onClick={this.setEmail} 
          disabled={this.state.disabledButton}/>
      </div>
    )
  }
})
