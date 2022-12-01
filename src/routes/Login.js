import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./../assets/KMUTT_Logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { backendURL } from "../App";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import useToken from "../store/useToken";

export default function Login(props) {
  const { setToken } = useToken();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setErrMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // go to home page if there's already a token
  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get(backendURL + "/tokenrefresh", {
        withCredentials: true,
      });
      setToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.log(error.response);
      }
    }
  };

  const Login = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          backendURL + "/login",
          {
            input: username,
            password: password,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            console.log("success");
            refreshToken();
          }
        });
    } catch (error) {
      if (error.response) {
        goToTop();
        console.log(error.response.data.msg);
        setShowAlert(true);
        setErrMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Form onSubmit={Login} className="form-container">
      <img
        src={logo}
        className="Logo img-fluid shadow-4 mx-auto d-block"
        alt="..."
      />
      <Container className="form">
        <h3 className="form-title">LOGIN</h3>

        {showAlert ? (
          <Container className="alert alert-danger" role="alert">
            {msg}
          </Container>
        ) : null}

        <Form.Group
          className="form-group mt-3 form-content"
          controlId="email_or_id"
        >
          <Form.Label>อีเมลหรือรหัสนักศึกษา/พนักงาน</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Email or Student/Staff ID"
            className="form-control mt-1 Form-input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          className="form-group mt-3 form-content"
          controlId="password"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            className="form-control mt-1 Form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Container className="d-grid gap-2 mt-3">
          <Button
            variant="primary"
            type="submit"
            className="Btn-submit btn btn-primary"
          >
            เข้าสู่ระบบ
          </Button>
        </Container>
        <Container>
          <hr></hr>
          <p className="text-center">
            หากไม่ได้ลงทะเบียน{" "}
            <Link to="/register" className="color-primary">
              สมัครสมาชิก
            </Link>{" "}
            ที่นี่
          </p>
        </Container>
      </Container>
    </Form>
  );
}
