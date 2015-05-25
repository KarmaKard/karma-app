import React from 'react'
import { flux } from '../../../main'

export default React.createClass({

  render() {
    return (
      <div className="content_box">
        <h1>{this.props.organization.name}</h1>
        <p>{this.props.organization.type}</p>
      </div>
    )
  }
})
