import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const handleLogout = () => {
    // Logic for logging out (like clearing the local storage, resetting auth state, etc.)
  };
  
  return (
    <Navbar expand="lg" variant="dark" fixed="top" style={{ backgroundColor: 'transparent' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">TRAVEL TALK</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className={location.pathname === '/home' ? 'active' : ''}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
              My Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/destination" className={location.pathname === '/destination' ? 'active' : ''}>
              Destination
            </Nav.Link>
          </Nav>
          <Nav>
            {}
            <Nav.Link as={Link} to="/logout" onClick={handleLogout} style={{ 
              marginLeft: 'auto', 
              backgroundColor: '#fff', 
              color: '#000', 
              borderRadius: '20px', 
              padding: '5px 15px' 
            }}>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
