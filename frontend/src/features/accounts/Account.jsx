import "../../styles/Account.css";

export default function Account({ account }) {
  const getSign = (account) => {
    return account.current_balance < 0 ? "-" : "";
  };
  const absoluteBalance = (account) => {
    return account.current_balance < 0
      ? account.current_balance * -1
      : account.current_balance;
  };
  return (
    <div className="account-container">
      <p className="account-content">{account.account_name}</p>
      <p className="account-content">
        {getSign(account)}£{absoluteBalance(account)}
      </p>
    </div>
  );
}
