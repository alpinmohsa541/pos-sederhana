import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Import komponen Navbar
import Sidebar from "../Sidebar/Sidebar"; // Import komponen Sidebar

const CashierDashboard = () => {
  // State untuk autentikasi dan user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // State untuk filter dan pencarian menu
  const [activeButton, setActiveButton] = useState("All Menu");
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk order dan pembayaran
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderType, setOrderType] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [note, setNote] = useState("");
  const [customerName, setCustomerName] = useState(""); // Nama pelanggan
  const [paymentNominal, setPaymentNominal] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tableNumber, setTableNumber] = useState(""); // Nomor meja untuk dine in
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);
  const [menus, setMenus] = useState([]); // Data menu yang diambil dari API

  const BASE_URL = "https://backend-pos-rho.vercel.app"; // Base URL backend

  // Ambil data user dari localStorage saat komponen pertama kali dirender
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      // Asumsikan storedUser adalah objek dengan properti username
      setUsername(storedUser.username || storedUser);
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Fetch data menu dari API saat komponen dirender
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/menus`);
        const data = await response.json();
        if (response.ok) {
          setMenus(data);
        } else {
          console.error("Failed to fetch menus:", data.message);
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/");
  };

  // Generate nomor order secara acak
  const generateOrderNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000000);
    return `ORDR#${randomNum}`;
  };

  // Set nomor order setiap kali daftar order berubah
  useEffect(() => {
    setOrderNumber(generateOrderNumber());
  }, [orders]);

  // Hitung total order (subtotal + tax)
  useEffect(() => {
    const calculatedSubtotal = orders.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0
    );
    const calculatedTax = calculatedSubtotal * 0.1; // Pajak 10%
    const totalAmount = calculatedSubtotal + calculatedTax;
    setTotal(totalAmount);
  }, [orders]);

  // Ganti kategori menu yang aktif
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // Fungsi untuk memproses pembayaran
  const handlePayment = () => {
    if (paymentNominal >= total) {
      const calculatedSubtotal = orders.reduce(
        (acc, order) => acc + order.price * order.quantity,
        0
      );
      const calculatedTax = calculatedSubtotal * 0.1;
      const calculatedTotal = calculatedSubtotal + calculatedTax;
      const calculatedChange = paymentNominal - calculatedTotal;

      setSubtotal(calculatedSubtotal);
      setTax(calculatedTax);
      setReceivedAmount(paymentNominal);
      setChangeAmount(calculatedChange);

      setShowSuccessModal(true);

      // Reset order dan input nominal
      setOrders([]);
      setPaymentNominal(0);
      setTotal(0);
    } else {
      alert("Insufficient payment!");
    }
  };

  // Update query pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Tambahkan order ke dalam daftar order
  const handleAddOrder = (newOrder) => {
    const existingOrder = orders.find((order) => order.id === newOrder.id);
    if (existingOrder) {
      setOrders(
        orders.map((order) =>
          order.id === newOrder.id
            ? { ...order, quantity: order.quantity + 1 }
            : order
        )
      );
    } else {
      setOrders([
        ...orders,
        { ...newOrder, quantity: 1, price: newOrder.price || 0 },
      ]);
    }
  };

  // Fungsi untuk menambah kuantitas order
  const handleIncreaseOrder = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, quantity: order.quantity + 1 }
          : order
      )
    );
  };

  // Fungsi untuk mengurangi kuantitas order
  const handleDecreaseOrder = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId && order.quantity > 1
          ? { ...order, quantity: order.quantity - 1 }
          : order
      )
    );
  };

  // Fungsi untuk menghapus order
  const handleRemoveOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  // Update tipe order (Dine In atau Take Away)
  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  // Tampilkan modal input catatan jika order type adalah Take Away,
  // atau langsung tambahkan order jika tipe Dine In
  const handleShowModalOrAddOrder = (menu) => {
    if (!orderType) {
      alert("Please select 'Dine In' or 'Take Away' first!");
      return;
    }

    if (orderType === "dineIn") {
      handleAddOrder(menu);
    } else {
      setSelectedMenu(menu);
      setShowModal(true);
    }
  };

  // Tutup modal catatan
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMenu(null);
    setNote("");
  };

  // Tambahkan order dari modal catatan
  const handleSubmitToOrder = () => {
    if (selectedMenu) {
      const menuWithNote = { ...selectedMenu, note };
      handleAddOrder(menuWithNote);
      handleCloseModal();
    }
  };

  // Fungsi untuk memformat harga ke format Rupiah
  const formatPriceToIDR = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  // Filter daftar menu berdasarkan kategori dan pencarian
  const filteredMenu =
    activeButton === "All Menu"
      ? menus.filter((menu) =>
          menu.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : menus
          .filter((menu) => menu.category === activeButton)
          .filter((menu) =>
            menu.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

  return (
    <div className="main-content cashier-dashboard container-fluid p-0">
      <div className="row g-0">
        <Sidebar />

        <div className="col-12 col-lg-11">
          <Navbar
            isLoggedIn={isLoggedIn}
            username={username}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            handleLogout={handleLogout}
          />

          {/* Layout responsif menggunakan grid Bootstrap */}
          <div className="container-fluid p-4">
            <div className="row">
              {/* Section Daftar Menu */}
              <div className="col-12 col-lg-8 mb-4">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-wrap gap-3 mb-4">
                    {[
                      { name: "All Menu" },
                      { name: "Foods", icon: "/assets/reserve.svg" },
                      { name: "Beverages", icon: "/assets/coffee.svg" },
                      { name: "Dessert", icon: "/assets/cake.svg" },
                    ].map((category) => (
                      <button
                        key={category.name}
                        className={`btn d-flex align-items-center justify-content-center ${
                          activeButton === category.name
                            ? "btn-primary text-white"
                            : "btn-outline-primary"
                        }`}
                        style={{
                          padding: "5px 10px",
                          minWidth: "150px",
                          height: "55px",
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

                  {/* List Menu */}
                  <div className="position-relative">
                    <div className="mb-2">
                      <h2>List Menu</h2>
                      <span className="text-muted">
                        Total: {filteredMenu.length} Menu
                      </span>
                    </div>
                    <div
                      className="scroll-container"
                      style={{ maxHeight: "600px", overflowY: "auto" }}
                    >
                      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2">
                        {filteredMenu.map((menu) => (
                          <div
                            key={menu.id}
                            className="col"
                            onClick={() => handleShowModalOrAddOrder(menu)}
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
                                {menu.category}
                              </span>
                              <img
                                src={menu.image}
                                className="card-img-top"
                                alt={menu.name}
                                style={{ height: "100px", objectFit: "cover" }}
                              />
                              <div className="card-body">
                                <h6
                                  className="card-title"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  {menu.name}
                                </h6>
                                <p
                                  className="card-text text-muted"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {menu.description}
                                </p>
                                <p
                                  className="card-text"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  <span
                                    style={{
                                      color: "blue",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {formatPriceToIDR(menu.price)}
                                  </span>{" "}
                                  <span style={{ color: "black" }}>
                                    /portion
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Order */}
              <div className="col-12 col-lg-4">
                <div
                  className="bg-light p-4 d-flex flex-column h-100"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3>List Order</h3>
                  <p
                    className="no-order"
                    style={{ fontSize: "10px", fontFamily: "sans-serif" }}
                  >
                    No Order: {orderNumber}
                  </p>
                  <div className="mt-3 d-flex justify-content-between gap-2">
                    <button
                      className={`btn w-50 ${
                        orderType === "dineIn"
                          ? "btn-primary text-white"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleOrderTypeChange("dineIn")}
                    >
                      Dine In
                    </button>
                    <button
                      className={`btn w-50 ${
                        orderType === "takeAway"
                          ? "btn-primary text-white"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleOrderTypeChange("takeAway")}
                    >
                      Take Away
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="row g-2">
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="customerName"
                          className="form-label"
                          style={{ fontSize: "15px" }}
                        >
                          Customer Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="customerName"
                          value={customerName}
                          placeholder="Customer name"
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </div>
                      {orderType === "dineIn" && (
                        <div className="col-12 col-md-6">
                          <label
                            htmlFor="tableNumber"
                            className="form-label"
                            style={{ fontSize: "15px" }}
                          >
                            No. Table
                          </label>
                          <select
                            className="form-select"
                            id="tableNumber"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                          >
                            {[...Array(20)].map((_, index) => (
                              <option key={index} value={index + 1}>
                                Table {index + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Daftar Order */}
                  <div
                    className="list-group-container flex-grow-1 d-flex align-items-center justify-content-center mt-3"
                    style={{ overflowY: "auto", padding: "1rem" }}
                  >
                    {orders.length === 0 ? (
                      <p className="text-muted" style={{ fontSize: "1.2rem" }}>
                        No Menu Selected
                      </p>
                    ) : (
                      <ul className="list-group w-100">
                        {orders.map((order, index) => (
                          <li
                            key={index}
                            className="list-group-item d-flex align-items-center justify-content-between"
                            style={{
                              gap: "15px",
                              padding: "15px",
                              fontSize: "10px",
                              borderRadius: "10px",
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                              backgroundColor: "#f9f9f9",
                              position: "relative",
                              marginBottom: "10px",
                            }}
                          >
                            <img
                              src={order.image}
                              alt={order.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                            <div className="flex-grow-1">
                              <strong>{order.name}</strong>
                              <div className="d-flex align-items-center gap-2 mt-1">
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => handleDecreaseOrder(order.id)}
                                  disabled={order.quantity <= 1}
                                >
                                  -
                                </button>
                                <span>{order.quantity}</span>
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => handleIncreaseOrder(order.id)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <span style={{ color: "blue", fontWeight: "bold" }}>
                              {formatPriceToIDR(order.price * order.quantity)}
                            </span>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                              }}
                              onClick={() => handleRemoveOrder(order.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Ringkasan Order dan Pembayaran */}
                  <div
                    style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}
                  >
                    <div className="mt-3 d-flex justify-content-between">
                      <strong style={{ color: "#5E5E5E" }}>Subtotal:</strong>
                      <strong style={{ color: "#5E5E5E" }}>
                        {formatPriceToIDR(
                          orders.reduce(
                            (acc, order) => acc + order.price * order.quantity,
                            0
                          )
                        )}
                      </strong>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <strong style={{ color: "#5E5E5E" }}>Tax (10%):</strong>
                      <strong style={{ color: "#5E5E5E" }}>
                        {formatPriceToIDR(
                          orders.reduce(
                            (acc, order) => acc + order.price * order.quantity,
                            0
                          ) * 0.1
                        )}
                      </strong>
                    </div>
                    <hr
                      style={{ border: "1px solid #ccc", margin: "15px 0" }}
                    />
                    <div className="mt-3 d-flex justify-content-between">
                      <strong>Total:</strong>
                      <strong style={{ color: "black" }}>
                        {formatPriceToIDR(total)}
                      </strong>
                    </div>

                    {orders.length > 0 && (
                      <>
                        <div className="mt-3 d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => setPaymentNominal(50000)}
                          >
                            50.000
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => setPaymentNominal(75000)}
                          >
                            75.000
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => setPaymentNominal(100000)}
                          >
                            100.000
                          </button>
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="paymentInput"
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            Enter Nominal Here:
                          </label>
                          <input
                            type="number"
                            id="paymentInput"
                            className="form-control mt-2"
                            placeholder="Enter nominal here..."
                            value={paymentNominal}
                            onChange={(e) =>
                              setPaymentNominal(Number(e.target.value))
                            }
                          />
                        </div>
                        <button
                          className="btn btn-primary w-100 mt-4"
                          onClick={handlePayment}
                          disabled={paymentNominal < total}
                        >
                          Pay
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Success Payment */}
      {showSuccessModal && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog"
            style={{
              maxWidth: "410px",
              borderRadius: "10px",
              margin: "10% auto",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Transaction Success</h5>
                <button
                  type="button"
                  className="btn-close"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowSuccessModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>No Order:</strong> {orderNumber}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date().toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Customer Name:</strong> {customerName}
                </p>
                <p>
                  <strong>Order Type:</strong>{" "}
                  {orderType === "dineIn" ? "Dine-in" : "Take-away"}
                </p>
                {orderType === "dineIn" && (
                  <p>
                    <strong>Table:</strong> {tableNumber}
                  </p>
                )}
                <hr />
                {orders.map((order, index) => (
                  <div key={index} className="d-flex justify-content-between">
                    <span>
                      {order.quantity} x {order.name}
                    </span>
                    <span>
                      {formatPriceToIDR(order.price * order.quantity)}
                    </span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Sub Total:</strong>
                  <span>{formatPriceToIDR(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Tax:</strong>
                  <span>{formatPriceToIDR(tax)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong style={{ fontSize: "1.2rem" }}>
                    {formatPriceToIDR(subtotal + tax)}
                  </strong>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <strong>Diterima:</strong>
                  <span>{formatPriceToIDR(receivedAmount)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Kembalian:</strong>
                  <span>{formatPriceToIDR(changeAmount)}</span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => {
                    setShowSuccessModal(false);
                    alert("Printing receipt...");
                  }}
                >
                  Print Struk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Order (Input Catatan) */}
      {showModal && selectedMenu && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: "500px", margin: "10% auto" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMenu.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedMenu.image}
                  alt={selectedMenu.name}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <p>{selectedMenu.description}</p>
                <p>
                  <strong>Price:</strong> {formatPriceToIDR(selectedMenu.price)}
                </p>
                <div className="mb-3">
                  <label htmlFor="note" className="form-label">
                    Add a note (optional):
                  </label>
                  <textarea
                    id="note"
                    className="form-control"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={handleSubmitToOrder}
                >
                  Submit to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierDashboard;
