import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/LoginForm"; // Sesuaikan path jika berbeda
import Register from "./Register/RegisterForm"; // Sesuaikan path jika berbeda
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Reset from "./ResetPassword/EmailForm";
import ResetPassword from "./ResetPassword/ResetPasswordForm";
import CashierDashboard from "./CashierDashboard/CashierDashboard";
import SalesReport from "./SalesReport/SalesReport";
import Profile from "./Profile/Profile"; // Import Profile page
import Dashboard from "./Dashboard/Dashboard";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk halaman Login */}
        <Route path="/" element={<Login />} />
        {/* Route untuk halaman cashier dashboard */}
        <Route path="/cashier-dashboard" element={<CashierDashboard />} />
        {/* Route untuk halaman Register */}
        <Route path="/register" element={<Register />} />
        {/* Route untuk halaman email to reset password */}
        <Route path="/reset" element={<Reset />} />
        {/* Route untuk halaman reset password */}
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Route untuk halaman Sales Report */}
        <Route path="/sales-report" element={<SalesReport />} />
        {/* Route untuk halaman Profile */}
        <Route path="/profile" element={<Profile />} />
        {/* Route untuk halaman dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
