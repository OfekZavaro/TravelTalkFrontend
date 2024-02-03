import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { RiAddCircleLine } from "react-icons/ri";
import AboutMe from "../components/AboutMe";
import TopBar from "../components/TopBar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import UserPostsList from "../components/UserPostList";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "";


  const handleNavigate = () => {
    navigate("/uploadPost");
  };

  return (
    <>
      <TopBar />
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <Col md={4}>
            {/* About Me section */}
            <AboutMe userId={userId} />
          </Col>
          <Col md={8}>
            {/* Right Container for Posts */}
            <div className="d-flex justify-content-end align-items-center mb-3">
              <Button
                variant="light"
                style={{
                  backgroundColor: "#fff",
                  color: "#4169E1",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  border: "2px solid #4169E1",
                }}
                onClick={handleNavigate}
              >
                <RiAddCircleLine size={20} />
                <span className="ms-2">Write New Post</span>
              </Button>
            </div>
            {/* User's Posts List */}
            <UserPostsList userId={userId} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
  
  
};

export default ProfilePage;
