import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 border-b bg-white">
      <Link to="/home">Home</Link>
      <Link to="/account">Account</Link>
      <Link to="/transaction">Transaction</Link>
    </nav>
  );
}
