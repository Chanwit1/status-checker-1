import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import {
  getStatusName,
  getLongDate,
  getUserType,
  getAcademicRankShort,
  getNameTitle,
  getTitleRank,
} from "../functions";
import {
  useNavigate,
} from 'react-router-dom';

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

  const navigate = useNavigate();

  return (
    <Container >
      <h6 class="text-back" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} className="me-3"/>กลับไปก่อนหน้า</h6>
      <Container className="text-header" >รายละเอียดการเบิกเงิน</Container>
      <hr style={{color:'white'}}></hr>
      <Row className="justify-content-center">
        <Col xs={9} sm={8} md={6} lg={6} xl={4} className="withdraw-body">
          <Card className="withdraw-card-detail color-black">
            <ListGroup variant="flush">
              <ListGroup.Item className="color-black withdraw-card-padding-top">
                <Col className="withdraw-label-big text-center" 
                  style={{color:getStatusName(withdrawal.status) === "อนุมัติ" ? '#0a8f08' 
                  : getStatusName(withdrawal.status) === "รอทำเอกสารเบิกจ่าย" ? '#f9a825'
                  : getStatusName(withdrawal.status) === "อยู่ระหว่างแก้ไข" ? '#00897b'
                  : getStatusName(withdrawal.status) === "เสนออนุมัติ" ? '#3949ab'
                  : getStatusName(withdrawal.status) === "รอบันทึกเข้าระบบเบิกจ่าย" ? '#f9a825'
                  : getStatusName(withdrawal.status) === "อยู่ระหว่างส่งเบิก" ? '#00897b'
                  : getStatusName(withdrawal.status) === "อยู่ระหว่างโอนเงิน" ? '#039be5'
                  :'#bf360c' }}
                >
                  สถานะ: {getStatusName(withdrawal.status)}
                </Col>
                <hr></hr>
                <Col className="withdraw-text-top">ชื่อผู้เบิก</Col>
                <Col className="withdraw-text-bottom">
                {getTitleRank(user.first_name, user.name_title, user.user_type, user.academic_rank)}{user.first_name} {user.last_name}
                </Col>

                <Col className="withdraw-text-top">ประเภทผู้ใช้งาน</Col>
                <Col className="withdraw-text-bottom">{getUserType(user.user_type)}</Col>

                <Col className="withdraw-text-top">รหัสนักศึกษา/พนักงาน</Col>
                <Col className="withdraw-text-bottom">{user.member_id}</Col>

                <Col className="withdraw-text-top">หลักสูตร</Col>
                <Col className="withdraw-text-bottom">ภาควิชา{user.department} คณะ{user.faculty}</Col>

                <Col className="withdraw-text-top"> คำอธิบาย </Col>
                <Col className="withdraw-text-very-top">
                {withdrawal.description}
                </Col>

                {/* <Col className="withdraw-text-top">อาจารย์ที่ปรึกษา</Col>
                <Col className="withdraw-text-bottom">{user.advisor}</Col> */}

              
              </ListGroup.Item>

              <Row className="color-black withdraw-card-padding-bottom-first">
                <Col xs={6} className="">
                  วันที่ส่งเบิก
                </Col>
                <Col xs={6} className="withdraw-card-right">
                {getLongDate(fDate)}
                </Col>
              </Row>
              <Row className="color-black withdraw-card-padding-bottom">
                <Col xs={6} className="">
                  <h5><b>จำนวนเงิน</b></h5>
                </Col>
                <Col xs={6} className="withdraw-card-right">
                <h5><b>{withdrawal.amount} บาท</b></h5>
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
