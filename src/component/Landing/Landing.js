import React from 'react';
import { Link } from 'react-router-dom';
class Landing extends React.Component {

  render() {
    return (
      <div className='landing'>
        <ul>
      	 <li><Link to="/calculator" >Calculator</Link></li>
         <li><Link to="/to-do-list" className='toDoList'>To Do List</Link></li>
          <li><Link to="/word-scramble" className='wordScramble'>Word Scramble</Link></li>
          <li><Link to="/roman-numerals" className='romanNumerals'>Roman Numberals</Link></li>
        </ul>
      </div>
    );
  }
}
export default Landing;