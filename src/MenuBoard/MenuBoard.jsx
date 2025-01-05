import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import AddMenuCard from "./AddMenuCard";
import DetailMenuModal from "./DetailMenuModal";

const MenuBoard = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menu, setMenu] = useState([]); // Data menu dari API
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  // Ambil data user dari localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Ambil data menu dari API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:3000/menus");
        const data = await response.json();
        if (response.ok) {
          setMenu(data);
          setFilteredMenu(data);
        } else {
          console.error("Failed to fetch menu:", data.message);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
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

    const filtered = menu.filter(
      (item) =>
        item.name.toLowerCase().includes(query) &&
        (activeCategory === "All Menu" || item.category === activeCategory)
    );
    setFilteredMenu(filtered);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    const filtered = menu.filter(
      (item) =>
        (category === "All Menu" ||
          item.category.toLowerCase() === category.toLowerCase()) &&
        item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredMenu(filtered);
  };

  useEffect(() => {
    handleCategoryClick(activeCategory);
  }, [activeCategory, searchQuery, menu]);

  const handleSaveMenu = async (updatedMenu) => {
    try {
      const response = await fetch(
        `http://localhost:3000/menus/${updatedMenu.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMenu),
        }
      );

      if (response.ok) {
        setMenu((prevMenus) =>
          prevMenus.map((menu) =>
            menu.id === updatedMenu.id ? updatedMenu : menu
          )
        );
        setNotification("Menu successfully updated!");
        setTimeout(() => setNotification(""), 3000);
      } else {
        console.error("Failed to update menu");
      }
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  const handleDeleteMenu = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/menus/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMenu((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
        setNotification("Menu successfully deleted!");
        setTimeout(() => setNotification(""), 3000);
      } else {
        console.error("Failed to delete menu");
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
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
              Total: {filteredMenu.length} Menu
            </p>
          </div>

          <div className="d-flex gap-3 px-4 mb-4">
            {[
              { name: "All Menu" },
              { name: "Foods" },
              { name: "Beverages" },
              { name: "Desserts" },
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
                {category.name}
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
                  {filteredMenu.map((menuItem) => (
                    <div
                      key={menuItem.id}
                      className="col"
                      style={{ cursor: "pointer" }}
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

            <div className="col-lg-3">
              <AddMenuCard menus={menu} setMenus={setMenu} />
            </div>
          </div>
        </div>
      </div>

      {selectedMenu && (
        <DetailMenuModal
          menu={selectedMenu}
          onClose={() => setSelectedMenu(null)}
          onSave={handleSaveMenu}
          onDelete={handleDeleteMenu}
        />
      )}
    </div>
  );
};

export default MenuBoard;
