import React from 'react'

export default React.createClass({
 statics: {
    willTransitionTo: function (transition) {
      transition.redirect('organizations');
    }
  },
  render() {}
})

