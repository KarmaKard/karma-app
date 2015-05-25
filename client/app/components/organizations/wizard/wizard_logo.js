import React from 'react'

export default React.createClass({

  nextClicked(e) {
    var url = 'https://fake-pic.png'
    this.props.setLogo(url)
  },

  browseClicked(e){
    e.preventDefault(e)
  },

  render() {
    var orgType = this.props.orgType
    var capitalizedType = orgType.charAt(0).toUpperCase() + orgType.slice(1)
    return (
      <div>
        <div className="content_box-header">{capitalizedType} Logo</div>
        <button className="wizard_browse_button" onClick={this.browseClicked}>Browse</button>
        <input type="submit" ref="next" onClick={this.nextClicked} className="karma_button" value="Next" />
      </div>
    )
  }
})
