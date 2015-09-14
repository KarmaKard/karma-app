import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Link } from 'react-router'
import mui from 'material-ui'
import {CardTitle, TextField, CardText, RaisedButton, List, ListItem, CardHeader, Avatar, FlatButton, Card, FontIcon} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  propTypes: {
    organizations: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  renderOrganizationLink (organization, i) {
    return (
      <Link to={'organization_user_manages'} params={{organizationId: organization.id}}>
        <Card>
          <CardHeader className='cardHeader' 
            title={organization.name}
            subtitle={organization.status}
            avatar={organization.logoURL}/>
        </Card>
      </Link>
    )
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  newOrganization() {
    this.context.router.transitionTo('create_organization')
  },

  toOrganization (e) {
    var organization = this.props.organizations.filter(organization => organization.name === e.target.innerHTML)[0]
    this.context.router.transitionTo('organization_user_manages', {organizationId: organization.id})
  },

  render() {
    injectTapEventPlugin()
    var user = this.props.user
    var organizations = this.props.organizations || []
    var fundraisers, businesses
    var businessLinks = organizations
      .filter(org => org.userId === user.id && org.type === 'business')
      .map(this.renderOrganizationLink)

    businesses = businessLinks.length > 0
      ? (<List subheader='Businesses'>
            {businessLinks}
          </List>)
      : null

    var fundraiserLinks = organizations
      .filter(org => org.userId === user.id && org.type === 'fundraiser')
      .map(this.renderOrganizationLink)

    fundraisers = fundraiserLinks.length > 0
      ? (<List subheader='Fundraisers'>
            {fundraiserLinks}
          </List>)
      : null

    var newOrganization= !fundraisers && !businesses 
      ? <CardText className='cardText' >Have a business or fundraiser? KarmaKard is a valuable advertizing platform where you receive actual
        feedback on the deals you are offering through the data we collect on each deal redemption. KarmaKard provides a fast
        simple and effective way to fundraise. There is good Karma waiting for your organization. :)
      </CardText>
      : null

    return (
      <div>
        {businesses}
        {fundraisers}
        {newOrganization}
        <RaisedButton className='raisedButton' primary={true} onClick={this.newOrganization} style={{minWidth:'96%',height:'36px', margin:'2%'}} fullWidth={true} label="Add an Organization" />
      </div>
    )
  }
})
