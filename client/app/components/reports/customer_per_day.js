import React from 'react'
import rd3 from 'react-d3'

export default React.createClass({
  render(){

    var LineChart = rd3.LineChart
    var lineData = [
      {
        name: "Total Customers",
        values: [ { x: 0, y: 20 }, { x: 10, y: 30 },{ x: 20, y: 10 },{ x: 30, y: 35 },{ x: 40, y: 15 },{ x: 50, y: 57 } ]
      },
      {
        name: "First Time Customers",
        values: [ { x: 0, y: 7 }, { x: 10, y: 5 },{ x: 20, y: 9 },{ x: 30, y: 21 },{ x: 40, y: 28 },{ x: 50, y: 35 } ]
      }
    ]

    return (
      <div className="custperday-chart">
        <LineChart
          legend={true}
          data={lineData}
          width={500}
          height={300}
          title="Line Chart"/>
      </div>
    )
  }
})