import "../../styles/Account.css";
import "../../styles/Transaction.css";

function Transaction({ transaction }) {
  const getSign = (transaction) => {
    return transaction.type === "Expense" ? "-" : "+";
  };

  return (
    <div className="transaction-container">
      <p className="transaction-content">{transaction.category}</p>
      <p className="transaction-content">
        {getSign(transaction)}£{transaction.amount}
      </p>
    </div>
  );
}

export default Transaction;
