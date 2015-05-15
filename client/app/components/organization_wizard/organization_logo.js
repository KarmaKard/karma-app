import React from 'react'
import { flux } from '../../main'


export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  nextClicked(e) {
    e.preventDefault()
    var { router } = this.context
    flux.actions.organizations.create(router, this.props.organizationInformation)
  },
  browseClicked(e){
    e.preventDefault(e)

  },

  render() {
    
    return (
      <div>
        <div className="content_box-header">{this.props.organizationInformation.type} Logo</div>
        <button className="wizard_browse_button" onClick={this.browseClicked}>Browse</button>
        <form>
          <input type="submit" ref="next" onClick={this.nextClicked} className="karma_button" value="Next" />
        </form>
      </div>
    )
  }
})
