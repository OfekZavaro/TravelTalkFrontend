import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar expand="lg" variant="dark" fixed="top" style={{ backgroundColor: 'transparent' }}>
      <Container>
        <Navbar.Brand href="#home">TRAVEL TALK</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> {/* Change ml-auto to me-auto for Bootstrap 5 or leave it as ml-auto for Bootstrap 4 */}
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#profile">My Profile</Nav.Link>
            <Nav.Link href="#destination">Destination</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#logout" style={{ 
              marginLeft: 'auto', 
              backgroundColor: '#fff', 
              color: '#000', 
              borderRadius: '20px', 
              padding: '5px 15px' 
            }}>Log Out</Nav.Link> {/* Inline styles to make it look like a button */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

