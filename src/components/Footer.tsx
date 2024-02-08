import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-auto" style={{ backgroundColor: '#4169E1', color: 'white', padding: '4rem 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
            <p style={{ fontSize: '1.5rem' }}>© 2024 Travel Talk. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

