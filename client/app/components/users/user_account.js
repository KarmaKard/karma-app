import React from 'react'
import {flux} from '../../main'
import { Link } from 'react-router'

export default React.createClass({
  render(){
    var addNewLink=null
    var user = this.props.user
    if(!user.roles.manager && !user.roles.superadmin){
      addNewLink = (
        <div>
          <hr />
          <Link to="new_organization" className="create_organization-link">
            Business? Fundraiser? 
            <span className="create_organization-link_span">Offer deals with us!</span>
          </Link>
        </div>
      )
    }

    return(
      <div>
        <div className="content_box-header">
          Account
        </div>
        <div>
        <h3>You have saved ${this.props.totalSaved}!</h3>
        <p>Thank you for being an awesome donor!</p>
        <br/>
          <label>
            Email
            <input
              type="text"
              className="karma_input"
              placeholder="Type Keyword"
              value={this.props.user.email}
            />
          </label>
          <button className="user_account-change_password_button">Change Your Password</button>
        </div>
        {addNewLink}
      </div>
    )
  }
})