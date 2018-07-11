import React from 'react';
import { Row, Col } from 'react-bootstrap';

import '../../../shared/shared.css';
import './Chat.css';
import axios from 'axios';

export default class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.getMessages = this.getMessages.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.onChange = this.onChange.bind(this);

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
                  <img className='userIcon' src={message.image} alt='userImage' /><br/>
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
            <input className='messageInput' onChange={this.onChange} type="text" />
          </Col>
          <Col sm={3}>
            <button onClick={this.addMessage}> Send </button>
          </Col>

        </Row>
      </Row>
    );
  }

  getMessages(value){
  }

  //change request to a service
  addMessage(text){
    console.log("addToMessage", this.state.textToAdd);
    var that = this;
    axios.post('http://localhost:4000/api/message',
                { message : this.state.textToAdd },
                { headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
    .then(function(response){
      console.log('the response gotten back', response);
    });
  }

  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }

}
