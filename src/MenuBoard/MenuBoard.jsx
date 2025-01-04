import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import menuData from "../CashierDashboard/DataMenu"; // Simulasi data menu
import Navbar from "../Navbar/Navbar"; // Import Navbar
import Sidebar from "../Sidebar/Sidebar"; // Import Sidebar

const MenuBoard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All Menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [menu, setMenu] = useState(menuData); // Data menu
  const [filteredMenu, setFilteredMenu] = useState(menuData); // Data menu setelah filter

  useEffect(() => {
    // Ambil data pengguna dari localStorage
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
    navigate("/"); // Redirect ke login
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter menu berdasarkan pencarian dan kategori aktif
    const filtered = menu.filter(
      (item) =>
        item.name.toLowerCase().includes(query) &&
        (activeCategory === "All Menu" || item.category === activeCategory)
    );
    setFilteredMenu(filtered);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    // Filter menu berdasarkan kategori
    const filtered = menu.filter(
      (item) =>
        (category === "All Menu" ||
          item.category.toLowerCase() === category.toLowerCase()) &&
        item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredMenu(filtered);
  };

  useEffect(() => {
    // Filter ulang saat kategori aktif atau pencarian berubah
    handleCategoryClick(activeCategory);
  }, [activeCategory, searchQuery]);

  return (
    <div className="main-content menu-board container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="col-10 col-lg-11">
          {/* Navbar */}
          <Navbar
            isLoggedIn={isLoggedIn}
            username={username}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            handleLogout={handleLogout}
          />

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center p-4">
            <h2 className="fw-bold">List Menu</h2>
            <p className="text-muted mb-0">
              Total: {filteredMenu.length} Menu {/* Menampilkan total menu */}
            </p>
          </div>

          {/* Category Buttons */}
          <div className="d-flex gap-3 px-4 mb-4">
            {[
              { name: "All Menu" },
              { name: "Foods", icon: "/assets/reserve.svg" },
              { name: "Beverages", icon: "/assets/coffee.svg" },
              { name: "Dessert", icon: "/assets/cake.svg" },
            ].map((category) => (
              <button
                key={category.name}
                className={`btn d-flex align-items-center justify-content-center ${
                  activeCategory === category.name
                    ? "btn-primary text-white"
                    : "btn-outline-primary"
                }`}
                style={{
                  padding: "5px 10px",
                  width: "175px",
                  height: "55px",
                }}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.icon && (
                  <img
                    src={category.icon}
                    alt={`${category.name} Icon`}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  />
                )}
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu and Add Menu Section */}
          <div className="row px-4">
            {/* Menu List */}
            <div className="col-lg-9">
              <div
                style={{
                  maxHeight: "600px", // Untuk scroll
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {filteredMenu.map((menuItem, index) => (
                    <div
                      key={index}
                      className="col"
                      style={{ cursor: "pointer" }}
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
                          src={menuItem.image}
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

            {/* Add Menu Section */}
            <div className="col-lg-3">
              <div
                className="card p-4"
                style={{
                  height: "100%",
                  background: "#f8f9fa",
                  border: "1px dashed #ced4da",
                  textAlign: "center",
                }}
              >
                <h5 className="mb-3">Add Menu</h5>
                <button
                  className="btn btn-outline-primary"
                  style={{ fontSize: "2rem", width: "60px", height: "60px" }}
                >
                  +
                </button>
                <p className="mt-3 text-muted">Add Menu here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBoard;
