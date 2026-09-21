import { useState, useEffect } from "react";
import api from "../../services/api";
import "../../styles/Account.css";

export default function NetWorth() {
  const [accounts, setAccounts] = useState([]);
  const [netWorth, setNetWorth] = useState(0);

  const getSign = (netWorth) => {
    return netWorth < 0 ? "-" : "";
  };

  useEffect(() => {
    api
      .get("/api/accounts/")
      .then((res) => {
        setAccounts(res.data);

        const total = res.data.reduce(
          (sum, acc) => sum + Number(acc.current_balance),
          0,
        );

        setNetWorth(total);
      })
      .catch(() => alert("Failed to load accounts"));
  }, []);

  return (
    <div className="net-worth-container">
      <h1 className="net-worth-content">Net Worth</h1>
      <h1 className="net-worth-content">
        {getSign(netWorth)}£{Math.abs(netWorth)}
      </h1>
    </div>
  );
}
