import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
// import './LoginForm.css'; // Tambahkan file CSS untuk styling tambahan

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Tambahkan logika untuk autentikasi di sini
  };

  return (
    <div className="login-container d-flex  align-items-center vh-100" style={{ backgroundImage: 'url(D:/4. Sinau Project/pos-sederhana/src/assets/KRanYO83.png)', backgroundSize: '100% 100%', backgroundPosition: 'center',  }}>
      <div className="card shadow" style={{ marginLeft: '20%',maxWidth: '400px', borderRadius: '15px' }}>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="mb-3" />
            <h3 className="fw-bold">Welcome Back!</h3>
            <p className="text-muted">Please enter your username and password here</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Username</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Username"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-end mt-1">
                <a href="#" className="text-decoration-none">Forgot Password?</a>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-0">
              Don’t have an account?{' '}
              <Link to="/register" className="text-primary text-decoration-none">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
