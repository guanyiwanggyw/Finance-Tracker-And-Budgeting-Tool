import React from "react";
import "../../styles/Account.css";

function Transaction({ transaction, onDelete }) {
  return (
    <div className="account-container">
      <p className="account-name">{transaction.date}</p>
      <p className="account-balance">{transaction.type}</p>
      <p className="account-balance">£{transaction.amount}</p>
      <p className="account-balance">Category: {transaction.category}</p>
      <p className="account-balance">From: {transaction.from_account}</p>
      <p className="account-balance">To: {transaction.to_account}</p>
      <p className="account-balance">Note: {transaction.note}</p>

      <button
        className="delete-button"
        onClick={() => onDelete(transaction.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Transaction;
