import React from 'react';
import { Link } from 'react-router-dom';
class Landing extends React.Component {

  render() {
  	console.log("landing is callled");
    return (
      <div>
        <ul>
      	 <li><Link to="/calculator">Calculator</Link></li>
         <li><Link to="/to-do-list">To Do List</Link></li>
          <li><Link to="/word-scramble">Word Scramble</Link></li>
        </ul>
      </div>
    );
  }
}
export default Landing;
