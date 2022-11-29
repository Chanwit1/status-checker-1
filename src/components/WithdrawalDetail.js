import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import {
  getStatusName,
  getLongDate,
  getUserType,
} from "../functions";

import { backendURL } from "../App";
import axios from "axios";

function WithdrawalDetail(props) {
  useEffect(() => {
    // console.log(props.withdrawal);
  }, [props.withdrawal]);

  const withdrawal = props.withdrawal;
  const user = props.withdrawal.user;
  const fDate = new Date(withdrawal.doc_date);

  useEffect(() => {}, []);

  const updateStatus = async (newStatus) => {
    try {
      const response = await axios.patch(
        backendURL + "/withdrawals/update/" + props.id,
        {
          new_status: newStatus,
        },
        { withCredentials: true }
      );
      // shows popup box when finished
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  return (
    <Container className="">
      <Container className="text-header">รายละเอียดการเบิกเงิน</Container>
      <Row className="justify-content-center">
        <Col xs={9} sm={8} md={6} lg={6} xl={4} className="withdraw-body">
          <Card className="withdraw-card-detail color-black">
            <ListGroup variant="flush">
              <ListGroup.Item className="color-black withdraw-card-padding-top">
                <Col className="withdraw-text-very-top">
                  {withdrawal.description}
                </Col>

                <Col className="withdraw-text-top">ชื่อผู้เบิก</Col>
                <Col className="withdraw-text-bottom">
                  {user.first_name} {user.last_name}
                </Col>

                <Col className="withdraw-text-top">ประเภทผู้ใช้งาน</Col>
                <Col className="withdraw-text-bottom">{getUserType(user.user_type)}</Col>

                <Col className="withdraw-text-top">รหัสนักศึกษา/พนักงาน</Col>
                <Col className="withdraw-text-bottom">{user.member_id}</Col>

                <Col className="withdraw-text-top">หลักสูตร</Col>
                <Col className="withdraw-text-bottom">{user.course}</Col>

                {/* <Col className="withdraw-text-top">อาจารย์ที่ปรึกษา</Col>
                <Col className="withdraw-text-bottom">{user.advisor}</Col> */}

                <Col className="withdraw-label-big text-center">
                  สถานะ: {getStatusName(withdrawal.status)}
                </Col>
              </ListGroup.Item>

              <Row className="color-black withdraw-card-padding-bottom-first">
                <Col xs={6} className="">
                  วันที่จัดทำเอกสาร
                </Col>
                <Col xs={6} className="withdraw-card-right">
                {getLongDate(fDate)}
                </Col>
              </Row>
              <Row className="color-black withdraw-card-padding-bottom">
                <Col xs={6} className="">
                  จำนวนเงิน
                </Col>
                <Col xs={6} className="withdraw-card-right">
                  {withdrawal.amount} บาท
                </Col>
              </Row>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default WithdrawalDetail;
