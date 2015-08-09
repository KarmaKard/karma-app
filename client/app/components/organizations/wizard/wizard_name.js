import React from 'react'

export default React.createClass({

  nextClicked (e) {
    e.preventDefault()
    var name = React.findDOMNode(this.refs.name).value
    this.props.setName(name.charAt(0).toUpperCase() + name.slice(1))
  },

  render () {
    var orgType = this.props.orgType
    var capitalizedType = orgType === "business" ? "Business" : "Fundraiser"
    return (
      <div>
        <div className="content_box-header">{capitalizedType} Name</div>
        <form>
          <input type="text" ref="name" className="karma_input" placeholder="Name" />
          <input type="submit" ref="button" onClick={this.nextClicked} className="karma_button" value="Next" />
        </form>
      </div>
    )
  }
})
