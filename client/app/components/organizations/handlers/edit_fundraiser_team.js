import React from 'react'
import Team from '../fundraiser_team'

export default React.createClass({
  render() {
    return <Team {... this.props}/>
  }
})