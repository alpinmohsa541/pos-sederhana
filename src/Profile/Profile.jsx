import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [preferenceMode, setPreferenceMode] = useState("Light Mode");
  const [fontSize, setFontSize] = useState("16 px");
  const [zoomDisplay, setZoomDisplay] = useState("100 (Normal)");

  const navigate = useNavigate();

  // Ambil data dari localStorage saat komponen dimuat

  useEffect(() => {
    // Simulasi autentikasi pengguna
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    } else {
      navigate("/"); // Redirect ke login jika belum login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data pengguna
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/"); // Redirect ke halaman login
  };

  const handleSaveChanges = () => {
    // Perbarui localStorage dengan data yang diubah
    const updatedUser = { ...user };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile changes have been saved!");
  };

  return (
    <div className="main-content d-flex vh-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <Navbar
          isLoggedIn={isLoggedIn}
          username={username}
          handleLogout={handleLogout}
        />

        {/* Content */}
        <div
          className="p-4"
          style={{
            marginTop: "80px", // Geser ke bawah agar tidak menumpuk dengan navbar
          }}
        >
          <h3 className="mb-4">Settings</h3>

          <div className="card p-4">
            {/* Account Section */}
            <h5>Account</h5>
            <div className="row mb-3 align-items-center">
              <div className="col-md-3 d-flex flex-column align-items-center">
                <img
                  src="/assets/profile.svg"
                  alt="profile"
                  className="rounded-circle"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    background: "#f0f0f0",
                  }}
                />
              </div>
              <div className="col-md-9 d-flex flex-column justify-content-center">
                <div className="d-flex">
                  <button className="btn btn-primary btn-sm me-2">
                    Change Picture
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    Delete Picture
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={user.email}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.name}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.role}
                  readOnly
                />
              </div>
            </div>

            {/* Password Section */}
            <h5>Password</h5>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" />
            </div>
            <button className="btn btn-primary btn-sm mb-4">
              Change Password
            </button>

            {/* Appearance Section */}
            <h5>Appearance</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Preference Mode</label>
                <select
                  className="form-select"
                  value={preferenceMode}
                  onChange={(e) => setPreferenceMode(e.target.value)}
                >
                  <option>Light Mode</option>
                  <option>Dark Mode</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Font Size</label>
                <select
                  className="form-select"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                >
                  <option>14 px</option>
                  <option>16 px</option>
                  <option>18 px</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Zoom Display</label>
                <select
                  className="form-select"
                  value={zoomDisplay}
                  onChange={(e) => setZoomDisplay(e.target.value)}
                >
                  <option>100 (Normal)</option>
                  <option>125 (Zoomed In)</option>
                  <option>75 (Zoomed Out)</option>
                </select>
              </div>
            </div>

            {/* Save Changes */}
            <button
              className="btn btn-primary"
              onClick={handleSaveChanges}
              disabled={!isLoggedIn}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
