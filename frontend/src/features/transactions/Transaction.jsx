import "../../styles/Account.css";
import "../../styles/Transaction.css";

function Transaction({ transaction, onDelete }) {
  return (
    <div className="transaction-container">
      <p className="transaction-balance">{transaction.type}</p>
      <p className="transaction-balance">£{transaction.amount}</p>
      <p className="transaction-balance">Category: {transaction.category}</p>
      <p className="transaction-balance">
        From: {transaction.from_account_name}
      </p>
      <p className="transaction-balance">To: {transaction.to_account_name}</p>
      <p className="transaction-balance">Note: {transaction.note}</p>

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
