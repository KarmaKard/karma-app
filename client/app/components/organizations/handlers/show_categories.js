import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
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
    showBackLink: React.PropTypes.func.isRequired
  },

  getInitialState () {
    flux.actions.users.getUserLocation()
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
      <li><a target='_blank' href={'http://maps.google.com/maps?z=18&q='+address.latitude+','+address.longitude}>{address.formattedAddress}</a></li>
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
    return a.points - b.points
  },

  searchOrganization (organization, pattern) {
    var points = 0
    var bestReference = null

    var locations = organization.locations.filter(location => location.organizationId === organization.id)
    for (var i = 0; i < locations.length; i++) {
      points += pattern.test(locations[i].formattedAddress) ? 2 : 0
      points += pattern.test(locations[i].neighborhood) ? 2 : 0
      points += pattern.test(locations[i].stateLong) ? 2 : 0

      bestReference = 'Locations'
    }

    if (pattern.test(organization.description)) {
      points += 3
      bestReference = 'Description'
    }

    for (var i = 0; i < organization.keywords.length; i++) {
      if (pattern.test(organization.keywords[i])) {
        points += 5
        bestReference = 'Keywords'
      }
    }

    var deals = this.props.deals.filter(deal => deal.organizationId === organization.id)
    for (var i = 0; i < deals.length; i++) {
      if (pattern.test(deals[i].dealText)) {
        points += 10
        bestReference = 'Deals'
      }
    }

    if (pattern.test(organization.name)) {
      points += 20
      bestReference = 'Name'
    }

    organization.points = points
    organization.bestReference = bestReference
    return organization
  },

  searchOrganizations (e) {
    var pattern = new RegExp(e.target.value, 'i')
    if (e.target.value.length > this.state.searchLength && this.state.searchLength !== 0){
      var searchedOrganizations = this.state.searchOrganizations
        .map(organization => {return this.searchOrganization(organization, pattern)})
      var filteredOrganizations = searchedOrganizations.filter(organization => organization.points > 0)
      var sortedOrganizations = filteredOrganizations.sort(this.orgsByDistance)
      this.setState({searchOrganizations: sortedOrganizations})
    } else if (e.target.value.length <= this.state.searchLength && this.state.searchLength !== 0) {
      var searchedOrganizations = this.props.organizations
        .map(organization => {return this.searchOrganization(organization, pattern)})
      var filteredOrganizations = searchedOrganizations.filter(organization => organization.points > 0)
      var sortedOrganizations = filteredOrganizations.sort(this.orgsByDistance)
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
         <Card expandable={true} style={{width: '95%', margin: '2% auto', padding: '1% 2% 1% 2%', boxShadow: '0 1px 6px rgba(246, 115, 133, 0.35), 0 1px 4px rgba(246, 115, 133, 0.41)', border: '1px solid #F67385'}}>
          <div style={{width: '100%', height: '100%'}}>
            <CardTitle style={{float:'left', width:'80%', padding: '0 !important'}} 
              title=<span style={{fontSize: '18px', lineHeight: '0 !important', color: 'black', fontFamily: 'sans-serif', fontWeight: '500', verticalAlign: 'middle'}} >{deal.dealText}</span> 
              subtitle={'$' + deal.dollarValue + ' savings per use'}/>
            <div style={{padding: '3px 0 0 0'}}>
              <FloatingActionButton className='floatingActionButton'   mini={true} style={{float:'right', top: '30px'}}>
                <span style={{color: 'white'}}>
                  {redemptionsLeft}
                </span>
              </FloatingActionButton>
            </div>
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
    var locations = organization.locations
      .map(this.renderLocationList)

    var subtitle = organization.distance 
      ? (Math.round(organization.distance * 10) / 10).toString() + ' miles'
      : organization.category

    return (

      <Card initiallyExpanded={false}>
      <CardHeader className='cardHeader' 
        title={organization.name}
        subtitle={subtitle}
        avatar={organization.logoURL}
        showExpandableButton={true}/>
          <CardText className='cardText'  expandable={true} ><span style={{fontWeight: 'bold'}}>Description: </span>{organization.description}</CardText>
          <CardText className='cardText'  expandable={true} >
            <span style={{fontWeight: 'bold'}}>Locations: </span>
            <ul>
              {locations}
            </ul>
          </CardText>
          <CardText className='cardText'  expandable={true} style={{fontWeight: 'bold', float: 'left'}}>Deal Text</CardText>
          <CardText className='cardText'  expandable={true} style={{fontWeight: 'bold', float: 'right'}}>Remaining</CardText>
          {deals}
          <CardText className='cardText'  expandable={true} style={{padding: '5px'}}></CardText>
      </Card>
      
    )
  },

  render() {
  injectTapEventPlugin()
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
        <CardMedia className='overlay_title' overlay={<div style={{margin: '0 0 8px 8px', fontSize: '36px', color: '#FF7070', fontFamily: "'Fjalla One', sans-serif !important", display: 'block', lineHeight: '36px'}}> {category}</div>}>
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
            
          </div>
          <p>Have a business that to offer deal with us?</p>
          <p><Link to='create_organization'>Sign Up Here!</Link></p>
        </div>
      )
    }

    var searchReturnOrganizations = ['Name', 'Deals', 'Keywords', 'Description', 'Locations'].map((bestReference, index) => {
      var organizationLinks = this.state.searchOrganizations 
        .filter(organization => organization.bestReference === bestReference)
        .map(this.renderOrganizationLink)
      if (organizationLinks.length === 0) {return}
      return (
        <Card style={{backgroundColor:'#FF7070', margin: '15px auto'}}>
        <CardTitle className='cardTitle'  
          title=<span style={{fontSize: '30px', margin: '0px 0 0 15px', color: 'white', display: 'block', lineHeight: '20px'}} >{bestReference}</span> />
          {organizationLinks}
        </Card>
      )
    })

    var cardFill

    if (searchReturnOrganizations.length > 0 && this.state.searchLength !== 0) {
      cardFill = searchReturnOrganizations
    } else if (searchReturnOrganizations.length === 0 && this.state.searchLength !== 0) {
      cardFill = (
        <Card>
          <CardText className='cardText' >Couldnt find your search input.</CardText>
        </Card>
      )
    } else {
      cardFill = activeCategories
    }

    var addNewLink = null

    return (
      <div>
        <CardTitle className='cardTitle'  title='KarmaKard'/>
        <TextField fullWidth={true} onBlur={this.cancelSearch} onFocus={this.searchOrganizations} onChange={this.searchOrganizations} floatingLabelText="Search" hintText="'Name', 'Hamburger', 'Golf', 'Massage', etc. " />
        <ul>
          {cardFill}
        </ul>
        {addNewLink}
      </div>
    )
  }
})
