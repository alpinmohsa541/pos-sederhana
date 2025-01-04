import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [status, setStatus] = useState("Active");
  const [language, setLanguage] = useState("English");
  const [role, setRole] = useState("Cashier");
  const [preferenceMode, setPreferenceMode] = useState("Light Mode");
  const [fontSize, setFontSize] = useState("16 px");
  const [zoomDisplay, setZoomDisplay] = useState("100 (Normal)");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    } else {
      navigate("/"); // Redirect ke login jika belum login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/");
  };

  const handleSaveChanges = () => {
    alert("Changes have been saved!");
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
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="rounded-circle mb-2"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  value={status}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Language</label>
                <select
                  className="form-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
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
