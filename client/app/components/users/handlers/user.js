import React from 'react'
import { RouteHandler } from 'react-router'
import mui from 'material-ui'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
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

  toAccount () {
    this.context.router.transitionTo('account')
  },

  toDeals () {
    this.context.router.transitionTo('deals')
  },

  render () {
    return (
      <div>
        <Card className='main_card'>
          <RouteHandler {... this.props}/>
        </Card>
        <div className='spacer'></div>
        <Tabs initialSelectedIndex={1} style={{bottom:-4, position: 'fixed', width: '100%'}}>
          <Tab onClick={this.toDeals} value='0' label=<i className="material-icons md-36">local_offer</i> ></Tab>
          <Tab onClick={this.toAccount} value='1' label=<i className="material-icons md-36">account_box</i> ></Tab>
        </Tabs>
      </div>
    )
  }
})

