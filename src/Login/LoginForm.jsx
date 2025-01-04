import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Simulasi daftar user dengan role
  const users = [
    {
      name: "admin",
      password: "admin123",
      role: "admin",
    },
    {
      name: "cashier",
      password: "cashier123",
      role: "cashier",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cari user yang cocok berdasarkan username dan password
    const loggedInUser = users.find(
      (user) => user.name === username && user.password === password
    );

    if (loggedInUser) {
      // Simpan user ke localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: loggedInUser.name,
          role: loggedInUser.role,
        })
      );

      // Redirect berdasarkan role
      if (loggedInUser.role === "admin") {
        navigate("/dashboard"); // Redirect ke admin dashboard
      } else if (loggedInUser.role === "cashier") {
        navigate("/cashier-dashboard"); // Redirect ke cashier dashboard
      }
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div
      className="login-container d-flex align-items-center vh-100"
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
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="mb-3" />
            <h3 className="fw-bold">Welcome Back!</h3>
            <p className="text-muted">
              Please enter your username and password here!
            </p>
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
            <div className="mb-3 position-relative">
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
              <Link
                to="/reset"
                className="text-decoration-none"
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "0px",
                  fontSize: "0.8rem",
                  color: "gray",
                }}
              >
                Forget Password?
              </Link>
            </div>
            {/* Add margin-top to the button to move it down */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ marginTop: "20px" }}
            >
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-0">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary text-decoration-none"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
