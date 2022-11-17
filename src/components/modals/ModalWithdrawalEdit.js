import React, { useState, useEffect } from "react";
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

function ModalWithdrawalEdit(props) {
  var date = new Date();
  let defaultDate = date.toISOString().split("T")[0];

  const withdrawal = props.withdrawal
  const [id, setId] = useState("");
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [docDate, setDocDate] = useState(defaultDate);
  const [status, setStatus] = useState("waiting_for_document");
  const [amount, setAmount] = useState(0);
  const [amountDecimal, setAmountDecimal] = useState(0);

  const [dataDidUpdate, setDataDidUpdate] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [msg, setErrMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    updateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawal]);


  function updateValue() {
    if (withdrawal != null && dataDidUpdate === false) {
      setDataDidUpdate(true);
      setId(withdrawal.withdrawal_id);
      setInput(withdrawal["user.email"]);
      setDescription(withdrawal.description);
      setDocDate(withdrawal.doc_date.split("T")[0]);
      setStatus(withdrawal.status);
      setAmount(withdrawal.amount);
      setAmountDecimal(withdrawal.amount_decimal);
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


  const EditWithdrawal = async (e, id, token) => {
    e.preventDefault();

    try {
      let header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .put(
          backendURL + "/withdrawals/" + id,
          {
            input: input,
            description: description,
            doc_date: docDate,
            status: status,
            amount: amount,
            amount_decimal: amountDecimal,
          },
          header,
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.status === 200) {
            props.onResponse("แก้ไขรายการใหม่สำเร็จ");
            handleHide()
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
      <Form onSubmit={(e) => EditWithdrawal(e, id, props.token)}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Editing withdrawal
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
              <Form.Label>รหัสนักศึกษาหรืออีเมล</Form.Label>
              <Form.Control
                required
                type="text"
                value={input}
                placeholder="Student ID or Email"
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
                value={description}
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
              <Form.Label>วันที่เบิก</Form.Label>
              <Form.Control
                required
                type="date"
                value={docDate}
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
                value={status}
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
                    type="number"
                    value={amount}
                    placeholder="Amount"
                    min="1" 
                    max="2147483647"
                    className="form-control mt-1 Form-input"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="form-group mt-3"
                  controlId="amount_decimal"
                >
                  <Form.Label>จำนวนเงิน (สตางค์)</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={amountDecimal}
                    placeholder="Decimal"
                    min="0" 
                    max="99"
                    className="form-control mt-1 Form-input"
                    onChange={(e) => setAmountDecimal(e.target.value)}
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
            EDIT
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalWithdrawalEdit;
