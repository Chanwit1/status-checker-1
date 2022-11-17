import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

function ModalAlert(props) {

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Form>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Alert
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            {props.msg}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => props.onHide()}>
            OK
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalAlert;
