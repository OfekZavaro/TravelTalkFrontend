// HomePage.tsx
import React from "react";
import NavBar from "../components/NavBar";
import { Container, Row, Col, Image } from "react-bootstrap";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Container fluid>
        <Row>
          <Col className="p-0">
            {/* Your photo goes here */}
            <Image src="/nuture1.jpg" fluid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
