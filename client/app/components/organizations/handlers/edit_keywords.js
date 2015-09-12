import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Keywords from '../keywords'

export default React.createClass({

  componentWillMount () {
    this.props.showBackLink(true)
  },
  
  render() {
    return <Keywords {... this.props} />
  }
})
