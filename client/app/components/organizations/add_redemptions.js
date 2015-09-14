import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Link } from 'react-router'
import mui from 'material-ui'
import {AppBar, AppCanvas, IconButton, FlatButton, Card, CardHeader, CardTitle, Avatar, CardText, RaisedButton} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

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
        <CardTitle className='cardTitle'  title="Want More?" />
        <CardText className='cardText' >Donate to a local Fundraiser to get access to more deals. See the available deals below. </CardText>
        <Link to='list_deals'>
          <RaisedButton className='raisedButton' primary={true} fullWidth={true} label="Donate for more deals!" />
        </Link>
      </div>
    )
  }
})
