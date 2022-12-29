import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Input, Table } from "@material-ui/core";
import { Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  getStatusName,
  getTitleRank
} from "../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import ModalWithdrawalAdd from "./modals/ModalWithdrawalAdd";
import ModalWithdrawalEdit from "./modals/ModalWithdrawalEdit";
import ModalWithdrawalDelete from "./modals/ModalWithdrawalDelete";

function AdminWithdrawalList(props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [focusValue, setFocusValue] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
  }, [props.withdrawals]);

  const navigate = useNavigate();
  const withdrawals = props.withdrawals;

  function navigateToItem(id) {
    navigate("/withdrawals/" + id);
  }
  let handleQuery = (e) => {
    setQuery(e.target.value);
    props.currentQuery(e.target.value);
  };

  let finishQuery = (e) => {
    e.preventDefault();
    props.refreshTable(null, query);
  };

  return (
    <Container>
      <ModalWithdrawalAdd
        show={showAddModal}
        onHide={() => {
          setFocusValue(null);
          setShowAddModal(false);
        }}
        onResponse={(msg) => props.refreshTable(msg, query)}
        token={props.token}
      />
      <ModalWithdrawalEdit
        show={showEditModal}
        withdrawal={focusValue}
        onHide={() => {
          setFocusValue(null);
          setShowEditModal(false);
        }}
        onResponse={(msg) => props.refreshTable(msg, query)}
        token={props.token}
      />
      <ModalWithdrawalDelete
        show={showDeleteModal}
        withdrawal={focusValue}
        onHide={() => {
          setFocusValue(null);
          setShowDeleteModal(false);
        }}
        onResponse={(msg) => props.refreshTable(msg, query)}
        token={props.token}
      />
      <Button className="button-add" onClick={() => setShowAddModal(true)}>
        Add Withdrawal
      </Button>
      <Container className="justify-content-center d-flex search-bar">
        <Form className="search-form" onSubmit={finishQuery}>
          <Input
            className="search-form"
            name="search"
            type="text"
            key="withdrawal_query"
            placeholder="Search by name, student/staff id or email..."
            disableUnderline
            onChange={handleQuery}
          />
        </Form>
      </Container>
      {withdrawals.length > 0 ? (
        <Row>
          <Container className="text-white">
            <h5>แสดงผลลัพธ์ {withdrawals.length} รายการ</h5>
          </Container>
          <Container className="overflow-auto">
          <Table
            className="color-black justify-content-center table"
            bordered="true"
            hover="true"
          >
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Member ID (Name)</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => {
                const name = withdrawal["user.first_name"];
                const title = withdrawal["user.name_title"];
                const usertype = withdrawal["user.user_type"];
                const rank = withdrawal["user.academic_rank"];
                return (
                  <tr
                    key={withdrawal.withdrawal_id.toString()}
                    onClick={() => navigateToItem(withdrawal.withdrawal_id)}
                  >
                    <td className="text-center">{withdrawal.withdrawal_id}</td>
                    <td>
                      {withdrawal["user.member_id"]} (
                      {getTitleRank(name, title, usertype, rank)}
                      {withdrawal["user.first_name"]}{" "}
                      {withdrawal["user.last_name"]})
                    </td>
                    <td>{withdrawal.description}</td>
                    <td className="text-center">
                      {withdrawal.amount}
                    </td>
                    <td className="text-center">
                      {getStatusName(withdrawal.status)}
                    </td>
                    <td
                      className="text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Row className="justify-context-center">
                        <Col>
                          <FontAwesomeIcon className="icon-small" size="lg" icon={faEdit} onClick={() => {
                            setFocusValue(withdrawal);
                            setShowEditModal(true);
                          }}></FontAwesomeIcon>
                          <FontAwesomeIcon className="icon-small" size="lg" icon={faTrash} onClick={() => {
                            setFocusValue(withdrawal);
                            setShowDeleteModal(true);
                          }}></FontAwesomeIcon>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          </Container>
        </Row>
      ) : (
        <Container className="text-white">
          <h5>ไม่พบผลลัพธ์ที่ต้องการ</h5>
        </Container>
      )}
    </Container>
  );
}

export default AdminWithdrawalList;
