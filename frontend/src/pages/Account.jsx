import AccountForm from "../features/accounts/AccountForm";
import TransactionForm from "../features/transactions/TransactionForm";
import Navbar from "../components/NavBar";

export default function Account() {
  return (
    <div>
      <Navbar />
      <AccountForm />
    </div>
  );
}
