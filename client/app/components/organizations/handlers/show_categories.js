import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'
import mui from 'material-ui'
import {CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    deals: React.PropTypes.array.isRequired,
    organizations: React.PropTypes.array.isRequired,
    categories: React.PropTypes.array.isRequired,
    showBackLink: React.PropTypes.func.isRequired,
    locations: React.PropTypes.array.isRequired
  },

  getInitialState () {
    return {
      searchOrganizations: [],
      searchLength: 0
    }
  },

  defaultProps: {
    organizations: []
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount () {
    this.props.showBackLink(false)
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

  renderLocationList (address, i) {
    return (
      <li>{address.street + ', ' + address.zip}</li>
    )
  },

  compare (a, b) {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  },

  orgsByPoints (a, b) {
    if (b.points > a.points) {
      return b.points - a.points
    } else if (b.points === a.points) {
      return this.compare(a.name, b.name)
    }
  },

  searchOrganization (organization, pattern) {
    var points = 0
    points += pattern.test(organization.name) ? 20 : 0
    var deals = this.props.deals.filter(deal => deal.organizationId === organization.id)
    for (var i = 0; i < deals.length; i++) {
      points += pattern.test(deals[i].dealText) ? 10 : 0
    }
    console.log('rabbit',organization)
    for (var i = 0; i < organization.keywords.length; i++) {
      points += pattern.test(organization.keywords[i]) ? 5 : 0
    }

    points += pattern.test(organization.description) ? 3 : 0

    organization.points = points
    return organization
  },

  searchOrganizations (e) {
    var pattern = new RegExp(e.target.value, 'i')
    if (e.target.value.length > this.state.searchLength && this.state.searchLength !== 0){
      var searchedOrganizations = this.state.searchOrganizations
        .map(organization => {return this.searchOrganization(organization, pattern)})
      var filteredOrganizations = searchedOrganizations.filter(organization => organization.points > 0)
      var sortedOrganizations = filteredOrganizations.sort(this.orgsByPoints)
      this.setState({searchOrganizations: sortedOrganizations})
    } else if (e.target.value.length <= this.state.searchLength && this.state.searchLength !== 0) {
      var searchedOrganizations = this.props.organizations
        .map(organization => {return this.searchOrganization(organization, pattern)})
      var filteredOrganizations = searchedOrganizations.filter(organization => organization.points > 0)
      var sortedOrganizations = filteredOrganizations.sort(this.orgsByPoints)
      this.setState({searchOrganizations: sortedOrganizations})
    } else if (e.target.value.length !== 0 && this.state.searchLength === 0) {
      this.setState({
        searchOrganizations: this.props.organizations
      })
    }

    this.setState({searchLength: e.target.value.length})
  },

  cancelSearch () {
    if (this.state.searchLength === 0) {
      this.setState({
        searchOrganizations: []
      })
    }
  },

  renderDealLink (deal, i) {
    var user = this.props.user
    var redemptions = this.props.redemptions
    var organization = this.props.organization
    var amountRedeemed = redemptions.filter(function (redemption) {
      return redemption.dealId === deal.id && redemption.userId === user.id ? redemption : null
    })

    var redemptionsLeft = deal.limit !== 'unlimited' ? deal.totalLimit - amountRedeemed.length : deal.limit
    var redeemLink = redemptionsLeft > 0 ? 'survey' : 'add_redemptions'

    return (
      <Link expandable={true} to={redeemLink} params={{organizationId: deal.organizationId, dealId: deal.id}}>
       <Card expandable={true} style={{width: '95%', margin: '2% auto', padding: '2% 2% 2% 0', boxShadow: '0 1px 6px rgba(246, 115, 133, 0.35), 0 1px 4px rgba(246, 115, 133, 0.41)', border: '1px solid #F67385'}}>
        <div style={{width: '100%', height: '100%'}}>
          <CardText style={{float:'left', width:'80%', padding: '1% 0 1% 2%'}}>
            {deal.dealText} 
          </CardText>
          <FloatingActionButton  mini={true} style={{float:'right', top: '30px'}}>
              <span style={{color: 'white'}}>
                {redemptionsLeft}
              </span>
            </FloatingActionButton>
          </div>
        </Card>
      </Link>
      
      // <Link to={redeemLink} params={{organizationId: deal.organizationId, dealId: deal.id}}>
      //   <li className='deal-button' key={i}>
      //       <div className='deals_description'>{deal.dealText}</div>
      //       <div className='deals_limit'>{redemptionsLeft}</div>
      //   </li>
      // </Link>
    )
  },


  renderOrganizationLink (organization, i) {
    if (organization.status !== 'active') { return }
    var deals = this.props.deals
    .filter(deal => deal.organizationId === organization.id)
    .map(this.renderDealLink)
    var locations = this.props.locations
      .filter(address => address.organizationId === organization.id)
      .map(this.renderLocationList)

    return (

      <Card initiallyExpanded={false}>
      <CardHeader
        title={organization.name}
        subtitle={organization.category}
        avatar={organization.logoURL}
        showExpandableButton={true}/>
          <CardText expandable={true} ><span style={{fontWeight: 'bold'}}>Description: </span>{organization.description}</CardText>
          <CardText expandable={true} >
            <span style={{fontWeight: 'bold'}}>Locations: </span>
            <ul>
              {locations}
            </ul>
          </CardText>
          {deals}
          <CardText expandable={true} style={{padding: '5px'}}></CardText>
      </Card>
      
    )
  },

  render () {
    var user = this.props.user
    var organizations = this.props.organizations

    var activeCategories = this.props.categories.map((category, index) => {
      var organizationLinks = organizations
        .filter(organization =>
        organization.category === category)
        .map(this.renderOrganizationLink)
      var headerImage = require('../../../../assets/img/' + category.toLowerCase() + '.jpg')
      return (
        <Card style={{ margin: '15px auto'}}>
        <CardMedia className='overlay_title' overlay={<div style={{margin: '0 0 8px 8px', fontSize: '36px', color: 'rgb(246, 115, 133)', display: 'block', lineHeight: '36px'}}> {category}</div>}>
          <img src={headerImage} />
        </CardMedia>

          {organizationLinks}
        </Card>
      )
    })

    if (activeCategories.length === 0) {
      return (
        <div>
          <div className='content_box-header'>
            Wow! We Dont Have Any Businesses
          </div>
          <p>Have a business that to offer deal with us?</p>
          <p><Link to='create_organization'>Sign Up Here!</Link></p>
        </div>
      )
    }

    var searchReturnOrganizations = this.state.searchOrganizations
      .map(this.renderOrganizationLink)

    var cardFill

    if (searchReturnOrganizations.length > 0 && this.state.searchLength !== 0) {
      cardFill = searchReturnOrganizations
    } else if (searchReturnOrganizations.length === 0 && this.state.searchLength !== 0) {
      cardFill = (
        <Card>
          <CardText>Couldnt find your search input.</CardText>
        </Card>
      )
    } else {
      cardFill = activeCategories
    }

    var addNewLink = null

    return (
      <div>
        <CardTitle title='KarmaKard'/>
        <TextField fullWidth={true} onBlur={this.cancelSearch} onFocus={this.searchOrganizations} onChange={this.searchOrganizations} floatingLabelText="Search" hintText="'Name', 'Hamburger', 'Golf', 'Massage', etc. " />
        <ul>
          {cardFill}
        </ul>
        {addNewLink}
      </div>
    )
  }
})
