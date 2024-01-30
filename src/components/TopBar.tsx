import React from 'react';
import { Container } from 'react-bootstrap';



const TopBar = () => {
    return (
      <div className="hero-section" style={{ backgroundImage: 'url(/topbar4.jpeg)', backgroundSize: 'cover', height: '45vh' }}>
        <Container className="text-center" style={{ paddingTop: '15vh' }}>
          <h1 className="text-white py-5">Discover New Places and Create Unforgettable Memories</h1>
        </Container>
      </div>
    );
  };
  

export default TopBar;
