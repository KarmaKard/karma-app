import React from 'react'
import { flux } from '../../main'
import { Link } from 'react-router'

export default React.createClass({

  render() {

    return (
      <div>
        <div className="content_box-header">Get On Board!</div>
        <p>Give good, Get good. In order to have full access to KarmaKard, we ask that you give to a local fundraising organization. A $30 dollar donation will give you instant access to thousands of dollars in exclusive deals.</p>
        <Link to="fundraisers"><button className="karma_button">Donate to a local Fundraiser</button></Link>
        <hr/>
        <div className="content_box-header">Not Convinced?</div>
        <p>We have built special relationships with local businesses to provide quality deals in which we handpick only quality deals that you will love. Dont beleive us? </p>
        <Link to="list_deals"><button className="karma_button">Check out the ever growing list of local deals</button></Link>
      </div>
    )
  }
})
