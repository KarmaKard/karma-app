import React from 'react'
import { flux } from '../../main'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  nextClicked(e) {
    e.preventDefault()
    this.context.router.transitionTo('wizard_logo')
  },
  render() {
    return (
      <div>
        <div className="content_box-header">(Business) Category</div>
        <form>
          <input type="submit" ref="button" onClick={this.nextClicked} className="karma_button" value="Next" />
        </form>
      </div>
    )
  }
})
