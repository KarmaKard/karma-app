import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { PieChart } from 'react-d3'

export default  React.createClass({
  render() {
    var pieData = [
      {label: 'First Time', value: 70.0},
      {label: '1/Year', value: 70.0},
      {label: '1/Month', value: 30.0},
      {label: '1/Week', value: 30.0}
    ]
    return (
      <div className="custperday-chart">
        <h3>How Often Visited Before First Deal Redemption</h3>
        <PieChart
          data={pieData}
          width={400}
          height={300}
          radius={100}
          innerRadius={20}
          />
      </div>
    )
  }
})
