import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiClient";

const NavBar = () => {
  const location = useLocation();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);

    if (refreshToken) {
      try {
        await apiClient.post(
          "/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
    }
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{ position: "absolute", width: "100%", top: 0, zIndex: 1000 }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/home">
          TRAVEL TALK
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/home"
              className={location.pathname === "/home" ? "active" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile"
              className={location.pathname === "/profile" ? "active" : ""}
            >
              My Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/destination"
              className={location.pathname === "/destination" ? "active" : ""}
            >
              Destination
            </Nav.Link>
          </Nav>
          <Nav>
            {}
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleLogout}
              style={{
                marginLeft: "auto",
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "20px",
                padding: "5px 15px",
              }}
            >
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
