import { Link } from "react-router-dom";
import Account from "./Account";

export default function AccountList({ accounts }) {
  const internalAccounts = accounts.filter(
    (account) => account.account_type === "Internal",
  );

  return (
    <div className="account-list">
      {internalAccounts.map((account) => (
        <Link
          className="account-link"
          to={`/accounts/${account.id}`}
          key={account.id}
        >
          <Account account={account} />
        </Link>
      ))}
    </div>
  );
}
