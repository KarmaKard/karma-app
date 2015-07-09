import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  propTypes: {
    endDate: React.PropTypes.string
  },

  getInitialState () {
    return {
      endDate: this.props.endDate
    }
  },

  saveThisDeal () {
    var primaryProductName = React.findDOMNode(this.refs.primaryProductName).value
    var limit = React.findDOMNode(this.refs.limit).value
    var percentageOff = React.findDOMNode(this.refs.percentageOff).value
    var dollarValue = React.findDOMNode(this.refs.dollarValue).value
    var beginDate = new Date(parseInt(React.findDOMNode(this.refs.beginDate).value, 10))
    var endDate = new Date(beginDate.getFullYear() + 2, beginDate.getMonth())

    if (!primaryProductName || !limit || !dollarValue || !percentageOff || isNaN(beginDate) || isNaN(endDate)) {
      return null
    }

    var deal = {
      primaryProductName,
      limit,
      percentageOff,
      dollarValue,
      beginDate: beginDate.getTime(),
      endDate: endDate.getTime(),
      type: 'POX'
    }

    deal.dealText = "Get " + percentageOff + "% off purchase of " + primaryProductName

    if (this.props.deal) {
      deal.id = this.props.deal.id
    }
    this.props.saveDeal(deal)
  },

  deleteClicked() {
    flux.actions.deals.deleteDeal(this.props.deal)
  },

  changeDates(e){
    var beginDate = new Date(parseInt(e.target.value))
    var endDate = new Date(beginDate.getFullYear()+2, beginDate.getMonth())
    endDate = endDate.toDateString()
    this.setState({endDate})
    this.props.changeMade()
  },

  render() {
    if (!this.props.deal){
      return <span />
    }

    var primaryProductName = this.props.deal.primaryProductName
    var limit = this.props.deal.limit
    var dollarValue = this.props.deal.dollarValue
    var percentageOff = this.props.deal.percentageOff
    var beginDate = this.props.deal.beginDate
    var endDate = new Date(this.props.deal.endDate)
    var endDateText
    if (this.state.endDate){endDateText = this.state.endDate}
    else if (endDate) {endDateText = endDate.toDateString()}
    else {endDateText = "End Date"}

    return(
      <div className="bxx_deal">
        <div className="deal_header">
          Percentage Off
          <button className="deal-delete" onClick={this.deleteClicked} hidden={this.props.editDisabled}>Delete</button>
        </div>
        <div className="deal_contents">
          <div className="deal-row">
            <div className="required_amount">
              <span className="deal_text-left">Get</span> 
              <select
                ref="percentageOff" 
                className="deal-select"
                onBlur={this.saveThisDeal} 
                defaultValue={percentageOff} 
                disabled={this.props.editDisabled}>
                <option>25%</option>
                <option>30%</option>
                <option>40%</option>
                <option>50%</option>
                <option>60%</option>
                <option>70%</option>
                <option>75%</option>
                <option>80%</option>
                <option>90%</option>
              </select>
            </div>
            <span className="deal_text-right">Off</span>
          </div>
          <div className="deal-row">
            <span className="deal_text2-left">Purchase of: </span> 
            <input 
              ref="primaryProductName" 
              className="deal-input" 
              placeholder="Purchase Item Requirement"
              onBlur={this.saveThisDeal} 
              onChange={this.props.changeMade} 
              defaultValue={primaryProductName} 
              disabled={this.props.editDisabled}/> 
          </div>
          <div className="deal_limit">
            <span className="deal_text-left">Limit</span> 
            <select 
              ref="limit" 
              className="karma_select"
              onBlur={this.saveThisDeal}
              onChange={this.props.changeMade}  
              defaultValue={limit}
              disabled={this.props.editDisabled}>
              <option>unlimited</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
          <div className="dollar_value">
            <span className="deal_text-left">Dollar Value of Single Usage  $</span>
            <input 
              ref="dollarValue" 
              className="karma_input dollar_value-input" 
              onBlur={this.saveThisDeal}
              onChange={this.props.changeMade} 
              placeholder="00.00"
              defaultValue={dollarValue} 
              disabled={this.props.editDisabled}/>
          </div>

          <div className="deal_begin_date">
            <span className="deal_text-left">Period: From</span> 
            <select 
            onBlur={this.saveThisDeal} 
            onChange={this.changeDates} 
            defaultValue={beginDate} 
            ref="beginDate" 
            className="karma_select begin_date-select"
            disabled={this.props.editDisabled}>
              <option>Select Begin Date</option>
              <option value={this.props.activePeriod.beginDate1.getTime()}>{this.props.activePeriod.beginDate1.toDateString()}</option>
              <option value={this.props.activePeriod.beginDate2.getTime()}>{this.props.activePeriod.beginDate2.toDateString()}</option>
            </select>
            <span className="deal-to_date" ref="endDate" defaultValue={endDate}>To</span> 
            {endDateText}
          </div>
          </div>
          <hr />
        </div>
    )
  }
})
