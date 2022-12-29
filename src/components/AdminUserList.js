import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Input, Table } from "@material-ui/core";
import { Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import ModalUserAdd from "./modals/ModalUserAdd";
import ModalUserEdit from "./modals/ModalUserEdit";
import ModalUserDelete from "./modals/ModalUserDelete";
import { getTitleRank } from "../functions";



function AdminUserList(props) {

  const [showAddModal, setShowAddModal] = useState(false);
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
      <ModalUserAdd
        show={showAddModal}
        onHide={() => {
          setFocusValue(null);
          setShowAddModal(false);
        }}
        onResponse={(msg) => props.refreshTable(msg, query)}
        token={props.token}
      />
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
      <Button className="button-add" onClick={() => setShowAddModal(true)}>
        Add New User
      </Button>
      <Container className="justify-content-center d-flex search-bar">
        <Form className="search-form" onSubmit={finishQuery}>
          <Input
            className="search-form"
            name="search"
            type="text"
            key="withdrawal_query"
            placeholder="Search by name, member id or email..."
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
          <Container className="overflow-auto">
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
                <th>Student/Staff ID</th>
                <th>Department</th>
                <th>Faculty</th>
                {/* <th>Course</th> */}
                {/* <th>Advisor</th> */}
                <th>Role</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const name = user.first_name;
                const title = user.name_title;
                const usertype = user.user_type;
                const rank = user.academic_rank;
                return (
                  <tr
                    key={user.user_id.toString()}
                    // onClick={() => navigateToItem(user.user_id)}
                  >
                    <td className="text-center">{user.user_id}</td>
                    <td>
                      {getTitleRank(name, title, usertype, rank)}
                      {user["first_name"]}{" "}
                      {user["last_name"]}
                    </td>
                    <td>{user.email ? user.email : "-"}</td>
                    <td>{user.member_id ? user.member_id : "-"}</td>
                    <td className="text-center">{user.department ? user.department : "-"}</td>
                    <td className="text-center">{user.faculty ? user.faculty : "-"}</td>
                    {/* <td className="text-center">{user.course ? user.course : "-"}</td> */}
                    {/* <td className="text-center">{user.advisor ? user.advisor : "-"}</td> */}
                    <td className="text-center">{user.user_type}</td>
                    <td
                      className="text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Row className="justify-context-center">
                        <Col>
                          <FontAwesomeIcon className="icon-small" size="lg" icon={faEdit} 
                          onClick={() => {
                            setFocusValue(user);
                            setShowEditModal(true);
                          }}></FontAwesomeIcon>
                          {user.user_type === 'admin' ?
                          <FontAwesomeIcon className="icon-small icon-disabled" size="lg" icon={faTrash}
                          onClick={() => {
                            props.showAlert("ไม่สามารถลบผู้ใช้งานที่เป็น admin นอกจากว่าจะปลดระดับผู้ใช้งานก่อน");
                          }}
                          ></FontAwesomeIcon>
                          :
                          <FontAwesomeIcon  className="icon-small" size="lg" icon={faTrash} onClick={() => {
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

export default AdminUserList;
