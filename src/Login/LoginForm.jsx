import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Aktifkan state loading

    try {
      // Kirim permintaan ke API login
      const response = await fetch("https://backend-pos-rho.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Kirim data login
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan user ke localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.name,
            role: data.role,
          })
        );

        // Redirect berdasarkan role
        if (data.role === "admin") {
          navigate("/dashboard"); // Redirect ke admin dashboard
        } else if (data.role === "cashier") {
          navigate("/cashier-dashboard"); // Redirect ke cashier dashboard
        }
      } else {
        alert(data.message || "Invalid username or password!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Nonaktifkan state loading
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
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ marginTop: "20px" }}
              disabled={loading} // Disable tombol saat loading
            >
              {loading ? "Logging in..." : "Login"}
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
