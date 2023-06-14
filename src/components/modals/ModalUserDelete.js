import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { backendURL } from "../../App";
import axios from "axios";

function ModalUserDelete(props) {
  const user = props.user
  const [id, setId] = useState("");
  const [msg, setErrMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    updateValue();
  }, [user]);

  
  function updateValue() {
    if (user != null) {
      setId(user.user_id);
    }
  }


  const DeleteUser = async (e, id, token) => {
    e.preventDefault();
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .delete(
          backendURL + "/users/" + id,
          header,
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            props.onResponse("ผู้ใช้ถูกลบไปอย่างสมบูรณ์");
            props.onHide();
          }
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
        setErrMsg(error.response.data.msg);
      }
      if (error.response.status === 403) {
        setErrMsg("คุณไม่มีสิทธิ์เข้าถึงกระบวนการนี้");
      }
    }
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Form onSubmit={(e) => DeleteUser(e, id, props.token)}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete user
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
            คุณต้องการที่จะลบผู้ใช้นี้หรือไม่?
          </Container>
          <Container >
            <b>หมายเหตุ: รายการทั้งหมดสำหรับผู้ใช้ดังกล่าวจะถูกลบด้วยเช่นกัน</b>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {props.onHide(); setShowAlert(false);}}>
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            DELETE
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalUserDelete;
