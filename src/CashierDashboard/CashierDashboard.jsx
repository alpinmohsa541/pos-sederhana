import "../App.css";
import { useState, useEffect } from "react";
import menuData from "./DataMenu";

const CashierDashboard = () => {
  const [activeButton, setActiveButton] = useState("All Menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]); // State to hold the orders
  const [total, setTotal] = useState(0); // State to hold the total amount for payment
  const [orderType, setOrderType] = useState(""); // State to manage "Dine In" or "Take Away"
  const [orderNumber, setOrderNumber] = useState(""); // State for storing order number

  // Generate random order number function
  const generateOrderNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000000); // Generates a random number
    return `ORDR#${randomNum}`;
  };

  // Set the order number when the component mounts or after an order is selected
  useEffect(() => {
    setOrderNumber(generateOrderNumber()); // Generate a random order number on mount
  }, [orders]); // Update when orders change

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToOrder = (menu) => {
    setOrders([...orders, menu]); // Add menu item to orders
    setTotal(total + menu.price); // Update total price
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type); // Set the order type (Dine In or Take Away)
  };

  const filteredMenu =
    activeButton === "All Menu"
      ? menuData.filter((menu) =>
          menu.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : menuData
          .filter((menu) => menu.category === activeButton)
          .filter((menu) =>
            menu.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-1 bg-light vh-100 d-flex flex-column align-items-center p-3">
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

          <div className="arrow-right-icon mb-5">
            <i
              className="bi bi-arrow-right-circle"
              style={{ fontSize: "1.5rem", color: "#6392F3" }}
            ></i>
          </div>

          {[
            { src: "/assets/shop.svg", alt: "Shop Icon", title: "Shop" },
            {
              src: "/assets/clipboard-text.svg",
              alt: "Clipboard",
              title: "Clipboard",
            },
            { src: "/assets/setting-2.svg", alt: "Setting", title: "Setting" },
          ].map((icon, index) => (
            <div key={index} className="mb-5" title={icon.title}>
              <img
                src={icon.src}
                alt={icon.alt}
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="col-md-11">
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
                    value={searchQuery}
                    onChange={handleSearchChange}
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
                  className="profile me-2"
                  alt="Profile Icon"
                  style={{ fontSize: "60px", padding: "5px", color: "#6392F3" }}
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

          <div className="row g-4 px-4">
            <h2>List Menu</h2>
            <div
              className="position-absolute"
              style={{
                left: "1030px",
                fontSize: "1rem",
                padding: "5px 10px",
                borderRadius: "5px",
                color: "#6c757d",
              }}
            >
              Total: {filteredMenu.length} Menu
            </div>
            <div className="col-md-9">
              <div className="row g-4">
                {filteredMenu.map((menu) => (
                  <div key={menu.id} className="col-md-4">
                    <div className="card h-100">
                      <span
                        className="badge bg-primary"
                        style={{
                          fontSize: "0.8rem",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          zIndex: "10",
                        }}
                      >
                        {menu.category}
                      </span>
                      <img
                        src={menu.image}
                        className="card-img-top"
                        alt={menu.name}
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{menu.name}</h5>
                        <p className="card-text text-muted">
                          {menu.description}
                        </p>
                        <p className="card-text text-primary">
                          {menu.price} /portion
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToOrder(menu)}
                        >
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-3">
              <div className="bg-light p-4">
                <h3>List Order</h3>
                <p
                  className="no-order"
                  style={{
                    fontSize: "10px",
                    fontFamily: "sans-serif",
                  }}
                >
                  {"No Order"}&nbsp;{orderNumber}{" "}
                  {/* Display the random order number */}
                </p>

                {/* Dine In and Take Away Buttons */}
                <div className="mt-3 d-flex justify-content-between gap-2">
                  <button
                    className="btn btn-outline-primary w-50"
                    onClick={() => handleOrderTypeChange("dineIn")}
                  >
                    Dine In
                  </button>
                  <button
                    className="btn btn-outline-primary w-50"
                    onClick={() => handleOrderTypeChange("takeAway")}
                  >
                    Take Away
                  </button>
                </div>

                {/* Conditional Rendering for Customer Name and Table Number */}
                <div className="mt-3">
                  <div className="mb-3 w-100">
                    <label
                      style={{ fontSize: "15px" }}
                      htmlFor="customerName"
                      className="form-label"
                    >
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerName"
                      placeholder="Customer name"
                      style={{ fontSize: "15px" }}
                    />
                  </div>

                  {orderType === "dineIn" && (
                    <div className="mb-3 w-100">
                      <label
                        style={{ fontSize: "15px" }}
                        htmlFor="tableNumber"
                        className="form-label"
                      >
                        No. Table
                      </label>
                      <select className="form-select" id="tableNumber">
                        {[...Array(20)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            Table {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Orders List */}
                <ul className="list-group">
                  {orders.map((order, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{order.name}</span>
                      <span>{order.price}</span>
                    </li>
                  ))}
                </ul>

                {/* Total */}
                <div className="mt-3 d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>{total}</strong>
                </div>

                {/* Complete Payment Button */}
                <button className="btn btn-success w-100 mt-3">
                  Complete Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
