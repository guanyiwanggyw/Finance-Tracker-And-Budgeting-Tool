import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { clearAuthTokens } from "../services/auth";
import Account from "../features/accounts/Account";
import LogoutButton from "../components/LogoutButton";
import AccountForm from "../features/accounts/AccountForm";
import TransactionForm from "../features/transactions/TransactionForm";
import "../styles/Home.css";

function Home() {
  const [accountsVersion, setAccountsVersion] = useState(0);
  const [transactionsVersion, setTransactionsVersion] = useState(0);

  const handleVersionChanged = () => {
    setAccountsVersion((version) => version + 1);
    setTransactionsVersion((version) => version + 1);
  };

  return (
    <div>
      <AccountForm
        accountsVersion={accountsVersion}
        onAccountsChanged={handleVersionChanged}
      />
      <TransactionForm
        accountsVersion={accountsVersion}
        transactionsVersion={transactionsVersion}
        onTransactionsChanged={handleVersionChanged}
      />
      <LogoutButton />
    </div>
  );
}

export default Home;
