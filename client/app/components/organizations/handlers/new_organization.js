import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Wizard from '../wizard'
import mui from 'material-ui'
import {AppBar, IconButton, Card} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()


export default React.createClass({

  getInitialState () {
    return {
      showBackLink: false
    }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  showBackLink (showBackLink) {
    this.setState({showBackLink})
  },

  goBack () {
    history.back()
  },

  render() {
  injectTapEventPlugin()
    return (
      <div>
          <Wizard {...this.props} />
      </div>
    )
  }
})

