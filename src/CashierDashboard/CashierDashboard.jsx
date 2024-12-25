import "../App.css";
import { useState } from "react";

const CashierDashboard = () => {
  const [activeButton, setActiveButton] = useState("All Menu");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-1 bg-light vh-100 d-flex flex-column align-items-center p-3">
          {/* Logo */}
          <div
            className="rounded-circle text-white d-flex justify-content-center align-items-center mb-5"
            style={{
              width: "60px",
              height: "60px",
              fontSize: "2rem",
              background: "linear-gradient(135deg, #3572EF, #4C3BCF)",
            }}
          >
            P
          </div>

          {/* Arrow Right Circle Icon with Border */}
          <div className="arrow-right-icon mb-5">
            <i
              className="bi bi-arrow-right-circle"
              style={{ fontSize: "1.5rem", color: "#6392F3" }}
            ></i>
          </div>

          {/* Shop Icon */}
          <div className="mb-5" title="Shop">
            <img
              src="/assets/shop.svg"
              alt="Shop Icon"
              style={{ width: "30px", height: "30px" }}
            />
          </div>

          {/* Clipboard Icon */}
          <div className="mb-5" title="clipboard-text">
            <img
              src="/assets/clipboard-text.svg"
              alt="clipboard"
              style={{ width: "30px", height: "30px" }}
            />
          </div>

          {/* Setting Icon */}
          <div className="mb-5" title="setting">
            <img
              src="/assets/setting-2.svg"
              alt="setting"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-11">
          {/* Navbar */}
          <nav
            className="navbar navbar-expand-lg navbar-light bg-light px-4"
            style={{ width: "100%", height: "80px" }}
          >
            <div className="container-fluid">
              {/* Search Bar */}
              <form className="d-flex me-auto" style={{ width: "450px" }}>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i
                      className="bi bi-search"
                      style={{ fontSize: "1.2rem", color: "#6392F3" }}
                    ></i>
                  </span>
                  <input
                    className="form-control border-start-0"
                    type="search"
                    placeholder="Enter the keyword here..."
                    aria-label="Search"
                  />
                </div>
              </form>

              {/* Order Archive */}
              <div className="d-flex align-items-center me-4">
                <img
                  src="/assets/archive-add.svg"
                  alt="Order Archive Icon"
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                />
                <span style={{ padding: "10px" }}>Order Archive</span>
              </div>

              {/* Profile and Logout */}
              <div className="d-flex align-items-center">
                <img
                  src="/assets/profile.svg"
                  className="profile me-2"
                  style={{
                    fontSize: "60px",
                    padding: "5px",
                    color: "#6392F3",
                  }}
                ></img>
                <div className="d-flex flex-column">
                  <span className="me-3" style={{ fontSize: "1.2rem" }}>
                    John Doe
                  </span>
                  <small style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                    Cashier
                  </small>
                </div>
                <img
                  src="/assets/logout.svg"
                  alt="logout Icon"
                  className="bi bi-box-arrow-right ms-3"
                  style={{ width: "24px" }}
                ></img>
              </div>
            </div>
          </nav>

          {/* Category Buttons with Icons */}
          <div className="d-flex justify-content-start gap-3 p-4">
            {[
              { name: "All Menu" },
              { name: "Food", icon: "/assets/reserve.svg" },
              { name: "Beverages", icon: "/assets/coffee.svg" },
              { name: "Dessert", icon: "/assets/cake.svg" },
            ].map((category) => (
              <button
                key={category.name}
                className={`btn btn-category d-flex align-items-center justify-content-center ${
                  activeButton === category.name ? "active" : ""
                }`}
                style={{
                  padding: "5px 10px",
                  width: "175px",
                  height: "55px",
                  borderColor: "#C4C4C4",
                }}
                onClick={() => handleButtonClick(category.name)}
              >
                <img
                  src={category.icon}
                  alt={`${category.name} Icon`}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "8px",
                  }}
                />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
