import React, { useEffect, useState } from "react";
import NBar from "../components/MemberNavbar";

import axios from "axios";
import { backendURL } from "../App";
import { useParams } from "react-router-dom";
import useToken from "../store/useToken";
import WithdrawalDetail from "../components/WithdrawalDetail";

// either shows student page or admin page

export default function Withdrawal(props) {
  const { token } = useToken();
  const [withdrawal, setWithdrawal] = useState({});
  const [loaded, setLoaded] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    // console.log(token);
    getWithdral();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWithdral = async () => {
    try {
      const response = await axios.get(backendURL + "/withdrawals/" + id, {
        withCredentials: true,
      });
      setWithdrawal(response.data.withdrawal);
      setLoaded(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      <NBar />
      {loaded ? (
        <WithdrawalDetail withdrawal={withdrawal} token={token} id={id} />
      ) : null}
    </div>
  );
}
