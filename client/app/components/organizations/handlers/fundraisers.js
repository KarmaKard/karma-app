import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../../main'
import {RouteHandler} from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
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

  orgsByAlphabet (a, b) {
    return this.compare(a.name, b.name)
  },

  render() {
  injectTapEventPlugin()
    var organizations = this.props.organizations.sort(this.orgsByAlphabet)
    var activeFundraisers = organizations
      .filter(organization => organization.type === 'fundraiser' && organization.status === 'active')

    return (
      <RouteHandler {... this.props} activeFundraisers={activeFundraisers} />
      )
  }
})
