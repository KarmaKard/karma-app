import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import LoginForm from '../reusable_login_form'
import Register from '../register'
import mui from 'material-ui'
import {AppBar, AppCanvas, IconButton, FlatButton, Card, CardHeader, CardTitle, Avatar, CardText, RaisedButton} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getInitialState () {
    return this.getStoreState()
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

  getStoreState () {
    return {
      users: flux.stores.users.getState(),
      mismatchPasswords: false,
      isExistingUser: true
    }
  },

  storeChange () {
    this.setState(this.getStoreState())
  },

  componentWillMount () {
    flux.stores.users.addListener('change', this.storeChange)
  },

  componentWillUnmount () {
    flux.stores.users.removeListener('change', this.storeChange)
  },
  componentDidMount () {
    var {router} = this.context
    var fundraiserMemberId = this.context.router.getCurrentParams().fundraiserMemberId
    var user = this.state.users.currentUser
    if (user) {
      user.roles.fundraiserTeamMember = 'fundraiserTeamMember'
      flux.actions.users.tieFundraiserMembershipToUser(user, fundraiserMemberId, router, 'account')
    }
  },

  componentDidUpdate () {
    var {router} = this.context
    var fundraiserMemberId = this.context.router.getCurrentParams().fundraiserMemberId
    var user = this.state.users.currentUser
    if (user) {
      user.roles.fundraiserTeamMember = 'fundraiserTeamMember'
      flux.actions.users.tieFundraiserMembershipToUser(user, fundraiserMemberId, router, 'account')
    }
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

  toggleForm (e) {
    e.preventDefault()
    this.setState({
      isExistingUser: !this.state.isExistingUser
    })
  },

  render() {
  injectTapEventPlugin()
    var form = this.state.isExistingUser
      ? <LoginForm toggleForm={this.toggleForm} loginErrors={this.state.users.loginErrors} setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
      : <Register toggleForm={this.toggleForm} setFbLogin={this.setFbLogin} userLogin={this.userLogin} createUser={this.createUser}/>

    var toggleButtonText = this.state.isExistingUser ? 'New User?' : 'Existing User?'

    return (
      <Card className= 'main_card'>
        {form}
      </Card>
    )
  }
})
