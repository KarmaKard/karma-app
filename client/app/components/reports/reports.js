import React from 'react'
import rd3 from 'react-d3'

var CustomersPerDay =  React.createClass({
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




var DealsUsed =  React.createClass({
  render(){

    var PieChart = rd3.PieChart
    var pieData = [
      {label: 'FREE', value: 32.0},
      {label: 'BOGO', value: 23.0},
      {label: 'DISCOUNT', value: 15.0 },
      {label: 'PLUS ONE', value: 30.0 },
    ];
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


var ReferralChart =  React.createClass({
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

var DealUsedAmount =  React.createClass({
  render(){

    var BarChart = rd3.BarChart
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

var HowOften =  React.createClass({
  render(){

    var PieChart = rd3.PieChart
    var pieData = [
      {label: 'First Time', value: 70.0},
      {label: '1/Year', value: 70.0},
      {label: '1/Month', value: 30.0},
      {label: '1/Week', value: 30.0}
    ];
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

export default React.createClass({
  render() {

        return (
      <div>
        <h1>This is where some cool charts will go</h1>
        <h4>I actually think that we ought to put some charts in here with dummy data that will be representative of the sort of value we will provide to companies.I think this eye candy will help us to get more contracts.</h4>

        <CustomersPerDay />
        <HowOften />
        <DealsUsed />
        <ReferralChart />
        <DealUsedAmount />
      </div>
    )
  }
})
