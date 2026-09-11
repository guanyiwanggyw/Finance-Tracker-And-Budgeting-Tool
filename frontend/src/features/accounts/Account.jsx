import React from "react";
import "../../styles/Account.css";

// replace "account.opening_balance" with a function to calculate balance later

function Account({ account, onDelete }) {
  return (
    <div className="account-container">
      <p className="account-name">{account.account_name}</p>
      <p className="account-balance">£{account.opening_balance}</p>
      <button className="delete-button" onClick={() => onDelete(account.id)}>
        Delete
      </button>
    </div>
  );
}

export default Account;
