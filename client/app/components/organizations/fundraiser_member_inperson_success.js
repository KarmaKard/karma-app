import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Link } from 'react-router'
import mui from 'material-ui'

import {AppCanvas, AppBar, SelectField, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  propTypes: {
    organization: React.PropTypes.object.isRequired
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

  render() {
  injectTapEventPlugin()
    return (
      <div>
      <CardTitle className='cardTitle'  title='Donor Email' />
        <CardText className='cardText' >KarmaKard Activation has been sent</CardText>
        <CardText className='cardText' >The donor may now activate their Karmakard with the activation link(s) that they received.</CardText>
        <Link to='member_fundraiser' params={{organizationId: this.props.organization.id}}>
          <RaisedButton className='raisedButton' primary={true} 
            style={{margin: '15px 0'}} 
            label="Back To Fundraising Dashboard" 
            fullWidth={true} />
        </Link>
      </div>
    )
  }
})
