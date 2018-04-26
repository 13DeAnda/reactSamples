import React from 'react';
import '../../shared/shared.css';
import './ToDoList.css';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.state = {
      textToAdd: "",
      toDoList: []
    };
  }

  render() {
    return (
      <div className='container text-center'>
        <div className='title'> To Do List </div>
        <div>
          <input type="text" value={this.state.textToAdd} onChange={this.onChange}/>
          <button onClick={() => this.addToList(this.state.textToAdd)}> Add To List </button>
        </div>
        <ul className='text-left'>
          {this.state.toDoList.map(function(item){
            return <li className='listItem' key={item}>
              <input className='checkListBox' type="checkbox"/>{item} 
            </li>
          })}
        </ul>
      </div>
    );
  }

  addToList (text){
    var tempList = this.state.toDoList;
    tempList.push(text);
    this.setState({toDoList: tempList, textToAdd: ""});
    return tempList;
  }

  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }
}