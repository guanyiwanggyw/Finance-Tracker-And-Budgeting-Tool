import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import TransactionList from "../features/transactions/TransactionList";
import TransactionForm from "../features/transactions/TransactionForm";
import api from "../services/api";
import "../styles/Transaction.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getTransactions();
    getAccounts();
  }, []);

  const getTransactions = () => {
    api.get("/api/transactions/").then((res) => setTransactions(res.data));
  };

  const getAccounts = () => {
    api.get("/api/accounts/").then((res) => setAccounts(res.data));
  };

  const deleteTransaction = (id) => {
    api.delete(`/api/transactions/delete/${id}/`).then(() => getTransactions());
  };

  return (
    <div className="transaction-page">
      <Navbar />

      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
      />

      <TransactionForm
        accounts={accounts}
        onTransactionsChanged={getTransactions}
      />
    </div>
  );
}
