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
            <a className="headerTitle" href="/">React Samples</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={3} title="Examples" id="basic-nav-dropdown">
              <MenuItem href="/roman-numerals" eventKey={3.1}>Roman Numerals</MenuItem>
              <MenuItem href="/to-do-list" eventKey={3.2}>To Do List</MenuItem>
              <MenuItem href="/word-scramble" eventKey={3.3}>Word Scramble</MenuItem>
              <MenuItem href="/chat-room" eventKey={3.4}>Chat Room</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>All Exercises</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="https://github.com/13DeAnda">
              GitHub
            </NavItem>
            <NavItem eventKey={2} href="https://www.linkedin.com/in/13deanda/">
              LinkedIn
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}