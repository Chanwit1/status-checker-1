import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Input, Table } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import ModalUserEdit from "./modals/ModalUserEdit";
import ModalUserDelete from "./modals/ModalUserDelete";



function AdminUserList(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [focusValue, setFocusValue] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(props.currentQuery);
  }, [props.users]);

  const users = props.users;

  let handleQuery = (e) => {
    setQuery(e.target.value);
    props.currentQuery(e.target.value);
  };

  let finishQuery = (e) => {
    e.preventDefault();
    props.refreshTable(null, query);
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <ModalUserEdit
        show={showEditModal}
        user={focusValue}
        onHide={() => {
          setFocusValue(null);
          setShowEditModal(false);
        }}
        onResponse={(msg) => props.refreshTable(msg, query)}
        token={props.token}
      />
      <ModalUserDelete
        show={showDeleteModal}
        user={focusValue}
        onHide={() => {
          setFocusValue(null);
          setShowDeleteModal(false);
        }}
        onResponse={(msg) => props.refreshTable(msg, query)}
        token={props.token}
      />
      <Container className="justify-content-center d-flex search-bar">
        <Form className="search-form" onSubmit={finishQuery}>
          <Input
            className="search-form"
            name="search"
            type="text"
            key="withdrawal_query"
            placeholder="Search by name, student id or email..."
            disableUnderline
            onChange={handleQuery}
          />
        </Form>
      </Container>
      {users.length > 0 ? (
        <Row>
          <Container className="text-white">
            <h5>แสดงผลลัพธ์ {users.length} รายการ</h5>
          </Container>
          <Table
            className="color-black justify-content-center table"
            bordered="true"
            hover="true"
          >
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Course</th>
                <th>Advisor</th>
                <th>Role</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr
                    key={user.user_id.toString()}
                    // onClick={() => navigateToItem(user.user_id)}
                  >
                    <td className="text-center">{user.user_id}</td>
                    <td>
                      {user["first_name"]}{" "}
                      {user["last_name"]}
                    </td>
                    <td>{user.email ? user.email : "-"}</td>
                    <td>{user.student_id ? user.student_id : "-"}</td>
                    <td className="text-center">{user.course ? user.course : "-"}</td>
                    <td className="text-center">{user.advisor ? user.advisor : "-"}</td>
                    <td className="text-center">{user.user_type}</td>
                    <td
                      className="text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Row className="justify-context-center">
                        <Col>
                          <FontAwesomeIcon className="icon-small" icon={faEdit} 
                          onClick={() => {
                            setFocusValue(user);
                            setShowEditModal(true);
                          }}></FontAwesomeIcon>
                          {user.user_type === 'admin' ?
                          <FontAwesomeIcon className="icon-small icon-disabled" icon={faTrash}
                          onClick={() => {
                            props.showAlert("ไม่สามารถลบผู้ใช้งานที่เป็น admin นอกจากว่าจะปลดระดับผู้ใช้งานก่อน");
                          }}
                          ></FontAwesomeIcon>
                          :
                          <FontAwesomeIcon  className="icon-small" icon={faTrash} onClick={() => {
                            setFocusValue(user);
                            setShowDeleteModal(true);
                          }}></FontAwesomeIcon>
                        }
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      ) : (
        <Container className="text-white">
          <h5>ไม่พบผลลัพธ์ที่ต้องการ</h5>
        </Container>
      )}
    </Container>
  );
}

export default AdminUserList;
