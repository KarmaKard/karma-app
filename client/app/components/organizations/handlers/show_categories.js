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

  logOut(){
    var { router } = this.context
    flux.actions.users.logout(router)
  },
  
  render(){
    var user = this.props.user
    var organizations = this.props.organizations
    var isActive = []
    var uniqueCategory = {}

    for( var i in organizations ){
      if(typeof(uniqueCategory[organizations[i].category]) == "undefined" 
      && organizations[i].category !== "undefined" 
      && organizations[i].category !== "fundraiser" 
      && organizations[i].status === "active" ){
        isActive.push(organizations[i].category)
        uniqueCategory[organizations[i].category] = 0
      }
    }

    var activeCategories = isActive.map((category, index) => {
      return (
        <li className="category_list-item" key={index}>
          <Link to="categorical_organizations" params={{category : category}}>
            {category} 
          </Link>
        </li>
      )
    })

    var addNewLink=null

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

    return (
      <div>
         <div className="page_header">
            <div className="page_header_title">{user.firstName}</div>
            <div className="page_header_link" onClick={this.logOut}>
              Log Out
            </div>
          </div>
          <UserSideBar organizations={organizations} user={user} />
          <div className="content_box">
            <div className="content_box-header">
              Deal Categories
            </div>
            <ul>
              {activeCategories}
            </ul>
            {addNewLink}
          </div>
        </div>
    )
  }
})
