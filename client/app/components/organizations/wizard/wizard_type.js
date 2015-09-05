import React from 'react'
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

  render () {
    return (
      <div>
        <CardTitle title='Oganization Type:' />
          <RaisedButton onClick={this.didChooseBusiness} style={{margin: '10px auto'}} fullWidth={true}>
            Business
          </RaisedButton>
          <RaisedButton onClick={this.didChooseFundraiser} style={{margin: '10px auto'}} fullWidth={true}>
            Fundraiser
          </RaisedButton>
      </div>
    )
  }
})
