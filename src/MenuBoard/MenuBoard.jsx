import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group"; // Import CSSTransition
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import AddMenuCard from "./AddMenuCard";
import DetailMenuModal from "./DetailMenuModal";
import "../App.css";

const MenuBoard = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "https://backend-pos-rho.vercel.app"; // Ganti dengan base URL backend Anda

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    } else {
      navigate("/"); // Redirect ke halaman login jika belum login
    }
  }, [navigate]);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/menus`);
      const data = await response.json();
      if (response.ok) {
        setMenus(data);
        setFilteredMenus(data); // Set filtered menus sama dengan data awal
      } else {
        console.error("Failed to fetch menus:", data.message);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = menus.filter(
      (item) =>
        item.name.toLowerCase().includes(query) &&
        (activeCategory === "All Menu" || item.category === activeCategory)
    );
    setFilteredMenus(filtered);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const filtered = menus.filter(
      (item) =>
        (category === "All Menu" ||
          item.category.toLowerCase() === category.toLowerCase()) &&
        item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredMenus(filtered);
  };

  const handleMenuAdded = () => {
    setTimeout(() => {
      setNotification("");
      fetchMenus(); // Refresh data after notification closed
    }, 1000);
  };

  return (
    <CSSTransition
      in={true} // Ensure it’s always in the transition state
      timeout={300} // Duration of the transition
      classNames="fade" // CSS class to define transitions
      unmountOnExit
    >
      <div className="main-content menu-board container-fluid p-0">
        <div className="row g-0">
          <Sidebar />
          <div className="col-10 col-lg-11">
            <Navbar
              isLoggedIn={isLoggedIn}
              username={username}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              handleLogout={handleLogout}
            />

            {notification && (
              <div
                className="alert alert-success position-fixed"
                style={{
                  top: "80px",
                  right: "20px",
                  zIndex: 1050,
                  minWidth: "250px",
                }}
              >
                {notification}
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center p-4">
              <h2 className="fw-bold">List Menu</h2>
              <p className="text-muted mb-0" style={{ marginRight: "380px" }}>
                Total: {filteredMenus.length} Menus
              </p>
            </div>

            <div className="d-flex gap-3 px-4 mb-4">
              {["All Menu", "Foods", "Beverages", "Desserts"].map((category) => (
                <button
                  key={category}
                  className={`btn ${
                    activeCategory === category
                      ? "btn-primary text-white"
                      : "btn-outline-primary"
                  }`}
                  style={{ padding: "5px 10px", width: "175px", height: "55px" }}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="row px-4">
              <div className="col-lg-9">
                <div
                  style={{
                    maxHeight: "600px",
                    overflowY: "auto",
                    paddingRight: "10px",
                  }}
                >
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {filteredMenus.map((menuItem) => (
                      <div
                        key={menuItem._id}
                        className="col"
                        onClick={() => setSelectedMenu(menuItem)}
                      >
                        <div className="card h-100">
                          <span
                            className="badge bg-primary"
                            style={{
                              fontSize: "0.7rem",
                              padding: "3px 8px",
                              borderRadius: "20px",
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              zIndex: "10",
                            }}
                          >
                            {menuItem.category}
                          </span>
                          <img
                            src={
                              menuItem.image
                                ? menuItem.image // Gunakan URL lengkap dari API
                                : `${BASE_URL}/assets/default-image.jpg`
                            }
                            className="card-img-top"
                            alt={menuItem.name}
                            style={{ height: "150px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{menuItem.name}</h5>
                            <p className="card-text text-muted">
                              {menuItem.description}
                            </p>
                            <p className="card-text">
                              <span
                                style={{
                                  color: "#3572EF",
                                  fontWeight: "bold",
                                  fontSize: "1rem",
                                }}
                              >
                                Rp {menuItem.price.toLocaleString("id-ID")}
                              </span>{" "}
                              <span style={{ color: "black" }}>/portion</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <AddMenuCard
                  menus={menus}
                  setMenus={setMenus}
                  onMenuAdded={handleMenuAdded}
                />
              </div>
            </div>
          </div>
        </div>

        {selectedMenu && (
          <DetailMenuModal
            menu={selectedMenu}
            onClose={() => setSelectedMenu(null)}
          />
        )}
      </div>
    </CSSTransition>
  );
};

export default MenuBoard;
