import React from 'react';
import { Row, Col } from 'react-bootstrap';

import '../../../shared/shared.css';
import './Chat.css';


export default class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.getMessages = this.getMessages.bind(this);

    this.state = {
      chatMessages: [
        {user: 'anonymus 1',
         image: "https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png",
         message: "this is the first test message",
         time:  "2018-07-05T21:26:35+00:00"}
      ],
    };
  }


  render() {
    var {chatMessages} = this.state;
    return (
      <Row className='chat text-left'>
        <Row className='chatContainer'>

          {chatMessages.map(function(message, index){
            return (
              <Row key={index} className="messageItem">
                <Col sm={3} className='text-center'>
                  <img className='userIcon' src={message.image} /><br/>
                  {message.user}
                </Col>
                <Col sm={8}>
                  {message.message}
                </Col>
              </Row>
            )
          }, this)}


        </Row>
        <Row className='message'>
          <Col sm={8}>
            <input type="text" />
          </Col>
          <Col sm={3}>
            <button> Send </button>
          </Col>

        </Row>
      </Row>
    );
  }

  getMessages(value){
  }


}
