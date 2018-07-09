import React from 'react';
import '../../shared/shared.css';
import './ToDoList.css';
import _ from 'lodash';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.inputSelected = this.inputSelected.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.state = {
      textToAdd: "",
      toDoList: [],
      itemsToDelete: 0
    };
  }

  render() {
    return (
      <div className='container text-center'>
        <div className='title'> To Do List </div>
        <div>
          <input type="text" value={this.state.textToAdd} onChange={this.onChange} className='addInput'/>
          <button  onClick={() => this.addToList(this.state.textToAdd)} className='addButton'> Add To List </button>
        </div>
        <ul className='text-left'>
          {this.state.toDoList.map(function(item, index){
            return <li className='listItem' key={index}>
              <input className='checkListBox'
                     checked={item.checked}
                     onClick={() => this.inputSelected(item)}
                     type="checkbox"/>{item.text}
            </li>
          }, this)}
        </ul>
        {this.state.itemsToDelete?
          <button  onClick={this.deleteSelected} className='deleteButton'> Delete Selected </button>
          :null}
      </div>
    );
  }

  deleteSelected() {
    var newList = [];
    for(var i = 0; i < this.state.toDoList.length; i++){
      if(!this.state.toDoList[i].checked){
        newList.push(this.state.toDoList[i]);
      }
    }
    this.setState({toDoList: newList, itemsToDelete: 0});
  }
  inputSelected(item){
    item.checked = !item.checked;
    var itemsToDelete = _.cloneDeep(this.state.itemsToDelete);
    if(item.checked){
      this.setState({itemsToDelete: ++itemsToDelete});
    }
    else{
      this.setState({itemsToDelete: --itemsToDelete});
    }
  }

  addToList (text){
    if(text.length > 0){
     var tempList = this.state.toDoList;
      tempList.push({text:text, checked: false});
      this.setState({toDoList: tempList, textToAdd: ""});
      return tempList;
    }
  }

  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }
}