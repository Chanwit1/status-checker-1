import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { backendURL } from "../../App";
import axios from "axios";

function ModalWithdrawalDelete(props) {
  const withdrawal = props.withdrawal
  const [id, setId] = useState("");
  const [msg, setErrMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    updateValue();
  }, [withdrawal]);

  
  function updateValue() {
    if (withdrawal != null) {
      setId(withdrawal.withdrawal_id);
    }
  }


  const DeleteWithdrawal = async (e, id, token) => {
    e.preventDefault();
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .delete(
          backendURL + "/withdrawals/" + id,
          header,
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            props.onResponse("รายการถูกลบไปอย่างสมบูรณ์");
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
      <Form onSubmit={(e) => DeleteWithdrawal(e, id, props.token)}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete withdrawal
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
            คุณต้องการที่จะลบรายการนี้หรือไม่?
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

export default ModalWithdrawalDelete;
