import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import WizardType from './wizard_type'
import WizardName from './wizard_name'
import WizardCategory from './wizard_category'
import WizardLogo from './wizard_logo'
import Registration from '../../users/register'
import LoginForm from '../../users/login_form'
import mui from 'material-ui'
import {AppBar, AppCanvas, IconButton, Card, FlatButton} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState () {
    return {
      type: null,
      name: null,
      category: null,
      logoURL: null,
      step: 1,
      status: 'inactive',
      isExistingUser: true
    }
  },

  

  componentWillMount () {
    this.props.showBackLink(true)
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  createUser (user) {
    flux.actions.users.create(user)
  },

  setFbLogin (user) {
    flux.actions.users.facebookLogin(user)
  },

  userLogin (email, password) {
    flux.actions.users.login(email, password)
  },

  goBack () {
    history.back()
  },

  setType (type) {
    this.setState({type, step: this.state.step + 1})
  },

  setName (name) {
    if (this.state.type === 'fundraiser') {
      var { router } = this.context
      var organization = {
        type: 'fundraiser',
        name,
        category: 'fundraiser',
        logoURL: this.state.logoURL,
        status: this.state.status,
        teamMembers: []
      }

      flux.actions.organizations.create(organization, router, 'organization_user_manages')
    } else {
      var newState = { name, step: this.state.step + 1 }
      this.setState(newState)
    }
  },

  setCategory (category) {
    var { router } = this.context

    this.setState({category}, () => {
      //This is temporary skip of Logo Upoad portion and assumes
      //that we will have logo upload complete before fundraisers 
      //begin signing up. Remove once Logo Upload is complete
      var organization = {
        type: this.state.type,
        name: this.state.name,
        category: this.state.category,
        logoURL: this.state.logoURL,
        status: this.state.status,
        keywords: [],
        locations: []
      }

      flux.actions.organizations.create(organization, router, 'organization_user_manages')
    })

  },

  setLogo (logoURL) {
    var { router } = this.context
    this.setState({logoURL, step: this.state.step + 1}, () => {
      flux.actions.organizations.create(router, this.state)
    })
  },

  toggleForm (e) {
    e.preventDefault()
    this.setState({
      isExistingUser: !this.state.isExistingUser
    })
  },

  getWizardComponent () {
    if (!this.props.user) {
      return this.state.isExistingUser
      ? <LoginForm loginErrors={this.props.loginErrors} setFbLogin={this.setFbLogin} userLogin={this.userLogin} />
      : <Registration setFbLogin={this.setFbLogin} userLogin={this.userLogin} createUser={this.createUser}/>
    }

    switch (this.state.step) {
      case 1:
        return (<WizardType 
                {... this.props}
                setType={this.setType}/>)
      case 2:
        return (<WizardName
                {... this.props}
                orgType={this.state.type}
                setName={this.setName}/>)
      case 3:
        if (this.state.type === 'business') {
          return (<WizardCategory
                  {... this.props}
                  setCategory={this.setCategory}/>)
        } // Fall-through to next if fundraiser
        break
      default:
        return (<WizardLogo
                orgType={this.state.type}
                setLogo={this.setLogo}/>)
    }
  },

  render() {
  injectTapEventPlugin()
    var user = this.props.user
    var toggleButtonText
    if (!user) {
      toggleButtonText = this.state.isExistingUser ? 'New User?' : 'Existing User?'
    }

    return (
      <div>
        {this.getWizardComponent()}
      </div>
    )
  }
})
