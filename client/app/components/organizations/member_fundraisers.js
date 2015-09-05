import React from 'react'
import { Link } from 'react-router'
import mui from 'material-ui'
import moneyPicture from '../../../assets/img/dollar-bills.png'
import {CardTitle, CardMedia, TextField, CardText, RaisedButton, List, ListItem, CardHeader, Avatar, FlatButton, Card, FontIcon} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  propTypes: {
    memberFundraisers: React.PropTypes.array.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  renderOrganizationLink (organization, i) {
    return (
        <ListItem onClick={this.toFundraiserMember} primaryText={organization.name} leftAvatar={<Avatar src={organization.logoURL} />}/>
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

  toFundraiserMember (e) {
    console.log(e.target.innerHTML)
    var organization = this.props.memberFundraisers.filter(organization => organization.name === e.target.innerHTML)[0]
    console.log(organization)
    this.context.router.transitionTo('member_fundraiser', {organizationId: organization.id})
  },

  render () {
    console.log(this.props.memberFundraisers)
    var fundraiserLinks = this.props.memberFundraisers
      .map(this.renderOrganizationLink)
    console.log(fundraiserLinks)
    var output = fundraiserLinks.length > 0
      ? <Card style={{padding: '3% 0', margin: '15px auto'}}>
        <CardMedia className='overlay_title' overlay={<div style={{margin: '0 0 8px 8px', fontSize: '36px', color: 'rgb(246, 115, 133)', display: 'block', lineHeight: '36px'}}> Your Fundraising</div>}>
          <img src={moneyPicture} />
        </CardMedia>
        <List>
          {fundraiserLinks}
        </List>
        </Card>
      : <span></span>
    return (
      <div>
        {output}
      </div>
    )
  }
})
