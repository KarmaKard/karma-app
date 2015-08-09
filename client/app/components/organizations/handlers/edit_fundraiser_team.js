import React from 'react'
import Team from '../fundraiser_team'

export default React.createClass({
  componentWillMount () {
    this.props.showBackLink(true)
  },
  
  render() {
    return <Team {... this.props}/>
  }
})