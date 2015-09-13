import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import { RouteHandler } from 'react-router'

export default React.createClass({

  getInitialState () {
    return {
      amountSaved: null
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut () {
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  saveAmountSaved (amountSaved) {
    this.setState({amountSaved})
  },

  render() {
    injectTapEventPlugin()
    return (
      <div>
        <RouteHandler {... this.props} saveAmountSaved={this.saveAmountSaved} amountSaved={this.state.amountSaved}/>
      </div>
    )
  }
})
