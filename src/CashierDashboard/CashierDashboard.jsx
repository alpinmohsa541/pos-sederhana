import "../App.css";
import { useState, useEffect } from "react";
import menuData from "./DataMenu";

const CashierDashboard = () => {
  const [activeButton, setActiveButton] = useState("All Menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderType, setOrderType] = useState(""); // State untuk jenis order (Dine In atau Take Away)
  const [orderNumber, setOrderNumber] = useState("");
  const [orderArchive, setOrderArchive] = useState([]); // State untuk menyimpan order yang diarsipkan
  const [showModal, setShowModal] = useState(false); // State untuk modal
  const [selectedMenu, setSelectedMenu] = useState(null); // State untuk menu yang dipilih
  const [note, setNote] = useState(""); // State untuk catatan

  // Generate nomor order
  const generateOrderNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000000);
    return `ORDR#${randomNum}`;
  };

  useEffect(() => {
    setOrderNumber(generateOrderNumber());
  }, [orders]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Menambahkan menu langsung ke summary order (Dine In)
  const handleAddToOrder = (menu) => {
    const newOrder = { ...menu, note: "" }; // Tambahkan menu dengan default note kosong
    setOrders([...orders, newOrder]);
    setTotal(total + menu.price); // Tambahkan harga ke total
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handleArchiveOrder = () => {
    // Menyimpan order yang sedang aktif ke archive
    if (orders.length > 0) {
      setOrderArchive([...orderArchive, { orderNumber, orders, total }]);
      setOrders([]); // Kosongkan daftar order setelah diarsipkan
      setTotal(0); // Reset total
    }
  };

  // Menangani klik menu
  const handleShowModalOrAddOrder = (menu) => {
    if (orderType === "dineIn") {
      // Jika Dine In, langsung tambahkan menu ke summary order
      handleAddToOrder(menu);
    } else {
      // Jika Take Away, tampilkan modal untuk konfirmasi
      setSelectedMenu(menu); // Simpan menu yang dipilih
      setShowModal(true); // Tampilkan modal
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Tutup modal
    setSelectedMenu(null); // Reset menu yang dipilih
    setNote(""); // Reset catatan
  };

  const handleSubmitToOrder = () => {
    // Tambahkan menu yang dipilih ke daftar order dengan catatan
    if (selectedMenu) {
      const menuWithNote = { ...selectedMenu, note }; // Tambahkan catatan ke menu
      handleAddToOrder(menuWithNote); // Gunakan fungsi handleAddToOrder
      handleCloseModal(); // Tutup modal setelah submit
    }
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

          {/* Kategori menu dan summary order sejajar */}
          <div className="d-flex justify-content-between p-4">
            <div className="d-flex gap-3">
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

            {/* Order Summary */}
            <div className="bg-light p-4" style={{ width: "300px" }}>
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
              {/* Form Customer Name dan No Table */}
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

                {/* Tampilkan No Table hanya jika Dine In */}
                {orderType === "dineIn" && (
                  <div className="d-flex justify-content-between gap-2">
                    <div className="w-100">
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

              <div className="mt-3 d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>{total}</strong>
              </div>

              <button
                className="btn btn-success w-100 mt-3"
                onClick={handleArchiveOrder}
              >
                Archive Order
              </button>
            </div>
          </div>

          {/* Menu List */}
          <div className="row g-4 px-4">
            <h2>List Menu</h2>
            <div className="col-md-9">
              <div className="row g-4">
                {filteredMenu.map((menu) => (
                  <div
                    key={menu.id}
                    className="col-md-4"
                    onClick={() => handleShowModalOrAddOrder(menu)} // Klik card langsung tambahkan menu atau tampilkan modal
                    style={{ cursor: "pointer" }}
                  >
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
