import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TransactionList from "../transactions/TransactionList";

export default function AccountDetails({
  id,
  accountVersion,
  onClose,
  onAccountDeleted,
}) {
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTransaction, setActiveTransaction] = useState(null);

  const getSign = (account) => {
    return account.current_balance < 0 ? "-" : "";
  };

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
    }).then((res) => {
      if (res.ok) {
        alert("Account deleted");

        // Refresh accounts on the parent page
        if (typeof onAccountDeleted === "function") {
          onAccountDeleted();
        }

        // Close the panel immediately
        onClose();
      } else {
        alert("Failed to delete account");
      }
    });
  };

  if (!account) return <p>Loading...</p>;

  return (
    <div className="account-panel">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <h1>{account.account_name}</h1>
      <h2>
        {getSign(account)}£{Math.abs(account.current_balance)}
      </h2>
      <button className="delete-button" onClick={deleteAccount}>
        Delete Account
      </button>
      <h2>Transactions</h2>
      <TransactionList
        transactions={transactions}
        onSelectTransaction={setActiveTransaction}
        filters={{ account: account.id }}
        sort="date"
        order="desc"
        group="date"
      />
    </div>
  );
}
