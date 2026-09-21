import { useState, useEffect } from "react";
import api from "../../services/api";
import "../../styles/Account.css";

export default function NetWorth({ accounts }) {
  const netWorth = accounts
    .filter((acc) => acc.account_type === "Internal")
    .reduce((sum, acc) => sum + Number(acc.current_balance), 0);

  return (
    <div className="net-worth-container">
      <h1 className="net-worth-content">Net Worth</h1>
      <h1 className="net-worth-content">
        {netWorth < 0 ? "-" : ""}£{Math.abs(netWorth)}
      </h1>
    </div>
  );
}
