import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { FormGroup,FormControlLabel,Typography  } from "@mui/material";
import { Table } from "@material-ui/core";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import {
  getStatusName,
  getShortDate,
  useNameTitle
} from "../functions";

import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles'
import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  typography: {
    body1: {
      fontFamily: "'Kanit', Courier, monospace",
      fontWeight: 400,
      fontSize: 16,
      color: "white"
    }
  }
})

function WithdrawalList(props) {
  useEffect(() => {
    // console.log(props.withdrawals);
  }, [props.withdrawals]);

  const navigate = useNavigate();
  const withdrawals = props.withdrawals;
  
  const [completeHide, setCompleteHide] = useState(false);

  function navigateToItem(id) {
    navigate("/withdrawals/" + id);
  }

  useEffect(() => {}, []);

  return (
    <Container>
      {withdrawals.length > 0 ? (
        <Row>
            <Col>
              <Container className="text-white">
                <h5>แสดงผลลัพธ์ {withdrawals.length} รายการ</h5>
                <hr></hr>
              </Container>
            </Col>
          <Container>
          <FormGroup>
                <FormControlLabel control={<Checkbox
                 onChange={(e) => setCompleteHide(e.target.checked)}
                 className="text-white" />} 
                label={          <ThemeProvider theme={theme}><Typography className="text-white">ซ่อนรายการที่โอนแล้ว</Typography></ThemeProvider>}
                />
            </FormGroup>
            
          </Container>
          <Container className="overflow-auto">
          <Table
            className="color-black justify-content-center table"
            bordered="true"
            hover="true"
          >
            <thead style={{backgroundColor:'#FA5F1A',color:'white'}}>
              <tr className="text-center">
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{cursor:'pointer'}}>
              {withdrawals.map((withdrawal) => {
                if ( (completeHide === false && withdrawal.status === "withdrawing") || withdrawal.status !== "withdrawing" )
                  return (
                    <tr
                      key={withdrawal.withdrawal_id.toString()}
                      onClick={() => navigateToItem(withdrawal.withdrawal_id)}
                    >
                      <td className="text-center">{getShortDate(withdrawal.doc_date)}</td>
                      <td className="text-center">{withdrawal.description}</td>
                      <td className="text-center">{withdrawal.amount}</td>
                      <td className="text-center" 
                        style={{color:getStatusName(withdrawal.status) === "อนุมัติ" ? '#0a8f08' 
                        : getStatusName(withdrawal.status) === "รอทำเอกสารเบิกจ่าย" ? '#f9a825'
                        : getStatusName(withdrawal.status) === "อยู่ระหว่างแก้ไข" ? '#00897b'
                        : getStatusName(withdrawal.status) === "เสนออนุมัติ" ? '#3949ab'
                        : getStatusName(withdrawal.status) === "รอบันทึกเข้าระบบเบิกจ่าย" ? '#f9a825'
                        : getStatusName(withdrawal.status) === "อยู่ระหว่างส่งเบิก" ? '#00897b'
                        : getStatusName(withdrawal.status) === "อยู่ระหว่างโอนเงิน" ? '#039be5'
                        :'#bf360c' }}
                        >
                        {getStatusName(withdrawal.status)}
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </Table>
          </Container>
        </Row>
      ) : (
        null
      )}
      {/* <Row>
        {withdrawals.map((withdrawal) => {
          const fDate = new Date(withdrawal.doc_date);

          return (
            <Col
              className="withdraw-body"
              key={withdrawal.withdrawal_id.toString()}
              xs={12}
              md={6}
              xl={4}
            >
              <Card
                onClick={() => navigateToItem(withdrawal.withdrawal_id)}
                className="withdraw-card"
              >
                <ListGroup variant="flush">
                  <ListGroup.Item className="color-black withdraw-card-padding-top">
                    <Col className="withdraw-label">
                      {getStatusName(withdrawal.status)}
                    </Col>
                    <Col>{withdrawal.description}</Col>
                    <Col></Col>
                  </ListGroup.Item>
                  <Row className="color-black withdraw-card-padding-bottom">
                    <Col xs={6} className="">
                      {fDate.getDate()} {getShortMonthThai(fDate.getMonth())}{" "}
                      {fDate.getFullYear() + 543}
                    </Col>
                    <Col xs={6} className="withdraw-card-right">{withdrawal.amount}</Col>
                  </Row>
                </ListGroup>
              </Card>
            </Col>
          );
        })}
      </Row> */}
    </Container>
  );
}

export default WithdrawalList;
