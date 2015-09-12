import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { BarChart } from 'react-d3'


export default React.createClass({
  render(){
    var barData = [
      { 
        "name": "Series A",
        "values": [
          { "x": 1, "y": 91}
        ]
      }
    ]
    return (
      <div className="custperday-chart">
        <h3>Times Each Customer Has Redeemed Deal</h3>
        <BarChart
          data={barData}
          width={500}
          height={200}
          fill={'#3182bd'}
          title='Bar Chart'
          yAxisLabel='Label'
          xAxisLabel='Value'/>
      </div>
    )
  }
})
