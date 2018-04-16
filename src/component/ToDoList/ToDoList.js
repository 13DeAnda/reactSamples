import React from 'react';
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textToAdd: "",
      toDoList: []
    };
  }

  addToList = () => {
    var tempList = this.state.toDoList;
    tempList.push(this.state.textToAdd);
    this.setState({toDoList: tempList, textToAdd: ""});
  }

  onChange = (e) => {
    const newText = e.target.value;  
    this.setState({textToAdd : newText}); 
  }
  render() {

    return (
      <div>
        <div>
        <input type="text" value={this.state.textToAdd} onChange={this.onChange}/>
          <button onClick={this.addToList}> Add To List </button>
        </div>
        <div>
          {this.state.toDoList.map(function(item){
            return <div key={item}>{item}</div>
          })}
        </div>
      </div>
    );
  }
}
export default ToDoList;
