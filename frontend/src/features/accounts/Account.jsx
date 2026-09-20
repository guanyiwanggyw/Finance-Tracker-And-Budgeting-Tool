import "../../styles/Account.css";

function Account({ account, onDelete }) {
  return (
    <div className="account-container">
      <p className="account-name">{account.account_name}</p>
      <p className="account-current-balance">£{account.current_balance}</p>
      <button className="delete-button" onClick={() => onDelete(account.id)}>
        Delete
      </button>
    </div>
  );
}

export default Account;
