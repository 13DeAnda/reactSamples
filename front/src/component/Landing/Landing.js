import React from 'react';
import { Link } from 'react-router-dom';
class Landing extends React.Component {

  render() {
    return (
      <div className='landing'>
        <ul>
         <li><Link to="/to-do-list" className='toDoList'>To Do List</Link></li>
          <li><Link to="/roman-numerals" className='romanNumerals'>Roman Numberals</Link></li>
          <li><Link to="/word-scramble" className='wordScramble'>Word Scramble</Link></li>
          <li><Link to="/pdf-notes" className='pdfNotes'>Pdf Notes</Link></li>
          <li><Link to="/chat-room" className='chatRoom'>Chat Room</Link></li>
        </ul>
      </div>
    );
  }
}
export default Landing;
