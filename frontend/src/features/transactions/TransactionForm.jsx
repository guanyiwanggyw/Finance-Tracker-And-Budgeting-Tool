import { useState } from "react";
import api from "../../services/api";
import "../../styles/Form.css";

export default function TransactionForm({ accounts, onTransactionsChanged }) {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [note, setNote] = useState("");

  const createTransaction = async (e) => {
    e.preventDefault();

    const payload = { date, type, amount, category, note };

    if (type === "Expense") {
      payload.from_account = fromAccount;
      payload.to_account_name = toAccount;
    }

    if (type === "Income") {
      payload.from_account_name = fromAccount;
      payload.to_account = toAccount;
    }

    if (type === "Transfer") {
      payload.from_account = fromAccount;
      payload.to_account = toAccount;
    }

    try {
      const res = await api.post("/api/transactions/", payload);

      if (res.status === 201) {
        setDate("");
        setType("");
        setAmount("");
        setCategory("");
        setFromAccount("");
        setToAccount("");
        setNote("");

        onTransactionsChanged?.();
      }
    } catch {
      alert("Failed to add transaction");
    }
  };

  const internalAccounts = accounts.filter(
    (acc) => acc.account_type === "Internal",
  );

  return (
    <div>
      <button className="form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Transaction"}
      </button>

      {showForm && (
        <form onSubmit={createTransaction} className="form-container">
          <label>Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Type</label>
          <select
            className="form-select"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select a type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
            <option value="Transfer">Transfer</option>
          </select>

          <label>Amount</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="^\d*(\.\d{0,2})?$"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label>Category</label>
          <input
            type="text"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label>Sent from</label>
          {type === "Expense" || type === "Transfer" ? (
            <select
              className="form-select"
              required
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
            >
              <option value="">Select an account</option>
              {internalAccounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.account_name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              required
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
            />
          )}

          <label>Sent to</label>
          {type === "Income" || type === "Transfer" ? (
            <select
              className="form-select"
              required
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
            >
              <option value="">Select an account</option>
              {internalAccounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.account_name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              required
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
            />
          )}

          <label>Note</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />

          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
