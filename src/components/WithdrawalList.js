import React, { useEffect } from "react";
import { Table } from "@material-ui/core";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import {
  getStatusName,
  getShortDate,
} from "../functions";

import { useNavigate } from "react-router-dom";

function WithdrawalList(props) {
  useEffect(() => {
    // console.log(props.withdrawals);
  }, [props.withdrawals]);

  const navigate = useNavigate();
  const withdrawals = props.withdrawals;

  function navigateToItem(id) {
    navigate("/withdrawals/" + id);
  }

  useEffect(() => {}, []);

  return (
    <Container>
      {withdrawals.length > 0 ? (
        <Row>
          <Container className="text-white">
            <h5>แสดงผลลัพธ์ {withdrawals.length} รายการ</h5>
          </Container>
          <Table
            className="color-black justify-content-center table"
            bordered="true"
            hover="true"
          >
            <thead>
              <tr className="text-center">
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => {
                return (
                  <tr
                    key={withdrawal.withdrawal_id.toString()}
                    onClick={() => navigateToItem(withdrawal.withdrawal_id)}
                  >
                    <td className="text-center">{getShortDate(withdrawal.doc_date)}</td>
                    <td className="text-center">{withdrawal.description}</td>
                    <td className="text-center">{withdrawal.amount}</td>
                    <td className="text-center">
                      {getStatusName(withdrawal.status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
