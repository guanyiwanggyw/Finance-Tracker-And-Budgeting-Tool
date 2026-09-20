import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Account from "./Account";
import "../../styles/Form.css";

function AccountForm({ accountsVersion, onAccountsChanged }) {
  const [accounts, setAccounts] = useState([]);
  const [opening_balance, setOpeningBalance] = useState("");
  const [opening_date, setOpeningDate] = useState("");
  const [account_name, setAccountName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAccounts();
  }, [accountsVersion]);

  const getAccounts = () => {
    api
      .get("/api/accounts/")
      .then((res) => res.data)
      .then((data) => {
        (setAccounts(data), console.log(data));
      })
      .catch((err) => alert(err));
  };

  const deleteAccount = (id) => {
    api
      .delete(`/api/accounts/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Account was deleted");
        else alert("Failed to delete account!");
        getAccounts();
        if (res.status === 204) onAccountsChanged?.();
      })
      .catch((err) => alert(err));
  };

  const createAccount = (e) => {
    e.preventDefault();
    api
      .post("/api/accounts/", { account_name, opening_balance, opening_date })
      .then((res) => {
        if (res.status === 201) {
          setAccountName("");
          setOpeningBalance("");
          setOpeningDate("");
          onAccountsChanged?.();
        } else alert("Failed to add account");
        getAccounts();
      })
      .catch((err) => alert(err));
  };

  const getInternalAccounts = (accounts) => {
    return accounts
      .filter((account) => account.account_type === "Internal")
      .map((account) => (
        <Account account={account} onDelete={deleteAccount} key={account.id} />
      ));
  };

  return (
    <div class="account-container">
      <div>
        <h2>Accounts</h2>
        {getInternalAccounts(accounts)}
      </div>
      <br />
      <div>
        <h2>Add an account</h2>
        <form onSubmit={createAccount}>
          <label htmlFor="account-name">Account Name:</label>
          <br />
          <input
            type="text"
            id="account-name"
            required
            onChange={(e) => setAccountName(e.target.value)}
            value={account_name}
          />
          <label htmlFor="account-opening-balance">Opening Balance:</label>
          <br />
          <input
            type="text"
            inputMode="numeric"
            pattern="^\d*(\.\d{0,2})?$"
            id="opening-balance"
            step="0.01"
            required
            onChange={(e) => setOpeningBalance(e.target.value)}
            value={opening_balance}
          />
          <label htmlFor="account-opening-date">Opening Date:</label>
          <br />
          <input
            type="date"
            id="opening-date"
            required
            onChange={(e) => setOpeningDate(e.target.value)}
            value={opening_date}
          />
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
}

export default AccountForm;
