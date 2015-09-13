import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import BusinessDashboard from '../business_dashboard'
import FundraiserDashboard from '../fundraiser_dashboard'
import mui from 'material-ui'
import {CircularProgress, CardTitle, Card, CardMedia, Avatar, CardHeader, TextField, List, ListItem, RaisedButton, CardText, FloatingActionButton} from 'material-ui'
var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  propTypes: {
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

  render() {
    if (!this.props.organization) {
      return (<div style={{margin: 'auto', width: '150px'}}><CircularProgress  mode="indeterminate" size={2} /></div>)
    } 
    var dashboardType = this.props.organization.type === "business"
      ? <BusinessDashboard {...this.props} />
      : <FundraiserDashboard {...this.props} />
    return dashboardType
  }
})
