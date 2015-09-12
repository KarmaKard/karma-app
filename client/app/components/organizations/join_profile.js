import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Link } from 'react-router'
import mui from 'material-ui'
import {Card, CardHeader, CardTitle, CardText, RaisedButton, List, ListItem, Avatar} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  propTypes: {
    organizations: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired,
    organization: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  componentDidMount () {
    if (this.props.affiliateName && this.props.affiliateFundraiserName) {
      this.storeToken(this.props.affiliateFundraiserName, this.props.affiliateName)
    } else if (this.props.affiliateFundraiserName) {
      this.storeToken(this.props.affiliateFundraiserName)
    }   
  },

  storeToken (fundraiser, member) {
    if (typeof localStorage === 'object') {
      try {
        window.localStorage.setItem('fundraiser-token', fundraiser)
        if (member) {
          window.localStorage.setItem('member-token', member)
        }
      } catch (e) {
        alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
      }
    }

  },

  contextTypes: {
    router: React.PropTypes.func
  },

  goBack () {
    history.back()
  },

  render() {
  injectTapEventPlugin()
    var fundraiser = this.props.organization
    return (
      <Card className='main_card'>
          <CardHeader
            avatar=<Avatar size={40} src={fundraiser.logoURL} />
            style={{padding: '0 8px'}}
            title={fundraiser.name} />
          <CardText>Description:{fundraiser.description}</CardText>
          <CardText>Purpose: {fundraiser.purpose}</CardText>
          <hr/>
          <div>
            <CardTitle title=<span style={{fontSize:'26px'}} >Why KarmaKard?</span> />
            <CardText>KarmaKard teams up with fundraisers and local businesses to bring the ultimate deal card. If you donate, you will receive.... This will be a place that we will sell you on the idea of our card...</CardText>
          </div>
          <hr />
          <Link to='list_deals'><RaisedButton fullWidth={true} style={{margin:'10px 0 20px 0'}} label='Check out the list of deals' /></Link>
          <Link to='donate' params={{organizationId: fundraiser.id}}><RaisedButton fullWidth={true} label='Donate Now' /></Link>
        </Card>
    )
  }
})
