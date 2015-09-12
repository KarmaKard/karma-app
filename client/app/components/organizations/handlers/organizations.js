import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { RouteHandler } from 'react-router'
import mui from 'material-ui'
import LoginForm from '../../users/login_form'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      isExistingUser: true
    }
  },

  componentDidMount () {
    if (!this.props.user) {
      this.context.router.transitionTo('login')
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

  toAccount () {
    this.context.router.transitionTo('account')
  },

  toDeals () {
    this.context.router.transitionTo('deals')
  },

  setFbLogin (user) {
    flux.actions.users.facebookLogin(user)
  },

  userLogin (email, password) {
    console.log(email, password)
    flux.actions.users.login(email, password)
  },

  createUser (user) {
    flux.actions.users.create(user)
  },

  render() {
  injectTapEventPlugin()
    var barrierForm = <LoginForm setFbLogin={this.setFbLogin} userLogin={this.userLogin} />

    var user = this.props.user
    console.log(user)
    var form = user
      ? <RouteHandler {... this.props}/>
      : barrierForm
      
    return (
      <div>
        <Card className='main_card'>
          {form}
        </Card>
        <div className='spacer'></div>
        <Tabs initialSelectedIndex={1} style={{zIndex:100, bottom:-4, position: 'fixed', width: '100%'}}>
          <Tab onClick={this.toDeals} value='0' label=<i className="material-icons md-36">local_offer</i> ></Tab>
          <Tab onClick={this.toAccount} value='1' label=<i className="material-icons md-36">account_box</i> ></Tab>
        </Tabs>
      </div>
    )
  }
})
