import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import { backendURL } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentNavbar(props) {

  const navigate = useNavigate();

  useEffect(() => {}, []);

  function goToProfile() {
    navigate("/profile");
  }

  const Logout = async () => {
    try {
      await axios.delete(backendURL + "/logout", { withCredentials: true });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-default mb-3"
          variant="light"
        >
          <Container fluid>
            <Navbar.Brand className="Navbar-title" href="/">
              KMUTT Withdrawal Status Checker
            </Navbar.Brand>
            <Navbar.Toggle
              className="navbar-light"
              aria-controls={`offcanvasNavbar-expand`}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                  {props.currentName || "UNKNOWN"}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={goToProfile}>Profile</Nav.Link>
                  <Nav.Link onClick={Logout}>Log out</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default StudentNavbar;
