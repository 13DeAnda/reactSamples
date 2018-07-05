import React from 'react';
import { Row, Col } from 'react-bootstrap';

import '../../../shared/shared.css';
import './UsersMessage.css';


export default class UsersMessage extends React.Component {

  constructor(props) {
    super(props);

    this.getMessages = this.getMessages.bind(this);

    this.state = {
      onlineUsers: [
        {user: 'anonymus 1',
         image: "https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png"
       }
      ],
    };
  }


  render() {
    var {onlineUsers} = this.state
    return (
      <Col className='usersMessage'>
          {onlineUsers.map(function(user, index){
            return (
              <Row key={index} >
                <img className='userIcon' src={user.image} /><br/>
              </Row>
            )
          }, this)}
      </Col>
    );
  }

  getMessages(value){
  }


}
