import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Transaction from "../transactions/Transaction";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function AccountDetails({ accountVersion }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Fetch account details
  const getAccount = () => {
    const token = localStorage.getItem("access");

    fetch(`http://localhost:8000/api/accounts/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setAccount(data));
  };

  // Fetch all transactions
  const getTransactions = () => {
    const token = localStorage.getItem("access");

    fetch(`http://localhost:8000/api/transactions/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  };

  // Load account + transactions
  useEffect(() => {
    getAccount();
    getTransactions();
  }, [id, accountVersion]);

  // Delete account
  const deleteAccount = () => {
    const token = localStorage.getItem("access");

    fetch(`http://localhost:8000/api/accounts/delete/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => navigate("/accounts"));
  };

  // Delete transaction
  const deleteTransaction = (transactionId) => {
    api
      .delete(`/api/transactions/delete/${transactionId}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Transaction was deleted");

          // Remove from local state
          setTransactions((prev) => prev.filter((t) => t.id !== transactionId));

          // Re-fetch account to update balance
          getAccount();
        } else {
          alert("Failed to delete transaction!");
        }
      })
      .catch((err) => alert(err));
  };

  if (!account) return <p>Loading...</p>;

  // Filter transactions for this account
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.from_account === account.id ||
      transaction.to_account === account.id,
  );

  return (
    <div className="">
      <h1>{account.account_name} Details</h1>
      <h2>Balance £{account.current_balance}</h2>

      <button className="delete-button" onClick={deleteAccount}>
        Delete Account
      </button>

      <button className="return-button" onClick={() => navigate("/accounts")}>
        Go back to Accounts
      </button>

      <h2>Transactions</h2>

      {filteredTransactions.length === 0 && <p>No transactions found.</p>}

      {filteredTransactions.map((transaction) => (
        <Link
          className="transaction-link"
          to={`/transactions/${transaction.id}`}
          key={transaction.id}
        >
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={() => deleteTransaction(transaction.id)}
          />
        </Link>
      ))}
    </div>
  );
}
