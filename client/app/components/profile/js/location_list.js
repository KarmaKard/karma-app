import React from 'react'

export default React.createClass({
  render: function(){
    return(
      <div className="location-list">
        <h3>Locations</h3>
        <div className="location-list__location">
          <input type="text" className="location-list__location__street" placeholder="Street Address" />
          <input type="text" className="locaton-list__location__zip" placeholder="Zip" />
        </div>
      </div>
    )
  }
})