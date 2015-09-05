import React from 'react'
import { Link } from 'react-router'
import mui from 'material-ui'
import {AppBar, FlatButton, Card, IconButton, FontIcon, MenuItem, LeftNav} from 'material-ui'
var injectTapEventPlugin = require("react-tap-event-plugin")
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    organizations: React.PropTypes.array.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
    toggleState: React.PropTypes.bool.isRequired,
    fundraiserMembers: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      toggleState: false,
      menuItems: [],
      menuItemsSet: false
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  renderOrganizationLink (organization, i) {
    console.log('trying to render organizationLInk', organization)
    return (
        {route: 'organization_user_manages', text: organization.name, params: {organizationId: organization.id}}
    )
  },


  componentDidUpdate() {
    if (this.props.toggleState !== this.state.toggleState) {
      this.refs.leftNav.toggle()
      this.setState({toggleState: this.props.toggleState})
    }

    var user = this.props.user
    var organizationLinks = this.props.organizations
      .filter(org => org.userId === user.id)
      .map(this.renderOrganizationLink)

    var manageLink = user.roles.manager || user.roles.superadmin
      ? {route: 'organizations', text: 'Manage'}
      : null

    var isFundraiser = this.props.fundraiserMembers.filter(fundraiserMember => fundraiserMember.userId === user.id)
    var fundraiserMemberLink = isFundraiser.length > 0
      ? {route: 'member_fundraisers', text: 'Fundraise'}
      : null

    var menuItems = [
      { route: 'account', text: 'Account' },
      { route: 'deals', text: 'Deal Card'}
    ]
    if (fundraiserMemberLink) {
      menuItems.push(fundraiserMemberLink)
    }
    console.log('manageLink', manageLink)
    console.log('orgLinks', organizationLinks)
    if (manageLink) {
      menuItems.push(manageLink)
      menuItems.push({ type: MenuItem.Types.SUBHEADER, text: 'Managed Organizations' })
      menuItems.push.apply(menuItems, organizationLinks)
    }
    if (!this.state.menuItemsSet && organizationLinks.length > 0 && manageLink) {
      this.setState({menuItems, menuItemsSet: true})
    } else if (!this.state.menuItemsSet && !manageLink && menuItems.length > 0) {
      this.setState({menuItems, menuItemsSet: true})
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
    // Get the selected item in LeftMenu
  getSelectedIndex () {
    var currentItem
 
    for (let i = this.state.menuItems.length - 1; i >= 0; i--) {
      currentItem = this.state.menuItems[i]
      if (currentItem.route && this.context.router.isActive(currentItem.route)) {
        return i
      }
    }
  },

  onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route, payload.params)
  },

  render () {

    injectTapEventPlugin()
    return (
        <LeftNav 
          ref="leftNav" 
          openRight={true}
          menuItems={this.state.menuItems} 
          docked={false}
          selectedIndex={this.getSelectedIndex()}
          onChange={this.onLeftNavChange}/>
    )
  }
})
