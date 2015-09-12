import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { PieChart } from 'react-d3'

export default React.createClass({
  render(){
    var pieData = [
      {label: 'FREE', value: 32.0},
      {label: 'BOGO', value: 23.0},
      {label: 'DISCOUNT', value: 15.0 },
      {label: 'PLUS ONE', value: 30.0 },
    ]
    return (
      <div className="custperday-chart">
        <h3>Deal Type Used</h3>
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
