import React from 'react'
import rd3 from 'react-d3'

export default React.createClass({
  render(){

    var PieChart = rd3.PieChart
    var pieData = [
      {label: 'YES', value: 70.0},
      {label: 'NO', value: 30.0}
    ];
    return (
      <div className="custperday-chart">
      <h3>Would You Refer Us</h3>
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