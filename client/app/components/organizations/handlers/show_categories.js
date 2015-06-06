import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'
import UserSideBar from '../../users/user_sidebar'

export default React.createClass({

  defaultProps: {
    organizations: []
  },

  contextTypes: {
    router: React.PropTypes.func
  },
  
  render(){
    var user = this.props.user
    var organizations = this.props.organizations
    var distinctCategories = []
    var unique = {}

    for( var i in organizations ){
      if( (typeof(unique[organizations[i].category]) == "undefined" && organizations[i].category !== undefined && organizations[i].status === "active") ){
        distinctCategories.push(organizations[i].category)
      }
       unique[organizations[i].category] = 0;
    }

    var existingCategories = distinctCategories.map((category, index) => {
      return (
        <li className="category_list-item" key={index}>
          <Link to="categorical_organizations" params={{category : category}}>
            {category}
          </Link>
        </li>
      )
    })

    var addNewLink=null

    if(user.role !== "manager" && user.role !== "superadmin"){
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

    return (
      <div>
         <div className="page_header">
            <div className="page_header_title">{user.firstName}</div>
            <div className="page_header_link">
              <Link to="root">
                Log Out
              </Link>
            </div>
          </div>
          <UserSideBar organizations={organizations} user={user} />
          <div className="content_box">
            <div className="content_box-header">
              Deal Categories
            </div>
            <ul>
              {existingCategories}
            </ul>
            {addNewLink}
          </div>
        </div>
    )
  }
})
