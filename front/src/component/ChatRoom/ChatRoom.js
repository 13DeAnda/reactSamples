import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import './ChatRoom.css';
import '../../shared/shared.css';

import Chat from './Chat/Chat';
import UsersMessage from './UsersMessage/UsersMessage';
import Login from './Login/Login';

export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);

    this.displayLoginModal = this.displayLoginModal.bind(this);

    this.state = {
      showLoginModal : false
    };
  }


  render() {
    var {showLoginModal} = this.state;
    return (
      <Grid className="ChatRoom text-center">
        <Row className='loginBar'>
          <Col  smOffset={10} className="links right">
            <a onClick= {() => this.displayLoginModal(true)}> Login </a> /
            <a> Register</a>
            <Login showLoginModal={showLoginModal}
                   displayLoginModal={this.displayLoginModal}/>
          </Col>
          <Col className='userContainer'>
            the user data
          </Col>
        </Row>
        <Row>
            <Col sm={9}>
              <Chat />
            </Col>
            <Col smOffset={1} sm={2}>
              <UsersMessage />
            </Col>
        </Row>
      </Grid>
    );
  }
  //logic
  displayLoginModal(value){
    this.setState({showLoginModal : value});
  }

}
