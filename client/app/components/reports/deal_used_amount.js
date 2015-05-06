import React from 'react'
import { BarChart } from 'react-d3'


export default React.createClass({
  render(){
    var barData = [
      {label: '1', value: 231},
      {label: '2', value: 120},
      {label: '3', value: 100},
      {label: '4', value: 43},
      {label: '5', value: 21},
      {label: '6', value: 10}
    ]
    return (
      <div className="custperday-chart">
        <h3>Times Each Customer Has Redeemed Deal</h3>
        <BarChart
          data={barData}
          width={500}
          height={200}
          fill={'#3182bd'}/>
      </div>
    )
  }
})
