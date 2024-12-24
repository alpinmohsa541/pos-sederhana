import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/LoginForm'; // Sesuaikan path jika berbeda
import Register from './Register/RegisterForm'; // Sesuaikan path jika berbeda
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk halaman Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Route untuk halaman Register */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
