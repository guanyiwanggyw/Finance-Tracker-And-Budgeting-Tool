import "../../styles/Account.css";

export default function Account({ account }) {
  const getSign = (account) => {
    return account.current_balance < 0 ? "-" : "";
  };

  return (
    <div className="account-container">
      <p className="account-content">{account.account_name}</p>
      <p className="account-content">
        {getSign(account)}£{Math.abs(account.current_balance)}
      </p>
    </div>
  );
}
