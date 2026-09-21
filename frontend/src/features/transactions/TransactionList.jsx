import Transaction from "./Transaction";

export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          onDelete={() => onDelete(transaction.id)}
        />
      ))}
    </div>
  );
}
