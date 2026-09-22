import { useEffect, useState } from "react";
import api from "../../services/api";

export default function TransactionDetails({
  id,
  onClose,
  onTransactionDeleted,
}) {
  const [transaction, setTransaction] = useState(null);

  const deleteTransaction = (transactionId) => {
    api
      .delete(`/api/transactions/delete/${transactionId}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Transaction was deleted");

          // Close panel
          onTransactionDeleted(transactionId);
          onClose();
        } else {
          alert("Failed to delete transaction!");
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    api.get(`/api/transactions/${id}/`).then((res) => setTransaction(res.data));
  }, [id]);

  if (!transaction) return null;

  return (
    <div className="transaction-panel">
      <button className="close-button" onClick={onClose}>
        ×
      </button>

      <h1>Transaction {transaction.id}</h1>
      <p>Amount: £{transaction.amount}</p>
      <p>Category: {transaction.category}</p>
      <p>Type: {transaction.type}</p>
      <p>From: {transaction.from_account_name}</p>
      <p>To: {transaction.to_account_name}</p>
      <p>Note: {transaction.note}</p>

      <button
        className="delete-button"
        onClick={() => deleteTransaction(transaction.id)}
      >
        Delete Transaction
      </button>
    </div>
  );
}
