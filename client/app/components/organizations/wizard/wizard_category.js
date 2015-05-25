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
            <option value="Ice Cream and Treats">Ice Cream and Treats</option>
            <option value="Pizza">Pizza</option>
            <option value="Sandwiches and Burgers">Sandwiches and Burgers</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Retail">Retail</option>
            <option value="Services">Services</option>
        </select>
        <form>
          <input type="submit" ref="button" onClick={this.nextClicked} className="karma_button" value="Next" />
        </form>
      </div>
    )
  }
})
