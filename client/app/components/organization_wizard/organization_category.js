import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  nextClicked(e) {
    e.preventDefault()
    var category  =  this.refs.category.getDOMNode().value
    this.props.setCategory(category)
    this.props.nextStep()
  },
  render() {
    return (
      <div>
        <div className="content_box-header">Business Category</div>
        <select ref="category" className="karma_input">
          <option value="volvo">Food</option>
          <option value="saab">Recreation</option>
          <option value="mercedes">something</option>
          <option value="audi">something</option>
        </select>
        <form>
          <input type="submit" ref="button" onClick={this.nextClicked} className="karma_button" value="Next" />
        </form>
      </div>
    )
  }
})
