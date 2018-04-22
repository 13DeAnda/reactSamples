import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Calculator from './Calculator/Calculator';
import Landing from './Landing/Landing';
import ToDoList from './ToDoList/ToDoList';
import WordScramble from './WordScramble/WordScramble';
import RomanNumerals from './RomanNumerals/RomanNumerals';
class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <Route exact path="/" component={Landing}/>
        <Route path="/calculator" component={Calculator}/>
        <Route path="/to-do-list" component={ToDoList}/>
        <Route path="/word-scramble" component={WordScramble}/>
        <Route path="/roman-numerals" component={RomanNumerals}/>
      </div>
    </Router>
    );
  }
}

export default App;