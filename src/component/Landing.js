import React from 'react';

class Landing extends React.Component {

  render() {
    return (
      <div>
        <div className="menu">
            <ul>
              <li> <Link to="/calculator">Calculator</Link> </li>
              <li> <Link to="/to-do-list">To Do List</Link> </li>
              <li> <Link to="/word-scramble">Word Scramble Game</Link> </li>
            </ul>
        </div>
      </div>
    );
  }
}
export default Landing;
