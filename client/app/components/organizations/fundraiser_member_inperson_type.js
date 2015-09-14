import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import mui from 'material-ui'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  propTypes: {
    setPaymentType: React.PropTypes.func.isRequired
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

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  setTypeCash () {
    this.props.setPaymentType('cash')
  },

  setTypeSquare () {
    this.props.setPaymentType('square')
  },

  render() {
  injectTapEventPlugin()
    return (
      <div>
        <CardTitle className='cardTitle'  title='Payment Type' />
        <RaisedButton className='raisedButton' primary={true} style={{margin: '15px 0'}} label="Cash / Check" fullWidth={true} value='cash' onClick={this.setTypeCash} />
        <RaisedButton className='raisedButton' primary={true} style={{margin: '15px 0'}} label="Square Slider" fullWidth={true} value='square' onClick={this.setTypeSquare} />
      </div>
    )
  }
})
