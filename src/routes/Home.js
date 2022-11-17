import React, { useEffect, useState } from "react";
import NBar from "../components/StudentNavbar";

import axios from "axios";
import { backendURL } from "../App";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import LoadingSpinner from "../components/spinner";
import WithdrawalList from "../components/WithdrawalList";
import AdminWithdrawalList from "../components/AdminWithdrawalList";
import { getErrorMessage } from "../functions";
import useToken from "../store/useToken";
import useName from "../store/useName";
import AdminUserList from "../components/AdminUserList";
import ModalAlert from "../components/modals/ModalAlert";

// import { ContactsOutlined } from "@material-ui/icons";

export default function Home(props) {
  const { token, setToken } = useToken();
  const { name, setName } = useName();
  const [users, setUsers] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [userType, setUserType] = useState("");
  const [expire, setExpire] = useState("");
  const [statusCode, setStatusCode] = useState(200);
  const [loading, setLoading] = useState(true);
  const [adminNav, setAdminNav] = useState(0);
  const [adminSearchQuery, setAdminSearchQuery] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('Placeholder');
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get(backendURL + "/tokenrefresh", {
        withCredentials: true,
      });
      console.log("token refreshing complete");
      setToken(response.data.accessToken);
      getCurrentUser(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403)
          navigate("/login");
        if (error.response.status === 408) {
          setStatusCode(error.response.status);
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    refreshToken();
    // console.log(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function AdminDisplay(props) {
    if (props.mode === 0) {
      return (
        <AdminWithdrawalList
          withdrawals={withdrawals}
          token={token}
          showAlert={(msg) => showAlert(msg)}
          getQuery={adminSearchQuery}
          currentQuery={(e) => setAdminSearchQuery(e)}
          refreshTable={(msg, query) => refreshTable(msg, adminSearchQuery)}
        />
      );
    } else if (props.mode === 1) {
      return (
        <AdminUserList
          users={users}
          token={token}
          getQuery={adminSearchQuery}
          currentQuery={(e) => setAdminSearchQuery(e)}
          refreshTable={(msg, query) => refreshTable(msg, adminSearchQuery)}
        />
      );
    }
    return (
      <Container className="text-center text-white">
        Error finding correct admin Nav mode
      </Container>
    );
  }

  function showAlert(msg) {
    setAlert(true);
    setAlertMsg(msg);
  }

  const getCurrentUser = async (token) => {
    try {
      const response = await axios.get(
        backendURL + "/usercurrent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true }
      );
      setUserType(response.data.user_type);
      if (response.data.user_type === "student") {
        getWithdrals(token);
      } else if (response.data.user_type === "admin") {
        refreshTable(null, adminSearchQuery);
      }
      setName(response.data.first_name + " " + response.data.last_name);
    } catch (error) {
      if (error.response) {
        setStatusCode(error.response.status);
        console.log(error.response);
      }
    }
  };

  const getWithdrals = async (token) => {
    try {
      const response = await axios.get(
        backendURL + "/withdrawals_current",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true }
      );
      setLoading(false);
      setWithdrawals(response.data);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setStatusCode(error.response.status);
        console.log(error.response);
      }
    }
  };

  function refreshTable(msg, query) {
    if (msg) {
      console.log(msg);
      showAlert(msg)
    }
    setLoading(true);
    getWithdralsAdmin(token, query);
    getUsersAdmin(token, query)
  }

  const getWithdralsAdmin = async (token, query) => {
    const queryH = (query === undefined) ? "" : query;

    console.log("query: " + queryH)
    try {
      const response = await axios.get(
        backendURL + "/withdrawals_admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            query: queryH,
          },
        },
        { withCredentials: true }
      );
      setLoading(false);
      setWithdrawals(response.data);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setStatusCode(error.response.status);
        console.log(error.response);
      }
    }
  };

  const getUsersAdmin = async (token, query) => {
    const queryH = (query === undefined) ? "" : query;

    try {
      const response = await axios.get(
        backendURL + "/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            query: queryH,
          },
        },
        { withCredentials: true }
      );
      setLoading(false);
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setStatusCode(error.response.status);
        console.log(error.response);
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(backendURL + "/tokenrefresh", {
          withCredentials: true,
        });
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        // setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div>
      <NBar currentName={name}/>
      <ModalAlert
        show={alert}
        msg={alertMsg}
        onHide={() => setAlert(false)}
      />
      {statusCode !== 200 ? (
        <Container className="text-header text-center">
          {getErrorMessage(statusCode)}
        </Container>
      ) : null}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          {statusCode === 200 ? (
            <Container>
            {userType === "admin" ? ( // Admin
              <Container>
                <Nav className="justify-content-center text-header" fill>
                  <Nav.Item>
                    <Nav.Link
                      className={
                        "App-link " +
                        (adminNav === 0 ? "text-white underline" : null)
                      }
                      onClick={() => setAdminNav(0)}
                    >
                      Withdrawals
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={
                        "App-link " +
                        (adminNav === 1 ? "text-white underline" : null)
                      }
                      onClick={() => setAdminNav(1)}
                    >
                      Member
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                {/* <AdminDisplay mode={adminNav}/> Does not work */}
                {AdminDisplay({ mode: adminNav })}
              </Container>
            ) : (
              // Student
              <Container>
                {withdrawals.length === 0 ? (
                  <Container className="text-header text-center">
                    ไม่มีรายการการเบิกเงินในขณะนี้
                  </Container>
                ) : (
                  <Container className="text-header">
                    สถานะการเบิกเงินที่มีอยู่
                  </Container>
                )}
                <WithdrawalList withdrawals={withdrawals} token={token} />
              </Container>
            )}
          </Container>
          ) : null}
        </Container>
      )}
    </div>
  );
}
