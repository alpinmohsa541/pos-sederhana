import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Simpan jika ingin digunakan di backend
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading
  const navigate = useNavigate(); // Untuk navigasi setelah register

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true); // Aktifkan loading
    try {
      // Kirim permintaan ke API register
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          name: username, // Menggunakan username sebagai name
          role: "cashier", // Default role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Registration successful!");
        navigate("/"); // Redirect ke halaman login
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Nonaktifkan loading
    }
  };

  return (
    <div
      className="register-container d-flex align-items-center vh-100"
      style={{
        backgroundImage: "url(/assets/cover-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div
        className="card shadow"
        style={{ marginLeft: "20%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <div className="card-body p-4" style={{ width: "400px" }}>
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="mb-3" />
            <h3 className="fw-bold">Welcome Back!</h3>
            <p className="text-muted">Create your account here!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading} // Disable tombol saat loading
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-0">
              Already have an account?{" "}
              <Link to="/" className="text-primary text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
