import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

  render () {
    return (
      <div>
        <div className='content_box-header'>Want More?</div>
        <p>By donating again, you will get another card with new deals being updated each quarter! </p>
        <Link to='list_deals'><button className='karma_button'>Check Here To See What You Will Get If You Donate Again!</button></Link>
      </div>
    )
  }
})
