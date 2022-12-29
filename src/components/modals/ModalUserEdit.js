import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { backendURL } from "../../App";
import { getAcademicRankList, getAcademicRankShort, getNameTitle } from "../../functions";

import axios from "axios";
// import { CardMembershipRounded } from "@material-ui/icons";

function ModalUserEdit(props) {
  const user = props.user
  const [nameTitle, setNameTitle] = useState("mr");
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("student");
  const [academicRank, setAcademicRank] = useState("none");
  const [memberId, setMemberId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  // const [course, setCourse] = useState("");
  // const [advisor, setAdvisor] = useState("");

  const [dataDidUpdate, setDataDidUpdate] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [msg, setErrMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    updateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  function updateValue() {
    if (user != null && dataDidUpdate === false) {
      setDataDidUpdate(true);
      setId(user.user_id);
      setNameTitle(user.name_title);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setUserType(user.user_type);
      setAcademicRank(user.academic_rank);
      setEmail(user.email);
      if (user.member_id == null) setMemberId(""); 
        else setMemberId(user.member_id); // set to blank if null
      if (user.department == null) setDepartment("");
        else setDepartment(user.department); 
      if (user.faculty == null) setFaculty("");
        else setFaculty(user.faculty); 
      // if (user.advisor == null) setAdvisor("");
      //   else setAdvisor(user.advisor);
    }
  }

  function confirmHide() {
    if (confirm === false) {
      setConfirm(true);
    } else {
      handleHide();
    }
  }

  function handleHide() {
      setShowAlert(false);
      setDataDidUpdate(false);
      setConfirm(false);
      props.onHide();
  }

  const EditUser = async (e, id, token) => {
    e.preventDefault();

    try {
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .put(
          backendURL + "/users/" + id,
          {
            name_title: nameTitle,
            first_name: firstName,
            last_name: lastName,
            email: email,
            user_type: userType,
            academic_rank: academicRank,
            member_id: memberId,
            department: department,
            faculty: faculty,
          },
          header,
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            props.onResponse("แก้ไขผู้ใช้สำเร็จ");
            handleHide();
          }
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
        setShowAlert(true);
        setErrMsg(error.response.data.msg);
      }
      if (error.response.status === 403) {
        setErrMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Form onSubmit={(e) => EditUser(e, id, props.token)}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Editing user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            {showAlert ? (
              <Container className="alert alert-danger" role="alert">
                {msg}
              </Container>
            ) : null}
          </Container>
          <Container>

          <Form.Group
            className="form-group mt-3 form-content" 
            controlId="name_title"
           >
            <Form.Label>คำนำหน้า</Form.Label>
            <Form.Control
              required
              as="select"
              type="text"
              value={nameTitle}
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
                <Form.Group className="form-group mt-3 " 
                controlId="first_name">
                  <Form.Label>ชื่อจริง</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={firstName}
                    placeholder="First Name"
                    className="form-control mt-1 Form-input"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="form-group mt-3" 
                  controlId="last_name"
                >
                  <Form.Label>นามสกุล</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
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
                value={email}
                placeholder="Email"
                maxLength="255"
                className="form-control mt-1 Form-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="form-group mt-3 form-content" 
              controlId="user_type"
            >
              <Form.Label>ระดับผู้ใช้งาน (อันตราย)</Form.Label>
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
                <option value="admin">
                  admin
                </option>
              </Form.Control>
            </Form.Group>

            <Form.Group
              className="form-group mt-3 form-content" 
              controlId="academic_rank"
            >
              <Form.Label>ตำแหน่งวิชาการ (หากผู้ใช้เป็น lecturer)</Form.Label>
              <Form.Control
                required
                disabled={userType === "lecturer" ? false : true}
                as="select"
                type="text"
                value={academicRank}
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

            <Form.Group
              className="form-group mt-3 form-content"
              controlId="member_id"
            >
              <Form.Label>รหัสนักศึกษา/พนักงาน (admin/lecturer ไม่จำเป็นต้องมี)</Form.Label>
              <Form.Control
                type="text"
                value={memberId}
                placeholder="Student/Staff ID"
                autoComplete="off"
                className="form-control mt-1 Form-input"
                onChange={(e) => setMemberId(e.target.value)}
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
                    value={department}
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
                    value={faculty}
                    className="form-control mt-1 Form-input"
                    onChange={(e) => setFaculty(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* <Form.Group
              className="form-group mt-3 form-content"
              controlId="advisor"
            >
              <Form.Label>อาจารย์ที่ปรึกษา</Form.Label>
              <Form.Control
                type="text"
                value={advisor}
                placeholder="Advisor"
                autoComplete="off"
                className="form-control mt-1 Form-input"
                onChange={(e) => setAdvisor(e.target.value)}
              />
            </Form.Group> */}
            
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => confirmHide()}>
            {confirm === true ? "Confirm?" : "Cancel"}
          </Button>
          <Button variant="primary" type="submit">
            EDIT
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalUserEdit;
