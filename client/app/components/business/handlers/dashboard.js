import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    // TODO lookup list of businesses from store
    var businesses = [
      {
        id: 1,
        name: 'The Karma Kompany',
        description: 'Spreading Good Karma since 2015',
        keywords: ['fundraising', 'charity']
      }
    ]

    var items = businesses.map(biz => {
      return (
        <li key={biz.id}>
          <Link to="business" params={{businessId: biz.id}}>{biz.name}</Link>
        </li>
      )
    })
    return (
      <div>
        <ul style={{padding: "30px"}}>
          List of Businesses
          {items}
        </ul>
      </div>
    )
  }
})
