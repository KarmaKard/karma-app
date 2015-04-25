import React from 'react'

export default React.createClass({
  render: function(){
    return(
      <div className="keyword-list">
        <h3>Keywords</h3>
        <input type="text" className="keyword-list__input" placeholder="Keyword..." />
        <ul>
          <li>Bob</li>
        </ul>
      </div>
    )
  }
})