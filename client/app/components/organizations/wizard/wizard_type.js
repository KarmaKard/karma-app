import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import mui from 'material-ui'
import {AppBar, IconButton, CardTitle, FlatButton, RaisedButton} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
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

  didChooseBusiness () {
    var type = 'business'
    this.props.setType(type.toLowerCase())
  },

  didChooseFundraiser () {
    var type = 'fundraiser'
    this.props.setType(type.toLowerCase())
  },

  render() {
  injectTapEventPlugin()
    return (
      <div>
        <CardTitle title='Oganization Type:' />
          <RaisedButton label='Business' onClick={this.didChooseBusiness} style={{margin: '10px auto'}} fullWidth={true} />

          <RaisedButton label='Fundraiser' onClick={this.didChooseFundraiser} style={{margin: '10px auto'}} fullWidth={true} />

      </div>
    )
  }
})
