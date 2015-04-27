import React from 'react'
import Router, {RouteHandler} from 'react-router'

export default React.createClass({
  render: function(){
    return(
      <div>
      <div className="business__header" >
        <h1>Your Business</h1>
      </div>
        <RouteHandler />
      </div>
    )
  }
})
