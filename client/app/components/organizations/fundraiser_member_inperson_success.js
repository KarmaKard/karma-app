import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  propTypes: {
    organization: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    return (
      <div>
        <div className='organization_information' >
          <div className='content_box-header'>Thank You!</div>
        </div>
        <h3>Email has been sent! </h3>
        <h3>The donor may now activate their Karmakard with the activation link(s) that they received.</h3>
        <Link to='member_fundraiser' params={{organizationId: this.props.organization.id}}>
          <button className='karma_button'>Back to Fundraise Dashbaord</button>
        </Link>

      </div>
    )
  }
})
