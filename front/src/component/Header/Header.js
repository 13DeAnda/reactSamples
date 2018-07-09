import React from 'react';
import { Nav, NavItem, Navbar, MenuItem, NavDropdown} from 'react-bootstrap';
import '../../shared/shared.css';
import './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">React Samples</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={3} title="Examples" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Roman Numerals</MenuItem>
              <MenuItem eventKey={3.2}>To Do List</MenuItem>
              <MenuItem eventKey={3.3}>Word Scramble</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>All Exercises</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="https://www.linkedin.com/in/13deanda/">
              GitHub
            </NavItem>
            <NavItem eventKey={2} href="#">
              LinkedIn
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}