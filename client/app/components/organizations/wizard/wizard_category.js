import React from 'react'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  nextClicked(e) {
    e.preventDefault()
    var category = React.findDOMNode(this.refs.category).value
    this.props.setCategory(category)
  },

  render() {
    return (
      <div>
        <div className="content_box-header">Business Category</div>
        <select ref="category" className="karma_input">
          <option value="dining">Dining</option>
          <option value="entertainment"> Entertainment</option>
          <option value="health&fitness">Health & Fitness</option>
          <option value="home&garden">Home & Garden</option>
          <option value="professional">Professional</option>
          <option value="services">Services</option>
          <option value="shopping">Shopping</option>
        </select>
        <form>
          <input type="submit" ref="button" onClick={this.nextClicked} className="karma_button" value="Next" />
        </form>
      </div>
    )
  }
})
