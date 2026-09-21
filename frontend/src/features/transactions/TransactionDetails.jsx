import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Transaction from "../transactions/Transaction";
import api from "../../services/api";

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);

  // Fetch transaction details
  const getTransaction = () => {
    const token = localStorage.getItem("access");

    fetch(`http://localhost:8000/api/transactions/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTransaction(data));
  };

  // Load account + transactions
  useEffect(() => {
    getTransaction();
  }, [id]);

  // Delete transactions
  const deleteTransaction = () => {
    const token = localStorage.getItem("access");

    fetch(`http://localhost:8000/api/transactions/delete/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => navigate("/transactions"));
  };

  if (!transaction) return <p>Loading...</p>;

  return (
    <div className="">
      <h1>{transaction.id} Details</h1>
      <h2>Amount: £{transaction.amount}</h2>
      <h2>Category: {transaction.category}</h2>
      <h2>Type: {transaction.type}</h2>
      <h2>From: {transaction.from_account_name}</h2>
      <h2>To {transaction.to_account_name}</h2>
      <h2>Note: {transaction.note}</h2>

      <button className="delete-button" onClick={deleteTransaction}>
        Delete Transaction
      </button>

      <button
        className="return-button"
        onClick={() => navigate("/transactions")}
      >
        Go back to Transactions
      </button>
    </div>
  );
}
