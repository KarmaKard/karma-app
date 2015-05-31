import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  
  render(){
    var addNewLink=null
    var manageLink=null

    var user = this.props.user
    var organizations = this.props.organizations
    var distinctCategories = []
    var unique = {}

    for( var i in organizations ){
       if( typeof(unique[organizations[i].category]) == "undefined" && organizations[i].category !== undefined){
        distinctCategories.push(organizations[i].category);
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

    var userManagerCheck = organizations.find(function(organization){
      if (organization.userId === user.id){
          return true
       }
    })
    
    if(!userManagerCheck){
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
    else{
      manageLink = <li><Link to="organizations_user_manages">Manage</Link></li>
    }

    return (
      <div>
         <div className="page_header">
            <div className="page_header_title">{user.first_name}</div>
            <div className="page_header_link">
              <Link to="root">
                Log Out
              </Link>
            </div>
          </div>
          <div className="side_bar_navigation">
            <ul className="side_bar_navigation_level1">
              <li><Link to="account">Account</Link></li>
              <li><Link to="categories">Deals</Link></li>
              {manageLink}
            </ul>
          </div>
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
