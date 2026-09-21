import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <NavLink className="nav-list" to="/home">
        Home
      </NavLink>
      <NavLink className="nav-list" to="/accounts">
        Accounts
      </NavLink>
      <NavLink className="nav-list" to="/transactions">
        Transactions
      </NavLink>
      <NavLink className="nav-list" to="/logout">
        Logout
      </NavLink>
    </nav>
  );
}
