import "../App.css";
import { useState, useEffect } from "react";
import menuData from "./DataMenu";

const CashierDashboard = () => {
  const [activeButton, setActiveButton] = useState("All Menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderType, setOrderType] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderArchive, setOrderArchive] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [note, setNote] = useState("");
  const [customerName, setCustomerName] = useState(""); // Tambahkan state untuk customerName
  const [paymentNominal, setPaymentNominal] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tableNumber, setTableNumber] = useState(""); // State untuk menyimpan nomor meja
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);

  const generateOrderNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000000);
    return `ORDR#${randomNum}`;
  };

  useEffect(() => {
    setOrderNumber(generateOrderNumber());
  }, [orders]);

  useEffect(() => {
    const subtotal = orders.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    const totalAmount = subtotal + tax;

    setTotal(totalAmount); // Set total ke state
  }, [orders]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handlePayment = () => {
    if (paymentNominal >= total) {
      // Hitung subtotal dan tax
      const calculatedSubtotal = orders.reduce(
        (acc, order) => acc + order.price * order.quantity,
        0
      );
      const calculatedTax = calculatedSubtotal * 0.1;
      const calculatedTotal = calculatedSubtotal + calculatedTax;

      // Hitung kembalian
      const calculatedChange = paymentNominal - calculatedTotal;

      // Simpan nilai ke state
      setSubtotal(calculatedSubtotal); // Simpan Subtotal
      setTax(calculatedTax); // Simpan Tax
      setReceivedAmount(paymentNominal); // Simpan nilai Diterima
      setChangeAmount(calculatedChange); // Simpan Kembalian

      // Tampilkan modal sukses
      setShowSuccessModal(true);

      // Reset state utama
      setOrders([]);
      setPaymentNominal(0);
      setTotal(0);
    } else {
      alert("Insufficient payment!");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
        { ...newOrder, quantity: 1, price: newOrder.price || 0 }, // Pastikan price ada
      ]);
    }
  };

  const handleIncreaseOrder = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, quantity: order.quantity + 1 }
          : order
      )
    );
  };
  const handleRemoveOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  const handleDecreaseOrder = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId && order.quantity > 1
          ? { ...order, quantity: order.quantity - 1 }
          : order
      )
    );
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handleArchiveOrder = () => {
    if (orders.length > 0) {
      setOrderArchive([...orderArchive, { orderNumber, orders, total }]);
      setOrders([]);
      setTotal(0);
    }
  };

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

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMenu(null);
    setNote("");
  };

  const handleSubmitToOrder = () => {
    if (selectedMenu) {
      const menuWithNote = { ...selectedMenu, note };
      handleAddOrder(menuWithNote);
      handleCloseModal();
    }
  };

  const formatPriceToIDR = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

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
        <div className="col-2 col-lg-1 bg-light vh-100 d-flex flex-column align-items-center p-3">
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
                className="img-fluid" // Menggunakan img-fluid agar responsif
                style={{ maxWidth: "30px", maxHeight: "30px" }}
              />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="col-10 col-lg-11">
          <nav
            className="navbar navbar-expand-lg navbar-light bg-light px-4"
            style={{ height: "80px" }}
          >
            <div className="container-fluid">
              {/* Search bar */}
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
          <div className="d-flex justify-content-between p-4 align-items-start">
            {/* Kategori Menu */}
            <div className="flex-grow-1 me-4">
              <div className="d-flex gap-3 mb-4">
                {[
                  { name: "All Menu" },
                  { name: "Food", icon: "/assets/reserve.svg" },
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
                      width: "175px",
                      height: "55px",
                      marginRight: "15px", // Menambahkan jarak 15px antara menu
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

              {/* Menu List */}
              <div className="row g-4 px-4">
                <h2>List Menu</h2>
                <div
                  className="position-absolute"
                  style={{
                    left: "780px",
                    fontSize: "1rem",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    color: "#6c757d",
                  }}
                >
                  Total: {filteredMenu.length} Menu
                </div>
                <div className="col-md-12">
                  {/* Container untuk scrollable list */}
                  <div
                    style={{
                      maxHeight: "600px", // Sesuaikan untuk layar kecil
                      overflowY: "auto",
                      paddingRight: "10px",
                    }}
                    className="scroll-container"
                  >
                    <div className="row row-cols-1 row-cols-md-4 g-2">
                      {filteredMenu.map((menu) => (
                        <div
                          key={menu.id}
                          className="col"
                          onClick={() => handleShowModalOrAddOrder(menu)} // Klik card langsung tambahkan menu atau tampilkan modal
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="card h-100"
                            style={{ width: "150px" }}
                          >
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
                            <div
                              className="card-body"
                              style={{ padding: "10px" }}
                            >
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
                                  style={{ color: "blue", fontWeight: "bold" }}
                                >
                                  {formatPriceToIDR(menu.price)}
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
              </div>
            </div>
            <div
              className="bg-light p-4 d-flex flex-column"
              style={{
                width: "3080px",
                height: "800px",
                borderRadius: "15px", // Tambahkan border-radius untuk sudut melengkung
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }} /* Sesuaikan ukuran yang realistis */
            >
              <h3>List Order</h3>
              <p
                className="no-order"
                style={{ fontSize: "10px", fontFamily: "sans-serif" }}
              >
                {"No Order"}&nbsp;{orderNumber}
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
                <div className="d-flex justify-content-between gap-3">
                  {/* Customer Name */}
                  <div className="w-50">
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
                      value={customerName}
                      placeholder="Customer name"
                      onChange={(e) => setCustomerName(e.target.value)} // Update state
                    />
                  </div>

                  {/* No Table */}
                  {orderType === "dineIn" && (
                    <div className="w-50">
                      <label
                        style={{ fontSize: "15px" }}
                        htmlFor="tableNumber"
                        className="form-label"
                      >
                        No. Table
                      </label>
                      <select
                        className="form-select"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)} // Update state
                        id="tableNumber"
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

              {/* Scrollable List Group */}
              <div
                className="list-group-container flex-grow-1 d-flex align-items-center justify-content-center"
                style={{
                  overflowY: "auto",
                  marginBottom: "10px",
                  paddingTop: "5cm",
                  paddingLeft: "2cm", // Tambahkan padding kiri
                  paddingRight: "2cm", // Tambahkan padding kanan
                }}
              >
                {orders.length === 0 ? (
                  <p className="text-muted" style={{ fontSize: "1.2rem" }}>
                    No Menu Selected
                  </p>
                ) : (
                  <ul className="list-group">
                    {orders.map((order, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex align-items-center justify-content-between"
                        style={{
                          gap: "15px", // Jarak antar-elemen dalam container
                          height: "110px", // Tinggi card lebih besar
                          padding: "15px", // Tambahkan padding dalam card
                          fontSize: "10px", // Ukuran teks lebih besar
                          borderRadius: "10px", // Tambahkan border-radius untuk tampilan lebih halus
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Tambahkan bayangan
                          backgroundColor: "#f9f9f9", // Warna latar belakang
                        }}
                      >
                        <img
                          src={order.image}
                          alt={order}
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
                        {/* Tampilkan harga total dengan format Rupiah */}
                        <span style={{ color: "blue", fontWeight: "bold" }}>
                          {formatPriceToIDR(order.price * order.quantity)}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-danger position-absolute"
                          onClick={() => handleRemoveOrder(order.id)}
                          style={{ top: "5px", right: "5px" }}
                        >
                          <i className="bi bi-trash"></i> {/* Icon Trash */}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Fixed Footer Section */}
              <div style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}>
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

                {/* Garis pembatas antara Tax dan Total */}
                <hr style={{ border: "1px solid #ccc", margin: "15px 0" }} />

                <div className="mt-3 d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong style={{ color: "black" }}>
                    {formatPriceToIDR(total)}
                  </strong>
                </div>

                {/* Tampilkan form nominal hanya jika ada pesanan */}
                {orders.length > 0 && (
                  <>
                    {/* Tombol Select Nominal */}
                    <div
                      className="mt-3 d-flex gap-2"
                      style={{ justifyContent: "center" }}
                    >
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

                    {/* Form Input Nominal */}
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

                    {/* Tombol Pay */}
                    <button
                      className="btn btn-primary w-100 mt-4"
                      onClick={handlePayment}
                      disabled={paymentNominal < total} // Nonaktifkan jika nominal kurang dari total
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
      {/* Modal Success Payment */}
      {showSuccessModal && (
        <div
          className="modal"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
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
                {/* Informasi Utama */}
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

                {/* Daftar Pesanan */}
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

                {/* Subtotal, Tax, dan Total */}
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

                {/* Diterima dan Kembalian */}
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

      {/* Modal */}
      {showModal && selectedMenu && (
        <div
          className="modal"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="modal-dialog "
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
                  <strong>Price:</strong> {selectedMenu.price}
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
