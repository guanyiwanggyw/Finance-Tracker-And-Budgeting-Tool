import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Transaction from "../transactions/Transaction";
import api from "../../services/api"; // <-- you must import this

export default function AccountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");

    // Fetch account details
    fetch(`http://localhost:8000/api/accounts/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setAccount(data));

    // Fetch ALL transactions (you can optimise later)
    fetch(`http://localhost:8000/api/transactions/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, [id]);

  const deleteAccount = () => {
    const token = localStorage.getItem("access");

    fetch(`http://localhost:8000/api/accounts/delete/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => navigate("/accounts"));
  };

  const returnPage = () => navigate("/accounts");

  const deleteTransaction = (transactionId) => {
    api
      .delete(`/api/transactions/delete/${transactionId}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Transaction was deleted");

          // Update state instead of calling getTransactions()
          setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
        } else {
          alert("Failed to delete transaction!");
        }
      })
      .catch((err) => alert(err));
  };

  if (!account) return <p>Loading...</p>;

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.from_account === account.id ||
      transaction.to_account === account.id,
  );

  return (
    <div className="">
      <h1>{account.account_name} Details</h1>

      <button className="delete-button" onClick={deleteAccount}>
        Delete Account
      </button>

      <button className="delete-button" onClick={returnPage}>
        Go back to Accounts
      </button>

      <h2>Transactions</h2>

      {filteredTransactions.length === 0 && <p>No transactions found.</p>}

      {filteredTransactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          onDelete={() => deleteTransaction(transaction.id)}
        />
      ))}
    </div>
  );
}
