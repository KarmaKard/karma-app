import React from 'react'
import { flux } from '../../../main'
import { Link } from 'react-router'

export default React.createClass({

  render(){
    console.log(this.props)
    var organizations = this.props.organizations.map((organization, index) => {
      return (
        <li className="organization_list-item" key={index}>
          <Link to="organization" params={{organizationId :organization.id}}>
            {organization.name}
          </Link>
        </li>
      )
    })

    return (
      <div className="content_box">
        <div className="content_box-header">
          Organizations
        </div>
        <ul>
          {organizations}
        </ul>
        <hr />
        <Link to="organizations_user_manages">Manage Your Organizations</Link>
      </div>
    )
  }
})
