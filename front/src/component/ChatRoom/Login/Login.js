import React from 'react';
import axios from 'axios';

import { Modal, FormGroup, FormControl, Button} from 'react-bootstrap';

import '../../../shared/shared.css';
import './Login.css';

export default class Chat extends React.Component {

  componentWillMount(){
    console.log("it mounted", this.props);
  }
  constructor(props) {
    super(props);

    this.registerUser = this.registerUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.registerValidationForm = this.registerValidationForm.bind(this);

    this.state = {
      showModal: false,
    };
  }

  render() {
    var {showLoginModal, username, password} = this.props;

    return (
      <Modal show={showLoginModal} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={this.registerValidationForm()}>

            <FormControl
              type="text"
              value={username}
              placeholder="username"
              onChange={this.onChange} />

            <FormControl type="password"
                         value={password}
                         placeholder="password"
                         onChange={this.onChange}/>
          </FormGroup>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Register</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //change request to a service
  registerUser(){

      var userMessage = {
        user: "user1",
        image: "https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png",
        password: "123"
      };
      var that = this;
      axios.post('http://localhost:4000/api/users',
                  {data : userMessage},
                  { headers : { "Content-Type": "application/json" }
        })
      .then(function(response){
        console.log("the user was sucesfully register?", response.data);
        if(response.status === 200){
        }
        else if(response.status === 304){

        }
      });
  }

  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }

  closeModal(){
    this.props.displayLoginModal(false);
  }

  registerValidationForm(){
    return 'success';
  }

}
