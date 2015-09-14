import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
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
      <Link to={'member_fundraiser'} params={{organizationId: organization.id}}>
        <Card>
          <CardHeader className='cardHeader' 
            title={organization.name}
            subtitle={organization.category}
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

  toFundraiserMember (e) {
    var organization = this.props.memberFundraisers.filter(organization => organization.name === e.target.innerHTML)[0]
    this.context.router.transitionTo('member_fundraiser', {organizationId: organization.id})
  },

  render() {
    injectTapEventPlugin()
    var fundraiserLinks = this.props.memberFundraisers
      .map(this.renderOrganizationLink)
    var output = fundraiserLinks.length > 0
      ? <Card style={{ margin: '15px auto'}}>
        <CardMedia className='overlay_title' overlay={<div style={{fontFamily: "'Fjalla One', sans-serif !important", margin: '0 0 8px 8px', fontSize: '36px', color: '#FF7070', display: 'block', lineHeight: '36px'}}> Your Fundraising</div>}>
          <img src={moneyPicture} />
        </CardMedia>
          {fundraiserLinks}
        </Card>
      : <span></span>
    return (
      <div>
        {output}
      </div>
    )
  }
})
