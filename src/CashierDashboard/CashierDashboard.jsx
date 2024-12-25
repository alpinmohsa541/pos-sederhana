import "../App.css";
import { useState } from "react";
import menuData from "./DataMenu";

const CashierDashboard = () => {
  const [activeButton, setActiveButton] = useState("All Menu");
  const [orders, setOrders] = useState([]); // Tambahkan state untuk daftar pesanan

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // Tambahkan menu ke daftar pesanan
  const addToOrder = (menu) => {
    setOrders((prevOrders) => [...prevOrders, menu]);
  };

  // Hapus menu dari daftar pesanan
  const removeFromOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  // Filter menu berdasarkan kategori yang aktif
  const filteredMenu =
    activeButton === "All Menu"
      ? menuData
      : menuData.filter((menu) => menu.category === activeButton);

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
          {/* Icons */}
          <div className="arrow-right-icon mb-5">
            <i
              className="bi bi-arrow-right-circle"
              style={{ fontSize: "1.5rem", color: "#6392F3" }}
            ></i>
          </div>
          <div className="mb-5" title="Shop">
            <img
              src="/assets/shop.svg"
              alt="Shop Icon"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
          <div className="mb-5" title="clipboard-text">
            <img
              src="/assets/clipboard-text.svg"
              alt="clipboard"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
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
            style={{ height: "80px" }}
          >
            <div className="container-fluid">
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
              <div className="d-flex align-items-center me-4">
                <img
                  src="/assets/archive-add.svg"
                  alt="Order Archive Icon"
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                />
                <span style={{ padding: "10px" }}>Order Archive</span>
              </div>
              <div className="d-flex align-items-center">
                <img
                  src="/assets/profile.svg"
                  alt="Profile Icon"
                  style={{ fontSize: "60px", padding: "5px" }}
                />
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
                  alt="Logout Icon"
                  className="ms-3"
                  style={{ width: "24px" }}
                />
              </div>
            </div>
          </nav>

          <div className="row">
            {/* Menu List */}
            <div className="col-md-8">
              <div className="row g-4 px-4">
                {filteredMenu.slice(0, 16).map((menu) => (
                  <div key={menu.id} className="col-md-3 d-flex">
                    <div className="card h-100 w-100">
                      <img
                        src={menu.image}
                        className="card-img-top"
                        alt={menu.name}
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{menu.name}</h5>
                        <p className="card-text text-muted">
                          {menu.description}
                        </p>
                        <p className="card-text text-primary">
                          {menu.price} /portion
                        </p>
                        <button
                          className="btn btn-primary mt-auto"
                          onClick={() => addToOrder(menu)}
                        >
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order List */}
            <div className="col-md-4">
              <h4 className="mb-3">Order List</h4>
              <div className="card">
                <div className="card-body">
                  {orders.length === 0 ? (
                    <p className="text-muted">No items in the order.</p>
                  ) : (
                    <ul className="list-group">
                      {orders.map((order, index) => (
                        <li
                          key={index}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>{order.name}</span>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeFromOrder(index)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
