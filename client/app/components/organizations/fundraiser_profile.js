import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Link } from 'react-router'
import mui from 'material-ui'
import {AppBar, AppCanvas, IconButton, Card, CardHeader, CardTitle, Avatar, CardText, RaisedButton} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({

  propTypes: {
    fundraiser: React.PropTypes.object.isRequired
  },

  componenetWillMount () {
    this.props.showBackLink(true)
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

  goBack () {
    history.back()
  },

  render() {
  injectTapEventPlugin()
    var fundraiser = this.props.fundraiser
    var logo = fundraiser.logoURL ? <Avatar style={{height: '60px', width: '60px', padding: 0}} src={fundraiser.logoURL} /> : <i className="material-icons">photo</i>
    return (
        <Card className='main_card'>
          <CardHeader className='cardHeader' 
            avatar={logo}
            style={{float: 'left', padding: '0 10px'}}/>
          <CardTitle className='cardTitle'  title={fundraiser.name}/>
          <CardText className='cardText' >Description:{fundraiser.description}</CardText>
          <CardText className='cardText' >Purpose: {fundraiser.purpose}</CardText>
          <hr/>
          <div>
            <CardTitle className='cardTitle'  title='Why KarmaKard?'/>
            <CardText className='cardText' >KarmaKard teams up with fundraisers and local businesses to bring the ultimate deal card. If you donate, you will receive.... This will be a place that we will sell you on the idea of our card...</CardText>
          </div>
          <hr />
          <Link to='list_deals'><RaisedButton className='raisedButton' primary={true} fullWidth={true} style={{margin:'10px 0 20px 0'}} label='Check out the list of deals' /></Link>
          <Link to='donate' params={{organizationId: fundraiser.id}}><RaisedButton className='raisedButton' primary={true} fullWidth={true} label='Donate Now' /></Link>
        </Card>
    )
  }
})
