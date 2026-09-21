import Transaction from "./Transaction";
import { Link } from "react-router-dom";

export default function TransactionList({ transactions, onDelete }) {
  // sort transactions newest to oldest
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const grouped = sorted.reduce((acc, t) => {
    const date = t.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(t);
    return acc;
  }, {});

  return (
    <div className="transaction-list">
      {Object.entries(grouped).map(([date, transactions]) => (
        <div key={date} className="transaction-date-group">
          <h2 className="transaction-date">{date}</h2>

          {transactions.map((transaction) => (
            <Link
              className="transaction-link"
              to={`/transactions/${transaction.id}`}
              key={transaction.id}
            >
              <Transaction
                transaction={transaction}
                onDelete={() => onDelete(transaction.id)}
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
/*
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
*/
