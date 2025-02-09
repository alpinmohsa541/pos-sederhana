import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FoodsModal from "./FoodsModal";
import TransactionDetailModal from "./TransactionDetailModal";

const BASE_URL = "https://backend-pos-rho.vercel.app"; // Base URL untuk backend API

const SalesReport = () => {
  // State untuk transaksi dan modal
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isFoodsModalOpen, setIsFoodsModalOpen] = useState(false);

  // State untuk data menu dan perhitungan kategori
  const [menus, setMenus] = useState([]);
  const [menuCounts, setMenuCounts] = useState({
    all: 0,
    foods: 0,
    beverages: 0,
    desserts: 0,
  });

  // State untuk tanggal saat ini
  const [currentDate, setCurrentDate] = useState("");

  // State untuk orders dan filter
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    orderType: "",
  });

  // State untuk autentikasi user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // State untuk paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // Fetch data menus dari API
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/menus`);
        const data = await response.json();

        if (response.ok) {
          setMenus(data); // Set data menus
          calculateMenuCounts(data); // Hitung jumlah per kategori
        } else {
          console.error("Failed to fetch menus:", data.message);
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // Fungsi untuk menghitung jumlah menu per kategori
  const calculateMenuCounts = (data) => {
    const all = data.length;
    const foods = data.filter((menu) => menu.category === "Foods").length;
    const beverages = data.filter(
      (menu) => menu.category === "Beverages"
    ).length;
    const desserts = data.filter((menu) => menu.category === "Desserts").length;

    setMenuCounts({
      all,
      foods,
      beverages,
      desserts,
    });
  };

  // Fetch orders (transaction groups) from the new API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/transaction-groups`);
        const data = await response.json();

        if (response.ok) {
          setOrders(data); // Set the fetched transaction data
        } else {
          console.error("Failed to fetch transactions:", data.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchOrders(); // Fetch orders when the component mounts
  }, []);


  // Update tanggal setiap detik
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDate(); // Set waktu awal
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  // Buka modal detail transaksi
  const handleTransactionModalOpen = (order) => {
    closeAllModals(); // Pastikan modal lain tertutup
    setSelectedTransaction(order);
    setIsTransactionModalOpen(true);
  };

  // Buka modal daftar makanan (Foods)
  const handleFoodsModalOpen = () => {
    closeAllModals(); // Pastikan modal lain tertutup
    setIsFoodsModalOpen(true);
  };

  // Tutup semua modal
  const closeAllModals = () => {
    setIsTransactionModalOpen(false);
    setIsFoodsModalOpen(false);
  };

  // Validasi user dari localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser.username);
      setIsLoggedIn(true);
    } else {
      navigate("/"); // Redirect ke login jika belum login
    }
  }, [navigate]);

  // Placeholder untuk fetching orders (ganti dengan fetch API jika perlu)
  useEffect(() => {
    setOrders([
      // Data contoh, ganti dengan data aktual jika perlu
      // Contoh:
      // {
      //   id: 1,
      //   noOrder: "ORD-001",
      //   orderDate: "2025-02-07",
      //   orderType: "Dine-in",
      //   category: "Foods",
      //   customerName: "John Doe"
      // }
    ]);
  }, []);

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/"); // Redirect ke halaman login
  };

  // Update filter berdasarkan input user
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter orders sesuai dengan kriteria yang dipilih
  const filteredOrders = orders.filter((order) => {
    return (
      (!filters.startDate ||
        new Date(order.orderDate) >= new Date(filters.startDate)) &&
      (!filters.endDate ||
        new Date(order.orderDate) <= new Date(filters.endDate)) &&
      (!filters.category || order.category === filters.category) &&
      (!filters.orderType || order.orderType === filters.orderType)
    );
  });

  // Paginasi
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi placeholder untuk ekspor sebagai PDF
  const exportAsPDF = () => {
    console.log("Exporting as PDF...");
    // Implementasikan logika ekspor PDF di sini
  };

  // Fungsi placeholder untuk ekspor sebagai Excel
  const exportAsExcel = () => {
    console.log("Exporting as Excel...");
    // Implementasikan logika ekspor Excel di sini
  };

  return (
    <div className="main-content sales-report container-fluid p-0">
      <div className="row g-0">
        <Sidebar />
        <div className="col-10 col-lg-11">
          <Navbar
            isLoggedIn={isLoggedIn}
            username={username}
            handleLogout={handleLogout}
          />
          <div className="container-fluid mt-4">
            <div className="row mb-4 align-items-center">
              <div className="col">
                <h2 className="text">Sales Report</h2>
              </div>
              <div className="col text-end">
                <p className="mb-0">{currentDate}</p>
              </div>
            </div>
            <div className="row mb-4">
              {/* Kartu Informasi */}
              <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <i
                      className="bi bi-cart-fill me-3"
                      style={{ fontSize: "2rem", color: "#007bff" }}
                    ></i>
                    <div>
                      <h5 className="card-title mt-2 text-truncate">
                        Total Order
                      </h5>
                      <p className="card-text fw-bold fs-5">
                        {filteredOrders.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <i
                      className="bi bi-currency-dollar me-3"
                      style={{ fontSize: "2rem", color: "#28a745" }}
                    ></i>
                    <div>
                      <h5 className="card-title text-truncate">Total Omzet</h5>
                      <p className="card-text fw-bold fs-5">Rp 1.515.400</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <i
                      className="bi bi-box-seam me-3"
                      style={{ fontSize: "2rem", color: "#ffc107" }}
                    ></i>
                    <div>
                      <h5 className="card-title text-truncate">All Menu</h5>
                      <p className="card-text fw-bold fs-5">{menuCounts.all}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <i
                      className="bi bi-egg-fried me-3"
                      style={{ fontSize: "2rem", color: "#17a2b8" }}
                    ></i>
                    <div>
                      <h5 className="card-title text-truncate">Foods</h5>
                      <p className="card-text fw-bold fs-5">
                        {menuCounts.foods}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <i
                      className="bi bi-cup-straw me-3"
                      style={{ fontSize: "2rem", color: "#fd7e14" }}
                    ></i>
                    <div>
                      <h5 className="card-title text-truncate">Beverages</h5>
                      <p className="card-text fw-bold fs-5">
                        {menuCounts.beverages}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <i
                      className="bi bi-cake me-3"
                      style={{ fontSize: "2rem", color: "#6f42c1" }}
                    ></i>
                    <div>
                      <h5 className="card-title text-truncate">Desserts</h5>
                      <p className="card-text fw-bold fs-5">
                        {menuCounts.desserts}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Filter dan Download */}
            <div className="row mb-4 align-items-end">
              <div className="col">
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  placeholder="Start Date"
                />
              </div>
              <div className="col">
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="form-control"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  placeholder="End Date"
                />
              </div>
              <div className="col position-relative">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">Select Category</option>
                  <option value="Foods">Foods</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Desserts">Desserts</option>
                </select>
                <i
                  className="bi bi-chevron-down position-absolute"
                  style={{
                    top: "70%",
                    right: "20px",
                    transform: "translateY(-50%)",
                  }}
                ></i>
              </div>
              <div className="col position-relative">
                <label htmlFor="orderType" className="form-label">
                  Order Type
                </label>
                <select
                  id="orderType"
                  name="orderType"
                  className="form-control"
                  value={filters.orderType}
                  onChange={handleFilterChange}
                >
                  <option value="">Select Order Type</option>
                  <option value="Dine-in">Dine-in</option>
                  <option value="Take-away">Take-away</option>
                </select>
                <i
                  className="bi bi-chevron-down position-absolute"
                  style={{
                    top: "70%",
                    right: "20px",
                    transform: "translateY(-50%)",
                  }}
                ></i>
              </div>
              <div className="col d-flex justify-content-between align-items-end">
                <button className="btn btn-primary w-50 me-2">Search</button>
                <div className="dropdown w-50">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle w-100"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-download"></i> Download
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => exportAsPDF()}
                      >
                        Export as PDF
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => exportAsExcel()}
                      >
                        Export as Excel
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tabel Data Orders */}
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>No Order</th>
                    <th>Order Date</th>
                    <th>Order Type</th>
                    <th>Category</th>
                    <th>Customer Name</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => handleTransactionModalOpen(order)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{order.order_number}</td>
                      <td>{order.created_at}</td>
                      <td>{order.transaction_type}</td>
                      <td>{order.category}</td>
                      <td>{order.customer_name}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Mencegah event klik baris
                            handleFoodsModalOpen();
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          <img
                            src="/assets/export.svg"
                            alt="Show Foods Modal"
                            style={{ width: "32px", height: "32px" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
                  {filteredOrders.length} entries
                </span>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Transaksi dan Modal Foods */}
      <TransactionDetailModal
        isOpen={isTransactionModalOpen}
        onClose={closeAllModals}
        transaction={selectedTransaction}
      />
      <FoodsModal
        isOpen={isFoodsModalOpen}
        onClose={closeAllModals}
        foodsData={menus.filter((menu) => menu.category === "Foods")}
      />
    </div>
  );
};

export default SalesReport;
