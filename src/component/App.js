import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Calculator from './Calculator/Calculator';
import Landing from './Landing/Landing';
import ToDoList from './ToDoList/ToDoList';
class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <Route exact path="/" component={Landing}/>
        <Route path="/calculator" component={Calculator}/>
        <Route path="/todolist" component={ToDoList}/>
      </div>
    </Router>
    );
  }
}

export default App;