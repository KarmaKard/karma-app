import React from 'react'
import { flux } from '../../main'
import { Link } from 'react-router'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  
  render(){
    var activeFundraisers = this.props.activeFundraisers

    var fundraiserLinks = activeFundraisers.map((fundraiser, index) => {
      return (
        <li key={index}>
          <Link to="fundraiser_profile" params={{organizationId: fundraiser.id}}>
            {fundraiser.name} 
          </Link>
        </li>
      )
    })


    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">KarmaKard</div>
        </div>
        <div className="content_box">
          <div className="content_box-header">
            Select A Fundraiser
          </div>
          <ul>
            {fundraiserLinks}
          </ul>
        </div>
      </div>
    )
  }
})