import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { RouteHandler } from 'react-router'
import mui from 'material-ui'
import LoginForm from '../login_form'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    return {
      isExistingUser: true
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
    flux.actions.users.login(email, password)
  },

  createUser (user) {
    flux.actions.users.create(user)
  },

  render() {
    injectTapEventPlugin()
    var user = this.props.user
    var totalSaved
    if (user) {
      if (this.props.redemptions.length > 0) {
        totalSaved = this.props.redemptions
          .filter(redemption => redemption.userId === user.id)
          .map(redemption => {
            return redemption.amountSaved
          })
        if (totalSaved.length > 0) {
          totalSaved = totalSaved.reduce(function (previousValue, currentValue, index) {
            return previousValue + currentValue
          })
        } else {
          totalSaved = 0
        }
      }
    } else {
      return (<div>
                <Card className='main_card'>
                  <LoginForm setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
                </Card>
              </div>
              ) 
    }

    var form = <RouteHandler totalSaved={totalSaved} {... this.props}/>

    return (
      <div>
        <Card className='main_card'>
          {form}
        </Card>
        <div className='spacer'></div>
        <Tabs className='bottomTabs' initialSelectedIndex={1} style={{bottom:-4, position: 'fixed', width: '100%'}}>
          <Tab onClick={this.toDeals} value='0' label=<i className="material-icons md-36">local_offer</i> ></Tab>
          <Tab onClick={this.toAccount} style={{color: 'rgb(255, 112, 112)', backgroundColor: '#313131 !important', borderTop: '2px #FF7070 solid'}} value='1' label=<i className="material-icons md-36">account_box</i> ></Tab>
        </Tabs>
      </div>
    )
  }
})

