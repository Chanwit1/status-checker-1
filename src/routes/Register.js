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
import { getAcademicRankList, getAcademicRankShort, getNameTitle } from "../functions";
import useToken from "./../store/useToken";

export default function Register(props) {
  const { setToken } = useToken();

  const [nameTitle, setNameTitle] = useState("mr");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  // const [course, setCourse] = useState("");
  const [userType, setUserType] = useState("student");
  const [academicRank, setAcademicRank] = useState("none");
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
    let validation = true
    e.preventDefault();
    if (userType === 'admin') {
      validation = false
      goToTop();
      setShowAlert(true);
      setErrMsg("ไม่สามารถสมัครสมาชิกเนื่องจาก header ไม่ถูกต้อง");
    }
    if (userType === 'student') {
      if (memberId === "") {
        validation = false
        goToTop();
        setShowAlert(true);
        setErrMsg("กรุณากรอกรหัสรนักศึกษาด้วย");
      } else if (memberId.length < 11) {
        validation = false
        goToTop();
        setShowAlert(true);
        setErrMsg("รหัสนักศึกษาควรมีตัวเลขจำนวน 11 ตัวพอดี");
      }
    }
    if (userType !== 'lecturer') {
      if (nameTitle === 'none') {
        validation = false
        goToTop();
        setShowAlert(true);
        setErrMsg("กรุณาใส่คำหน้าชื่อปกติหากไม่ใช่อาจารย์");
      } else {
        setAcademicRank("none")
      }
    }
    if (validation === true) {
      try {
        await axios
          .post(
            backendURL + "/register",
            {
              name_title: nameTitle,
              first_name: firstName,
              last_name: lastName,
              email: email,
              member_id: memberId,
              password: password,
              password_confirm: passwordConfirm,
              department: department,
              faculty: faculty,
              // course: course,
              user_type: userType,
              academic_rank: academicRank,
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

          <Form.Group
            className="form-group mt-3 form-content" 
            controlId="name_title"
          >
            <Form.Label>คำนำหน้า</Form.Label>
            <Form.Control
              required
              as="select"
              type="text"
              defaultValue="mr"
              className="form-control mt-1 Form-input"
              onChange={(e) => setNameTitle(e.target.value)}
            >
              <option value="mr">
                {getNameTitle("mr")}
              </option>
              <option value="mrs">
                {getNameTitle("mrs")}
              </option>
              <option value="miss">
                {getNameTitle("miss")}
              </option>
              <option value="none">
                ไม่มี (สำหรับอาจารย์)
              </option>
            </Form.Control>
          </Form.Group>

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
          controlId="member_id"
        >
          <Form.Label>รหัสนักศึกษา/พนักงาน</Form.Label>
          <Form.Control
            type="text"
            placeholder="Student/Staff ID"
            maxLength="30"
            autoComplete="off"
            className="form-control mt-1 Form-input"
            onChange={(e) => setMemberId(e.target.value)}
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

        <Row className="form-content">
          <Col>
            <Form.Group className="form-group mt-3 " 
            controlId="department">
              <Form.Label>ภาควิชา</Form.Label>
              <Form.Control
                type="text"
                placeholder="Department"
                className="form-control mt-1 Form-input"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="form-group mt-3" 
              controlId="faculty"
            >
              <Form.Label>คณะ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Faculty"
                className="form-control mt-1 Form-input"
                onChange={(e) => setFaculty(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* <Form.Group className="form-group mt-3 form-content" controlId="course">
          <Form.Label>หลักสูตร</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Course"
            maxLength="50"
            className="form-control mt-1 Form-input"
            onChange={(e) => setCourse(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group
          className="form-group mt-3 form-content" 
          controlId="user_type"
        >
          <Form.Label>ระดับผู้ใช้งาน</Form.Label>
          <Form.Control
            required
            as="select"
            type="text"
            value={userType}
            defaultValue="student"
            className="form-control mt-1 Form-input"
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">
              student
            </option>
            <option value="staff">
              staff
            </option>
            <option value="lecturer">
              lecturer
            </option>
          </Form.Control>
        </Form.Group>
        <Form.Group
          className="form-group mt-3 form-content" 
          controlId="academic_rank"
        >
          <Form.Label>ตำแหน่งวิชาการ</Form.Label>
          <Form.Control
            required
            disabled={userType === "lecturer" ? false : true}
            as="select"
            type="text"
            defaultValue="none"
            className="form-control mt-1 Form-input"
            onChange={(e) => setAcademicRank(e.target.value)}
          >
            <option value="none">
              {getAcademicRankList("none")}
            </option>
            <option value="professor">
              {getAcademicRankList("professor")} ({getAcademicRankShort("professor")})
            </option>
            <option value="associate_professor">
              {getAcademicRankList("associate_professor")} ({getAcademicRankShort("associate_professor")})
            </option>
            <option value="assistant_professor">
              {getAcademicRankList("assistant_professor")} ({getAcademicRankShort("assistant_professor")})
            </option>
          </Form.Control>
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
