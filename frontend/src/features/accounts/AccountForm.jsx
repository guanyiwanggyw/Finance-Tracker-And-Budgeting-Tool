import { useState } from "react";
import api from "../../services/api";
import "../../styles/Form.css";
import "../../styles/Account.css";

export default function AccountForm({ onAccountCreated }) {
  const [opening_balance, setOpeningBalance] = useState("");
  const [opening_date, setOpeningDate] = useState("");
  const [account_name, setAccountName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();

    try {
      const accountRes = await api.post("/api/accounts/", {
        account_name,
      });

      onAccountCreated();
      const accountId = accountRes.data.id;

      const numericBalance = Number(opening_balance);

      const payload = {
        date: opening_date,
        type: numericBalance < 0 ? "Expense" : "Income",
        category: `${account_name} Opening Balance`,
        amount: Math.abs(numericBalance),
        note: "Opening Transaction",
      };

      if (numericBalance < 0) {
        payload.from_account = accountId;
        payload.to_account_name = "Opening Balance Source";
      }

      if (numericBalance >= 0) {
        payload.to_account = accountId;
        payload.from_account_name = "Opening Balance Source";
      }

      await api.post("/api/transactions/", payload);

      setAccountName("");
      setOpeningBalance("");
      setOpeningDate("");
      setShowForm(false);
    } catch (err) {
      alert("Failed to create account or opening transaction");
    }
  };

  return (
    <div>
      <button className="form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Account"}
      </button>

      {showForm && (
        <form onSubmit={createAccount} className="form-container">
          <label>Account Name:</label>
          <input
            type="text"
            required
            value={account_name}
            onChange={(e) => setAccountName(e.target.value)}
          />

          <label>Opening Balance:</label>
          <input
            type="number"
            required
            value={opening_balance}
            onChange={(e) => setOpeningBalance(e.target.value)}
          />

          <label>Opening Date:</label>
          <input
            type="date"
            required
            value={opening_date}
            onChange={(e) => setOpeningDate(e.target.value)}
          />

          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
