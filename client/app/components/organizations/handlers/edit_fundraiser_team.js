import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Team from '../fundraiser_team'

export default React.createClass({
  componentWillMount () {
    this.props.showBackLink(true)
  },
  
  render() {
    return <Team {... this.props}/>
  }
})