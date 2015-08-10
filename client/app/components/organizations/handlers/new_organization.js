import React from 'react'
import Router, {RouteHandler, Link} from 'react-router'
import Wizard from '../wizard'
import UserSideBar from '../../users/user_sidebar'

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

  render(){
    return (
      <div>
        <div className='page_header'>
          <div><button onClick={this.goBack} className='back_button'><i className='fa fa-chevron-left fa-2x'></i></button><div className='header_center karmatitle'>KarmaKard</div></div>
        </div>
        <div>
         
          <div className="guest_box">
            <Wizard />
          </div>
        </div>
      </div>
    )     
  }
})
