import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/NavBar";
import AccountList from "../features/accounts/AccountList";
import AccountForm from "../features/accounts/AccountForm";
import NetWorth from "../features/accounts/NetWorth";
import "../styles/Account.css";

export default function Account() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    api
      .get("/api/accounts/")
      .then((res) => res.data)
      .then((data) => setAccounts(data));
  };

  return (
    <div className="accounts-page">
      <Navbar />
      <NetWorth accounts={accounts} />
      <button className="place-holder">FILTER</button>
      <AccountList accounts={accounts} />
      <AccountForm onAccountCreated={getAccounts} />
    </div>
  );
}
