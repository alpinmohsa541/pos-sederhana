import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/LoginForm"; // Sesuaikan path jika berbeda
import Register from "./Register/RegisterForm"; // Sesuaikan path jika berbeda
import "bootstrap/dist/css/bootstrap.min.css";
import Reset from "./ResetPassword/EmailForm";
import ResetPassword from "./ResetPassword/ResetPasswordForm";
import CashierDashboard from "./CashierDashboard/CashierDashboard";
import SalesReport from "./SalesReport/SalesReport";
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
        {/* Route untuk halaman Profile*/}
        <Route path="/sales-report" element={<SalesReport />} />
      </Routes>
    </Router>
  );
}

export default App;
