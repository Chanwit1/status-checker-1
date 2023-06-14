import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
// import useToken from './store/useToken';
import Withdrawal from "./routes/Withdrawal";

export const backendURL = "http://localhost:3001";

function App() {
  // const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/withdrawals/:id" element={<Withdrawal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
