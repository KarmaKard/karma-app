import React from 'react'
import { flux } from '../../main'
import { Link } from 'react-router'

export default React.createClass({

  generateDealList(){
    var dealsByOrganization = this.props.dealsByOrganization
    var dealsList = dealsByOrganization.map(function(organization, t){
      var deals = organization.deals.map(function(deal, i){
            var savings
            if(deal.limit === "unlimited"){
              savings = "unlimited"
            }
            else{
              savings = (parseInt(deal.limit) * parseFloat(deal.dollarValue)).toFixed(2)
            }
            return (
              <li key={i}>
                {deal.dealText}
                <ul>
                  <li>
                    Limit: {deal.limit}
                  </li>
                  <li>
                    {"Estimated Value: " + savings}
                  </li>
                </ul>
              </li>
            )
          })

      return (
        <li>
          {organization.name}
          <ul className="businessDealList">
          {deals}
          </ul>
        </li>
      )
    })

    return dealsList
  },

  render() {
    if(!this.props.dealsByOrganization){return <p>Waiting...</p>}
    var totalSavings = this.props.totalSavings
    var dealsList = this.generateDealList()

    return (
      <div>
        <h3>{totalSavings}</h3>
        <p>Every month businesses offer deals with a specified limit. Although many of the deals will remain the same month to month, you will also see new businesses and updated deal offerings every month. This means, that every month you get a refresh of an ever growing list of deals! No more expiration dates!</p>
        <ul className="dealList">
          {dealsList}
        </ul>
        <hr/>
        <div className="content_box-header">Get On Board!</div>
        <p>Give good, Get good. In order to have full access to KarmaKard, we ask that you give to a local fundraising organization. A $30 dollar donation will give you instant access to thousands of dollars in exclusive deals.</p>
        <Link to="fundraisers"><button className="karma_button">Donate to a local Fundraiser</button></Link>
      </div>
    )
  }
})
