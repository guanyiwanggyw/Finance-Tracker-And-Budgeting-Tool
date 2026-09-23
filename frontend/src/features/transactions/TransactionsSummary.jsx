import "../../styles/Transaction.css";

export default function TransactionsSummary({ transactions }) {
  const getTransactions = (transactions, filter) => {
    return transactions.filter((t) => t.type === filter);
  };

  const getTotal = (transactions) => {
    return transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  };
  const getSign = (balance) => {
    return balance < 0 ? "-£" : "+£";
  };

  const income = getTotal(getTransactions(transactions, "Income"));
  const expense = getTotal(getTransactions(transactions, "Expense"));
  const balance = income - expense;

  return (
    <div className="transaction-summary-container">
      <div className="transaction-summary-group">
        <p className="transaction-summary-heading">Income</p>
        <p className="transaction-summary-content">+£{income}</p>
      </div>

      <div className="transaction-summary-group">
        <p className="transaction-summary-heading">Expense</p>
        <p className="transaction-summary-content">-£{expense}</p>
      </div>

      <div className="transaction-summary-group">
        <p className="transaction-summary-heading">Balance</p>
        <p className="transaction-summary-content">
          {getSign(balance)}
          {Math.abs(balance)}
        </p>
      </div>
    </div>
  );
}
