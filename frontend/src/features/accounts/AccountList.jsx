import Account from "./Account";

export default function AccountList({ accounts, onSelectAccount }) {
  const internalAccounts = accounts.filter(
    (account) => account.account_type === "Internal",
  );

  return (
    <div className="account-list">
      {internalAccounts.map((account) => (
        <div
          className="account-link"
          onClick={() => onSelectAccount(account.id)}
          key={account.id}
        >
          <Account account={account} />
        </div>
      ))}
    </div>
  );
}
