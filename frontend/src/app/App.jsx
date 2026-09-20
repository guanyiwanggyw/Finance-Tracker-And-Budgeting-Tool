import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { clearAuthTokens } from "../services/auth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Account from "../pages/Accounts";
import Transaction from "../pages/Transactions";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import AccountDetails from "../features/accounts/AccountDetails";

function Logout() {
  clearAuthTokens();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  clearAuthTokens();
  return <Register to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route path="/accounts/:id" element={<AccountDetails />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
