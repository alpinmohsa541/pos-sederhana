import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  // Base URL untuk backend
  const BASE_URL = "http://localhost:3000"; // Ganti dengan base URL backend Anda

  // Ambil data pengguna yang disimpan di local storage ketika komponen dimuat
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

  // Ambil data menu dari API ketika komponen dimuat
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/menus");
        const data = await response.json();
        if (response.ok) {
          setMenus(data);
          setFilteredMenus(data); // Set filtered menu sama dengan data awal
        } else {
          console.error("Failed to fetch menus:", data.message);
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data pengguna
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/"); // Redirect ke halaman login
  };

  // Handle search change
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

  // Handle category filter
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

  return (
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
                      key={menuItem.menu_id}
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
                              ? `${BASE_URL}${menuItem.image}`
                              : `${BASE_URL}/assets/default-image.jpg`
                          } // Tampilkan gambar dari API atau gambar default
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
              <AddMenuCard menus={menus} setMenus={setMenus} />
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
  );
};

export default MenuBoard;
