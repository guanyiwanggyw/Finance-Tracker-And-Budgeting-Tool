import LogoutButton from "../components/LogoutButton";
import Navbar from "../components/NavBar";
import "../styles/Home.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <p>Budgeting Overview</p>
      <LogoutButton />
    </div>
  );
}
