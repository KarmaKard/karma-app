import React from 'react'
import { Link } from 'react-router'
import CustomersPerDay from '../../reports/customer_per_day' 
import DealsUsed from '../../reports/deals_used' 
import ReferralChart from '../../reports/referrals'  
import DealUsedAmount from '../../reports/deal_used_amount'
import CustomerFrequency from '../../reports/customer_frequency'

export default React.createClass({
  render() {
    // TODO lookup business from Store
    var business = {
      id: 1,
      name: 'The Karma Kompany',
      description: 'Spreading Good Karma since 2015',
      keywords: ['fundraising', 'charity']
    }

    return (
      <div>
        <h1>{business.name} Analytics</h1>
        <blockquote>
          I actually think that we ought to put some charts in here with dummy
          data that will be representative of the sort of value we will provide to
          companies. I think this eye candy will help us to get more contracts.
        </blockquote>
        <CustomersPerDay />
        <CustomerFrequency />
        <DealsUsed />
        <ReferralChart />
        <DealUsedAmount />
      </div>
    )
  }
})
