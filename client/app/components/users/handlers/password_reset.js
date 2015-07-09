import React from 'react'
import PasswordReset from '../password_reset'
import {Link} from 'react-router'

export default React.createClass({
  render(){
    return (
      <div>
        <div className="page_header">
          <div className="page_header_title">KarmaKard</div>
          <Link to="root" ><div className="page_header_link"> Login </div></Link>
        </div>
        <div className="content_box">
          <PasswordReset />
        </div>
      </div>
    )
    
  }
})