import React from 'react'
import Wizard from '../wizard'

export default React.createClass({

  getInitialState () {
    return {
      showBackLink: false
    }
  },

  showBackLink (showBackLink) {
    this.setState({showBackLink})
  },

  goBack () {
    history.back()
  },

  render () {
    return (
      <div>
        <div className='page_header'>
          <div><button onClick={this.goBack} className='back_button'><i className='fa fa-chevron-left fa-2x'></i></button><div className='header_center karmatitle'>KarmaKard</div></div>
        </div>
        <div>
          <div className='guest_box'>
            <Wizard />
          </div>
        </div>
      </div>
    )
  }
})

