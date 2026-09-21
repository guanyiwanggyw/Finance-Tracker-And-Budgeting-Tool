import { useState } from "react";
import api from "../../services/api";
import "../../styles/Form.css";

export default function AccountForm({ onAccountCreated }) {
  const [opening_balance, setOpeningBalance] = useState("");
  const [opening_date, setOpeningDate] = useState("");
  const [account_name, setAccountName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const createAccount = (e) => {
    e.preventDefault();

    api
      .post("/api/accounts/", { account_name, opening_balance, opening_date })
      .then((res) => {
        if (res.status === 201) {
          setAccountName("");
          setOpeningBalance("");
          setOpeningDate("");
          setShowForm(false);

          onAccountCreated(); // tell parent to refresh list
        }
      });
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
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
            type="text"
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
