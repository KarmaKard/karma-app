import React from 'react'
import rd3 from 'react-d3'
import CustomersPerDay from './customer_per_day' 
import DealsUsed from './deals_used' 
import ReferralChart from './referrals'  
import DealUsedAmount from './deal_used_amount'
import CustomerFrequency from './customer_frequency'

export default React.createClass({
  render() {

        return (
      <div>
        <h1>This is where some cool charts will go</h1>
        <h4>I actually think that we ought to put some charts in here with dummy data that will be representative of the sort of value we will provide to companies.I think this eye candy will help us to get more contracts.</h4>

        <CustomersPerDay />
        <CustomerFrequency />
        <DealsUsed />
        <ReferralChart />
        <DealUsedAmount />
      </div>
    )
  }
})
