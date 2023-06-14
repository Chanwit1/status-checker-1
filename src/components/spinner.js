import React from "react";
import { Container } from "react-bootstrap";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <Container className="spinner-container">
      <Container className="loading-spinner"></Container>
    </Container>
  );
}
