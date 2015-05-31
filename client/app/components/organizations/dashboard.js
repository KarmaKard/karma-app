import React from 'react'
import { flux } from '../../main'

export default React.createClass({

  render() {
    return (
      <div>
        <div className="content_box-header">
          Dashboard
        </div>
        <p>
          You have some task(s) remaining before your business can be reviewed:
        </p>
        <ul className="toDoList">
          <li>Add Locations</li>
          <li>Add Deals</li>
          <li>Add Keywords</li>
        </ul>
      </div>
    )
  }
})