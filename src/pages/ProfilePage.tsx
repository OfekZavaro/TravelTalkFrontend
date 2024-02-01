import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AboutMe from "../components/AboutMe";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId") || "";
  console.log(userId);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <AboutMe userId={userId} />
        </Col>
        {/* Add other components or content for the profile page */}
      </Row>
    </Container>
  );
};

export default ProfilePage;
