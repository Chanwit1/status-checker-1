import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

import {
  getStatusName
} from "../../functions";

import { backendURL } from "../../App";
import axios from "axios";
import { Style } from "@material-ui/icons";

function ModalWithdrawalAdd(props) {
  var date = new Date();
  let defaultDate = date.toISOString().split("T")[0];

  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [docDate, setDocDate] = useState(defaultDate);
  const [status, setStatus] = useState("waiting_for_document");
  const [amount, setAmount] = useState(0);

  const [confirm, setConfirm] = useState(false);
  const [msg, setErrMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  function confirmHide() {
    if (confirm === false) {
      setConfirm(true);
    } else {
      setShowAlert(false);
      setConfirm(false);
      props.onHide();
    }
  }


  const AddWithdrawal = async (e, token) => {
    e.preventDefault();

    try {
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .post(
          backendURL + "/withdrawals",
          {
            input: input,
            description: description,
            doc_date: docDate,
            status: status,
            amount: amount,
          },
          header,
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            setConfirm(false);
            setShowAlert(false);
            props.onResponse("เพิ่มรายการใหม่ลงอย่างสมบูรณ์");
            props.onHide();
          }
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
        setShowAlert(true);
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
      <Form onSubmit={(e) => AddWithdrawal(e, props.token)}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new withdrawal
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
              controlId="email_or_id"
            >
              <Form.Label>รหัสนักศึกษา/พนักงานหรืออีเมล</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Student/Staff ID or Email"
                className="form-control mt-1 Form-input"
                onChange={(e) => setInput(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="form-group mt-3 form-content"
              controlId="description"
            >
              <Form.Label>คำอธิบาย</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Description"
                autoComplete="off"
                className="form-control mt-1 Form-input"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="form-group mt-3 form-content"
              controlId="doc_date"
            >
              <Form.Label>วันที่ส่งเบิก</Form.Label>
              <Form.Control
                required
                type="date"
                defaultValue={defaultDate}
                placeholder="Date"
                className="form-control mt-1 Form-input"
                onChange={(e) => setDocDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="form-group mt-3 form-content"
              controlId="status"
            >
              <Form.Label>สถานะ</Form.Label>
              <Form.Control
                required
                as="select"
                type="text"
                defaultValue="waiting_for_document"
                className="form-control mt-1 Form-input"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="waiting_for_document">
                  {getStatusName("waiting_for_document")}
                </option>
                <option value="modifying_document">
                  {getStatusName("modifying_document")}
                </option>
                <option value="proposing_approval">
                  {getStatusName("proposing_approval")}
                </option>
                <option value="approving">{getStatusName("approving")}</option>
                <option value="saving_into_system">
                  {getStatusName("saving_into_system")}
                </option>
                <option value="sending">{getStatusName("sending")}</option>
                <option value="withdrawing">
                  {getStatusName("withdrawing")}
                </option>
              </Form.Control>
            </Form.Group>

            <Row className="form-content">
              <Col>
                <Form.Group className="form-group mt-3 " controlId="amount">
                  <Form.Label>จำนวนเงิน (บาท)</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Amount"
                    pattern="(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)"
                    className="form-control mt-1 Form-input"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => confirmHide()}>
            {confirm === true ? "Confirm?" : "Cancel"}
          </Button>
          <Button variant="primary" type="submit">
            ADD
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalWithdrawalAdd;
