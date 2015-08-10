import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

  propTypes: {
    activeFundraisers: React.PropTypes.array.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  goBack () {
    history.back()
  },

  render () {
    var activeFundraisers = this.props.activeFundraisers
    if (activeFundraisers.length === 0) {
      return (
        <div>
          <div className='page_header'>
            <div className='page_header_title'>KarmaKard</div>
          </div>
          <div className='content_box'>
            <div className='content_box-header'>
              Wow! We Dont Have Any Fundraisers
            </div>
            <p>Have a Organization that you would like to fundraise for?</p>
            <p><Link to='create_organization'>Sign Up Here!</Link></p>
          </div>
        </div>
      )
    }
    var fundraiserLinks = activeFundraisers.map((fundraiser, index) => {
      return (
        <Link to='fundraiser_profile' params={{organizationId: fundraiser.id}}>
          <li className='list-item' key={index}>
            {fundraiser.name}
          </li>
        </Link>
      )
    })

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
