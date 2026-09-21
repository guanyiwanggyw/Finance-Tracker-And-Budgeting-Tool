import "../../styles/Account.css";

export default function Account({ account }) {
  return (
    <div className="account-container">
      <p className="account-name">{account.account_name}</p>
      <p className="account-current-balance">£{account.current_balance}</p>
    </div>
  );
}
