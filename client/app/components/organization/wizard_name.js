import React from 'react'

export default React.createClass({

  nextClicked(e) {
    e.preventDefault()
    var name = React.findDOMNode(this.refs.name).value
    this.props.setName(name)
  },

  render() {
    var orgType = this.props.orgType
    var capitalizedType = orgType.charAt(0).toUpperCase() + orgType.slice(1)
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
