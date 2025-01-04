import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";

function EmailForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email for password reset:", email);
    // Tambahkan logika untuk memvalidasi email atau mengirim email di sini
    navigate("/reset-password"); // Redirect ke halaman reset password
  };

  return (
    <div
      className="reset-password-container d-flex align-items-center vh-100"
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
            <h3 className="fw-bold">Reset Your Password</h3>
            <p className="text-muted">
              Please enter your registered email here!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
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
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-0">
              Remembered your password?{" "}
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

export default EmailForm;
