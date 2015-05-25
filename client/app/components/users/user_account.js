import React from 'react'
import {flux} from '../../main'

export default React.createClass({
  render(){
    return(
      <div>
        <div className="content_box-header">
          Account
        </div>
        <div>
          <label>
            Email
            <input
              type="text"
              className="karma_input"
              placeholder="Type Keyword"
              value={this.props.user.email}
            />
          </label>
          <button>Change Your Password</button>
        </div>
      </div>
    )
  }
})
