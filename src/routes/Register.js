import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./../assets/KMUTT_Logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { backendURL } from "./../App";
import { useNavigate } from "react-router-dom";
import useToken from "./../store/useToken";

export default function Register(props) {
  const { setToken } = useToken();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [course, setCourse] = useState("");
  const [advisor, setAdvisor] = useState("");
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
    try {
      await axios
        .post(
          backendURL + "/login",
          {
            input: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            console.log("success", response);
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

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          backendURL + "/register",
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            student_id: studentId,
            password: password,
            password_confirm: passwordConfirm,
            course: course,
            advisor: advisor,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            Login();
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
    <Form onSubmit={Register} className="form-container">
      <img
        src={logo}
        className="Logo img-fluid shadow-4 mx-auto d-block"
        alt="..."
      />
      <Container className="form">
        <h3 className="form-title">REGISTER</h3>

        {showAlert ? (
          <Container className="alert alert-danger" role="alert">
            {msg}
          </Container>
        ) : null}

        <Row className="form-content">
          <Col>
            <Form.Group className="form-group mt-3 " controlId="first_name">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                maxLength="255"
                className="form-control mt-1 Form-input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="form-group mt-3" controlId="last_name">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                maxLength="255"
                className="form-control mt-1 Form-input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="form-group mt-3 form-content" controlId="email">
          <Form.Label>อีเมล</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            maxLength="255"
            className="form-control mt-1 Form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="form-group mt-3 form-content"
          controlId="student_id"
        >
          <Form.Label>รหัสนักศึกษา</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Student ID"
            maxLength="11"
            pattern="[0-9]{11}"
            className="form-control mt-1 Form-input"
            onChange={(e) => setStudentId(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          className="form-group mt-3 form-content"
          controlId="password"
        >
          <Form.Label>รหัสผ่าน</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password (6 ตัวขึ้นไป)"
            pattern=".{6,}"
            className="form-control mt-1 Form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="form-group mt-3 form-content"
          controlId="confirm_password"
        >
          <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            pattern=".{6,}"
            className="form-control mt-1 Form-input"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group mt-3 form-content" controlId="course">
          <Form.Label>หลักสูตร</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Course"
            maxLength="50"
            className="form-control mt-1 Form-input"
            onChange={(e) => setCourse(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="form-group mt-3 form-content"
          controlId="advisor"
        >
          <Form.Label>อาจารย์ที่ปรึกษา</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Advisor"
            maxLength="50"
            className="form-control mt-1 Form-input"
            onChange={(e) => setAdvisor(e.target.value)}
          />
        </Form.Group>
        <Container className="d-grid gap-2 mt-3 ">
          <Button
            variant="primary"
            type="submit"
            className="Btn-submit btn btn-primary"
          >
            สมัครสมาชิก
          </Button>
        </Container>
        <Container>
          <hr></hr>
          <p className="text-center">
            หากมีบัญชีอยู่แล้ว{" "}
            <Link to="/" className="color-primary">
              เข้าสู่ระบบ
            </Link>{" "}
            ที่นี่
          </p>
        </Container>
      </Container>
    </Form>
  );
}
