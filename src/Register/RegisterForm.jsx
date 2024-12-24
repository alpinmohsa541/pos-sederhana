import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    // Tambahkan logika untuk registrasi di sini
  };

  return (
    <div
      className="register-container d-flex align-items-center vh-100"
      style={{
        backgroundImage: 'url(D:/4. Sinau Project/pos-sederhana/src/assets/KRanYO83.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      <div className="card shadow" style={{ marginLeft: '20%', maxWidth: '400px', borderRadius: '15px' }}>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="mb-3" />
            <h3 className="fw-bold">Create an Account</h3>
            <p className="text-muted">Fill in the details below to register</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
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
              <label htmlFor="email" className="form-label">Email</label>
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
              <label htmlFor="password" className="form-label">Password</label>
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
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
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
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          {/* <div className="text-center mt-3">
            <p className="mb-0">Already have an account? <a href="#" className="text-primary text-decoration-none">Login</a></p>
          </div> */}
          <div className="text-center mt-3">
            <p className="mb-0">
            Already have an account?{' '}
              <Link to="/login" className="text-primary text-decoration-none">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
