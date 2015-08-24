import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

  propTypes: {
    organizations: React.PropTypes.array.isRequired,
    deals: React.PropTypes.array.isRequired,
    organizationId: React.PropTypes.string.isRequired
  },

  componentDidMount () {
    var fundraiserMemberId = this.context.router.getCurrentParams().fundraiserMemberId
    this.storeToken(fundraiserMemberId)
  },

  storeToken (t) {
    if (typeof localStorage === 'object') {
      try {
        window.localStorage.setItem('affiliate-token', t)
      } catch (e) {
        alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
      }
    }

  },

  contextTypes: {
    router: React.PropTypes.func
  },

  goBack () {
    history.back()
  },

  render () {
    var fundraiser = this.props.organizations.filter(organization => organization.id === this.props.organizationId)[0]

    if (!fundraiser) {
      return <div>Wait one fucking second</div>
    }
    return (
      <div>
        <div className='page_header'>
          <div>
            <button onClick={this.goBack} className='back_button'><i className='fa fa-chevron-left fa-2x'></i></button>
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
            <h3>Go ahead and check out all the amazing deals!</h3>
            <Link to='list_deals' params={{organizationId: this.props.organizationId}}><button className='karma_button'>Check Out Deals</button></Link>
          </div>
          <hr />

          <Link to='donate' params={{organizationId: this.props.organizationId}}><button className='karma_button'>Donate Now</button></Link>
        </div>
      </div>
    )
  }
})
