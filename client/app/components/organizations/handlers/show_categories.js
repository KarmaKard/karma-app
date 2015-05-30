import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  
  render(){
    return (
      <div className="content_box">
        <div className="content_box-header">
          Deal Categories
        </div>
        <ul>
        <li className="category_list-item">
          <Link to="categorical_organizations" params={{category : "dining"}}>
            Dining
          </Link>
        </li>
        <li className="category_list-item">
          <Link to="categorical_organizations" params={{category : "entertainment"}}>
            Entertainment
          </Link>
        </li>
        <li className="category_list-item">
          <Link to="categorical_organizations" params={{category : "health&fitness"}}>
            Health & Fitness
          </Link>
        </li>
        <li className="category_list-item">
          <Link to="categorical_organizations" params={{category : "home&garden"}}>
            Home & Garden
          </Link>
        </li>
        <li className="category_list-item">
          <Link to="categorical_organizations" params={{category : "professional"}}>
            Professional
          </Link>
        </li>
        <li className="category_list-item">
          <Link to="categorical_organizations" params={{category : "services"}}>
            Services
          </Link>
        </li>
        <li className="category_list-item">
          <Link to="categorical_organizations" params={{category : "shopping"}}>
            Shopping
          </Link>
        </li>
        </ul>
        <hr />
        <Link to="organizations_user_manages">Manage Your Organizations</Link>
      </div>
    )
  }
})
