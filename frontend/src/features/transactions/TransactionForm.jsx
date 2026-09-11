import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Transaction from "./Transaction";
import Account from "../accounts/Account";
import "../../styles/Form.css";

function TransactionForm() {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [from_account, setFromAccount] = useState("");
  const [to_account, setToAccount] = useState("");
  const [note, setNote] = useState("");
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  const payload = {
    date,
    type,
    amount,
    category,
    note,
  };

  if (type === "Expense") {
    payload.from_account = from_account;
    payload.to_account_name = to_account;
  }

  if (type === "Income") {
    payload.from_account_name = from_account;
    payload.to_account = to_account;
  }

  if (type === "Transfer") {
    payload.from_account = from_account;
    payload.to_account = to_account;
  }

  useEffect(() => {
    getTransactions();
    getAccounts();
  }, []);

  const getAccounts = () => {
    api
      .get("/api/accounts/")
      .then((res) => setAccounts(res.data))
      .catch((err) => alert(err));
  };
  const getTransactions = () => {
    api
      .get("/api/transactions/")
      .then((res) => res.data)
      .then((data) => {
        (setTransactions(data), console.log(data));
      })
      .catch((err) => alert(err));
  };

  const deleteTransaction = (id) => {
    api
      .delete(`/api/transactions/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Transaction was deleted");
        else alert("Failed to delete transaction!");
        getTransactions();
      })
      .catch((err) => alert(err));
  };

  const createTransaction = (e) => {
    e.preventDefault();
    api
      .post("/api/transactions/", payload)
      .then((res) => {
        if (res.status === 201) {
          setDate("");
          setType("");
          setAmount("");
          setCategory("");
          setFromAccount("");
          setToAccount("");
          setNote("");
        } else alert("Failed to add account");
        getTransactions();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Transactions</h2>
        {transactions.map((transaction) => (
          <Transaction
            transaction={transaction}
            onDelete={deleteTransaction}
            key={transaction.id}
          />
        ))}
      </div>

      <h2>Add a transaction</h2>
      <form onSubmit={createTransaction}>
        <label htmlFor="date">Date:</label>
        <br />
        <input
          type="date"
          id="date"
          required
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <label htmlFor="type">Type:</label>
        <br />
        <select
          className="form-select"
          name="type"
          id="type"
          required
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select a type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Transfer">Transfer</option>
        </select>
        <br />
        <label htmlFor="amount">Amount:</label>
        <br />
        <input
          type="text"
          inputMode="numeric"
          pattern="^\d*(\.\d{0,2})?$"
          id="amount"
          required
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <label htmlFor="category">Category:</label>
        <br />
        <input
          type="text"
          id="category"
          required
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <label htmlFor="from_account">Sent from:</label>
        <br />

        {type === "Expense" || type === "Transfer" ? (
          <select
            className="form-select"
            id="from_account"
            required
            value={from_account}
            onChange={(e) => setFromAccount(e.target.value)}
          >
            <option value="">Select an account</option>

            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.account_name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            id="from_account"
            required
            onChange={(e) => setFromAccount(e.target.value)}
            value={from_account}
          />
        )}

        <label htmlFor="to_account">Sent to:</label>
        <br />
        {type === "Income" || type === "Transfer" ? (
          <select
            className="form-select"
            id="to_account"
            required
            onChange={(e) => setToAccount(e.target.value)}
            value={to_account}
          >
            <option value="">Select an account</option>

            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.account_name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            id="to_account"
            required
            onChange={(e) => setToAccount(e.target.value)}
            value={to_account}
          />
        )}

        <label htmlFor="note">Note:</label>
        <br />
        <textarea
          type="text"
          id="note"
          required
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default TransactionForm;
