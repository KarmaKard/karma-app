import React from 'react'
import {flux} from '../../main'
import Router, {RouteHandler, Link} from 'react-router'


export default React.createClass({

  render(){
    var organizationList = this.props.organizations.organizations.map((organization, index) => {
      return (

        <li className="organization_list-item" key={index}>
          <Link to="organization_dashboard" params={{organizationId :organization.id}}>
            {organization.name}
          </Link>
        </li>

      )
    })
    return (
      <div>
        <div className="content_box-header">Organizations</div>
        <ul>
          {organizationList}
        </ul>
      </div>
    )
  }
})