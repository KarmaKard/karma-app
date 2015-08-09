import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

  propTypes: {
    fundraiser: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  goBack () {
    history.back()
  },

  render () {
    var fundraiser = this.props.fundraiser
    return (
      <div>
        <div className='page_header'>
          <div>
            <i onClick={this.goBack} className='fa fa-chevron-left fa-2x back_button'></i>
            <div className='header_center karmatitle'>KarmaKard</div>
          </div>
        </div>
        <div className='guest_box'>
          <div className='content_box-header'>
            {fundraiser.name}
          </div>
          <p>Description: {fundraiser.description}</p>
          <p>Purpose: {fundraiser.purpose}</p>
          <img src={'"' + fundraiser.logoURL + '"'} />
          <hr/>
          <div>
            <h3>Why Karmakard</h3>
            <p>KarmaKard teams up with fundraisers and local businesses to bring the ultimate deal card. If you donate, you will receive.... This will be a place that we will sell you on the idea of our card...</p>
          </div>
          <hr />

          <Link to='donate' params={{organizationStripePubKey: fundraiser.publicStripeKey}}><button className='karma_button'>Donate Now</button></Link>
        </div>
      </div>
    )
  }
})