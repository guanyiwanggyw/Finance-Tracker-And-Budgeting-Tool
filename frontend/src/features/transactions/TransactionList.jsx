import Transaction from "./Transaction";

export default function TransactionList({
  transactions,
  onSelectTransaction,
  filters,
  sort,
  order,
  group,
}) {
  // Functions
  const filterFunctions = {
    account: (t, value) => t.from_account === value || t.to_account === value,

    category: (t, value) => t.category === value,

    type: (t, value) => t.type === value,

    minAmount: (t, value) => t.amount >= value,

    maxAmount: (t, value) => t.amount <= value,
  };

  const sortFunctions = {
    date: (a, b) => new Date(a.date) - new Date(b.date),
    amount: (a, b) => a.amount - b.amount,
    category: (a, b) => a.category.localeCompare(b.category),
    from_account: (a, b) => a.from_account.localeCompare(b.from_account),
    to_account: (a, b) => a.to_account.localeCompare(b.to_account),
  };

  // Filter transactions
  let filtered = [...transactions];

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      const fn = filterFunctions[key];
      if (fn) {
        filtered = filtered.filter((t) => fn(t, value));
      }
    });
  }

  // Sort transactions
  let sorted = [...filtered];

  if (sort) {
    sorted.sort(sortFunctions[sort]);
  }

  // Order transaction
  if (order === "desc") {
    sorted.reverse();
  }

  // Group transactions
  const grouped = sorted.reduce((acc, t) => {
    const key = group ? t[group] : "all";

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(t);
    return acc;
  }, {});

  return (
    <div className="transaction-list">
      {Object.entries(grouped).map(([date, transactions]) => (
        <div key={date} className="transaction-date-group">
          <h2 className="transaction-date">{date}</h2>

          {transactions.map((transaction) => (
            <div
              className="transaction-link"
              onClick={() => onSelectTransaction(transaction.id)}
              key={transaction.id}
            >
              <Transaction transaction={transaction} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
