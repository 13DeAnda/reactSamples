import React from 'react';
import axios from 'axios';


import { Row, Col } from 'react-bootstrap';

import '../../../shared/shared.css';
import './UsersMessage.css';


export default class UsersMessage extends React.Component {

  componentDidMount() {
    this.getUsers();
  }

  constructor(props) {
    super(props);

    this.getUsers = this.getUsers.bind(this);

    this.state = {
      users: [],
    };
  }


  render() {
    var {users} = this.state
    return (
      <Col className='usersMessage'>
          {users.map(function(user, index){
            return (
              <Row key={index} >
                <img className='userIcon' src={user.image} alt='userImage' /><br/>
              </Row>
            )
          }, this)}
      </Col>
    );
  }

  getUsers(){
    var that = this;
    axios.get('http://localhost:4000/api/users')
      .then(function(response){
        if(response.status === 200){
          that.setState({users: response.data});
        }
      });
  }


}
