import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import { Link } from 'react-router'
import mui from 'material-ui'
import {AppCanvas, AppBar, Tabs, Tab, FlatButton, FontIcon, UserSideBar, CardTitle, Card, CardMedia, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  propTypes: {
    organization: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    fundraiserMember: React.PropTypes.object.isRequired,
    showBackLink: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  componentWillMount () {
    this.props.showBackLink(true)
  },

  copyToClipboard () {
    var subDirectory = location.hostname.charAt(0)
    var text = subDirectory + '.kkrd.org/' + this.props.organization.name.toLowerCase().replace(/ /g,'') + '/' + this.props.fundraiserMember.name.toLowerCase().replace(/ /g,'')
    window.prompt('Copy to clipboard', text)
  },

  render() {
  injectTapEventPlugin()
    var organization = this.props.organization
    var fundraiserMember = this.props.fundraiserMember
    if (!organization || !fundraiserMember) {
      return (
        <div>
          <h1>This is embarrassing, but...</h1>
          <p>We couldn&#39;t find this organization!</p>
        </div>
      )
    }
    return (
      <div>
        <CardTitle className='cardTitle'  title={organization.name} />
        <CardText className='cardText' >Put some text here that will instruct fundraisers how to most effectively fundraise. May even include a instructional video?</CardText>
        <RaisedButton className='raisedButton' primary={true} style={{margin: '15px 0'}} label="Shareable Link" fullWidth={true} onClick={this.copyToClipboard} />
        <Link to='inperson' params={{organizationId: organization.id}}><RaisedButton className='raisedButton' primary={true} style={{margin: '15px 0'}} label="In Person Sale" fullWidth={true} /></Link>
      </div>
    )
  }
})
