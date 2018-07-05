import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import './ChatRoom.css';
import '../../shared/shared.css';

import Chat from './Chat/Chat';
import UsersMessage from './UsersMessage/UsersMessage';

export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);

    this.getMessages = this.getMessages.bind(this);

    this.state = {
    };
  }


  render() {
    return (
      <Grid className="ChatRoom text-center">
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

  getMessages(value){
  }


}
