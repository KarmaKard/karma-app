import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

    render: function(){
        return(
          <div>
            <table>
              <th>Deal</th>
              <th>Limit</th>
              <tr>
                <td className="column-1">Get <input /> Free just for showing up! </td>
                <td>
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select></td> 
              </tr>
              <tr>
                <td className="column-1">
                  Buy
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select> 
                  <input placeholder="" />
                  and get 1 free
                </td>
                <td><select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select></td> 
              </tr>
              <tr>
                <td className="column-1">
                    Buy
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select> 
                  <input placeholder="" />
                  and get 
                  <select>
                    <option>10%</option>
                    <option>20%</option>
                    <option>30%</option>
                    <option>40%</option>
                    <option>50%</option>
                    <option>60%</option>
                    <option>70%</option>
                    <option>80%</option>
                    <option>90%</option>
                  </select>  off the 2nd
                </td>
                <td>1</td> 
              </tr>
              <tr>
                <td className="column-1">
                  Buy 1 <input placeholder="Item A" /> and get <input placeholder="Item B" /> for free!
                </td>
                <td>1</td> 
              </tr>
            </table>
            
            <Link to="dashboard">Works</Link>
          </div>
            
        )
    }

})

        

      