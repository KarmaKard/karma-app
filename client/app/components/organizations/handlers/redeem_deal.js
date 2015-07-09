import React from 'react'
import { RouteHandler } from 'react-router'
import { Link } from 'react-router'
import UserSideBar from '../../users/user_sidebar'

export default React.createClass({
  getInitialState() {
    return {
      amountSaved: null
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  logOut(){
    var { router } = this.context
    flux.actions.users.logout(router)
  },

  saveAmountSaved(amountSaved){
    this.setState({amountSaved})
  },

  render() {
    
    var user = this.props.user
    var organizations = this.props.organizations

    return(
      <div>
        <div className="page_header">
          <div className="page_header_title">{user.firstName} </div>
          <div className="page_header_link" onClick={this.logOut} >
            Log Out
          </div>
        </div>
        <UserSideBar organizations={organizations} user={user} />
        <div className="content_box">
          <RouteHandler {... this.props} saveAmountSaved={this.saveAmountSaved} amountSaved={this.state.amountSaved}/>
        </div>
      </div>
    )
  }
})
