import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AccountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    fetch(`http://localhost:8000/api/accounts/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAccount(data));
  }, [id]);

  const deleteAccount = () => {
    const token = localStorage.getItem("access");

    fetch(`http://localhost:8000/api/accounts/delete/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      navigate("/accounts");
    });
  };

  const returnPage = () => {
    navigate("/accounts");
  };

  if (!account) return <p>Loading...</p>;

  return (
    <div className="">
      <h1>{account.account_name} Details</h1>
      <button className="delete-button" onClick={deleteAccount}>
        Delete Account
      </button>
      <button className="delete-button" onClick={returnPage}>
        Go back to Account
      </button>
    </div>
  );
}
