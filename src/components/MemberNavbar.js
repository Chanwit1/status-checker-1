import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { backendURL } from "../App";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/KMUTT_Logo.png";
import axios from "axios";

function MemberNavbar(props) {

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
              className="site-bar"
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="end"
            >
              <Offcanvas.Header closeButton className="custom-close-button">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`} >
                  {/* {props.currentName || "UNKNOWN"} */}
                  <div className="text-logo">
                  <img
                      src={logo}
                      className="Logo img-fluid shadow-4 "
                      alt="..." style={{with:'80px',height: '80px'}}
                  />

                  <h5 class="orange-text">Withdrawal Status Checker</h5>
                </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
             
              <Offcanvas.Body>
              <div className="pt-3 pb-3 centered-div" ><h4>{props.currentName}</h4></div>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={goToProfile} className="text-profile "><FontAwesomeIcon icon={faUser} className="me-3"/>Profile</Nav.Link>
                  <Nav.Link onClick={Logout} className="text-logout"><FontAwesomeIcon icon={faRightFromBracket} className="me-3"/>Log out</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MemberNavbar;
