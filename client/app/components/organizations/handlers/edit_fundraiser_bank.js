import React from 'react'
import Bank from '../fundraiser_bank'

export default React.createClass ({
  componentWillMount () {
    this.props.showBackLink(true)
  },

  render () {
    return <Bank {... this.props} />
  }
})
