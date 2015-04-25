import React from 'react'
import Router, {RouteHandler} from 'react-router'

export default React.createClass({
    render: function(){
        return(
          <div>
            <h1>This will be the business dashboard</h1>
            <RouteHandler />
          </div>
        )
    }

})
