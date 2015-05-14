import React from 'react'
import { flux } from '../../main'

export default React.createClass({

  nextClicked(e) {
    e.preventDefault()
    var { router } = this.context
  },

  render() {
  
    return (
      <div>
        <div className="content_box-header">(Org) Logo</div>
        <form>
          <input type="submit" ref="button" onClick={this.nextClicked} className="karma_button" value="Next" />
        </form>
      </div>
    )
  }
})
