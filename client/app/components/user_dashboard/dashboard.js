import React from 'react'
import Router, {RouteHandler} from 'react-router'
import {Link} from 'react-router'

export default React.createClass({
  render: function(){
    return(
      <div>
        <h1>This is the user dashboard</h1>
        <p>UserName: </p>
        <p>Email: </p>
        <button className="user_info-edit_button">Edit Information</button>
        <p><Link className="add_business-button" to="profile_builder" > Add a Business </Link></p>
      </div>
    )
  }
})

