import React from 'react'
import Router, {RouteHandler} from 'react-router'
import {Link} from 'react-router'

export default React.createClass({
  render: function(){
    return(
      <div>
        <h1>This is the user dashboard</h1>
        <Link className="add_business__button" to="profile_builder" > Add a Business </Link>
      </div>
    )
  }
})

