import React from 'react'
import Profile from '../profile'

export default React.createClass({

  render() {
    // TODO lookup business from Store
    var business = {
      id: 1,
      name: 'The Karma Kompany',
      description: 'Spreading Good Karma since 2015',
      keywords: ['fundraising', 'charity']
    }
    return <Profile business={business} />
  }
})
