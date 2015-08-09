import React from 'react'
import Keywords from '../keywords'

export default React.createClass({

  componentWillMount () {
    this.props.showBackLink(true)
  },
  
  render() {
    return <Keywords {... this.props} />
  }
})
