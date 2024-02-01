import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { RiAddCircleLine } from "react-icons/ri";
import AboutMe from "../components/AboutMe";
import TopBar from "../components/TopBar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "";
  console.log(userId);
  const handleNavigate = () => {
    navigate("/uploadPost");
  };
  return (
    <>
      <TopBar />
      <div style={{ margin: "30px" }}>
        <Container>
          <Row>
            <Col md={6}>
              <AboutMe userId={userId} />
            </Col>
            <Col md={6} className="text-end">
              {" "}
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProfilePage;
