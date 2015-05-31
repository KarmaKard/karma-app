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
            <div className="page_header_title">{user.firstName}</div>
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
            <li className="category_list-item">
              <Link to="categorical_organizations" params={{category : "Dining"}}>
                Dining
              </Link>
            </li>
            <li className="category_list-item">
              <Link to="categorical_organizations" params={{category : "Entertainment"}}>
                Entertainment
              </Link>
            </li>
            <li className="category_list-item">
              <Link to="categorical_organizations" params={{category : "Health & Fitness"}}>
                Health & Fitness
              </Link>
            </li>
            <li className="category_list-item">
              <Link to="categorical_organizations" params={{category : "Home & Garden"}}>
                Home & Garden
              </Link>
            </li>
            <li className="category_list-item">
              <Link to="categorical_organizations" params={{category : "Professional"}}>
                Professional
              </Link>
            </li>
            <li className="category_list-item">
              <Link to="categorical_organizations" params={{category : "Services"}}>
                Services
              </Link>
            </li>
            <li className="category_list-item">
              <Link to="categorical_organizations" params={{category : "Shopping"}}>
                Shopping
              </Link>
            </li>
            </ul>
            {addNewLink}
          </div>
        </div>
    )
  }
})
