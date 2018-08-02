import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import ToDoList from './ToDoList/ToDoList';
import WordScramble from './WordScramble/WordScramble';
import RomanNumerals from './RomanNumerals/RomanNumerals';
import PdfNotes from './PdfNotes/PdfNotes';
import ChatRoom from './ChatRoom/ChatRoom';

export default class App extends Component {
  render() {
    return (
    <div>
        <Header/>
        <Router>
          <div>
            <Route exact path="/" component={Landing}/>
            <Route path="/to-do-list" component={ToDoList}/>
            <Route path="/word-scramble" component={WordScramble}/>
            <Route path="/roman-numerals" component={RomanNumerals}/>
            <Route path="/pdf-notes" component={PdfNotes}/>
            <Route path="/chat-room" component={ChatRoom}/>
          </div>
        </Router>
    </div>
    );
  }
}
