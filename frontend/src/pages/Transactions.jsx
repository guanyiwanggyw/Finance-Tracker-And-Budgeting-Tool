import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import TransactionList from "../features/transactions/TransactionList";
import TransactionForm from "../features/transactions/TransactionForm";
import api from "../services/api";
import "../styles/Transaction.css";
import TransactionDetails from "../features/transactions/TransactionDetails";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [activeTransaction, setActiveTransaction] = useState(null);

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
        onSelectTransaction={setActiveTransaction}
        sort="date"
        order="desc"
        group="date"
      />

      <TransactionForm
        accounts={accounts}
        onTransactionsChanged={getTransactions}
      />
      {activeTransaction && (
        <>
          <div
            className="overlay-bg"
            onClick={() => setActiveTransaction(null)}
          />
          <TransactionDetails
            id={activeTransaction}
            onClose={() => setActiveTransaction(null)}
            onTransactionDeleted={(deletedId) => {
              setTransactions((prev) => prev.filter((t) => t.id !== deletedId));
              getTransactions();
            }}
          />
        </>
      )}
    </div>
  );
}
