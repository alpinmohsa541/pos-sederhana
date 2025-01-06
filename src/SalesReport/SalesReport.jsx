import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
import FoodsModal from "./FoodsModal";
import TransactionDetailModal from "./TransactionDetailModal";

const BASE_URL = "http://localhost:3000/api"; // Base URL untuk backend API

const SalesReport = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isFoodsModalOpen, setIsFoodsModalOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [menuCounts, setMenuCounts] = useState({
    all: 0,
    foods: 0,
    beverages: 0,
    desserts: 0,
  });

  // Fetch data menus dari API
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/menus`);
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

  // Hitung jumlah menu berdasarkan kategori
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

  // State untuk menyimpan waktu real-time
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Fungsi untuk memperbarui waktu
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

    // Memperbarui waktu setiap detik
    updateDate(); // Set waktu awal
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval); // Membersihkan interval saat komponen unmount
  }, []);

  const handleRowClick = (order) => {
    setSelectedTransaction(order);
    setIsModalOpen(true);
  };
  // Fungsi untuk menutup semua modal
  const closeAllModals = () => {
    setIsTransactionModalOpen(false);
    setIsFoodsModalOpen(false);
  };

  // Fungsi untuk membuka TransactionDetailModal
  const handleTransactionModalOpen = (order) => {
    closeAllModals(); // Pastikan modal lain tertutup
    setSelectedTransaction(order);
    setIsTransactionModalOpen(true);
  };

  // Fungsi untuk membuka FoodsModal
  const handleFoodsModalOpen = () => {
    closeAllModals(); // Pastikan modal lain tertutup
    setIsFoodsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const foodsData = [
    { menuName: "Gado-gado Spesial", totalSales: 10 },
    { menuName: "Ketoprak", totalSales: 5 },
    { menuName: "Siomay", totalSales: 3 },
    { menuName: "Batagor", totalSales: 2 },
    { menuName: "Bakso", totalSales: 2 },
    { menuName: "Mie Ayam", totalSales: 2 },
    { menuName: "Soto Ayam", totalSales: 1 },
    { menuName: "Soto Sapi", totalSales: 0 },
  ];
  const exportAsPDF = () => {
    // Gunakan library seperti jsPDF untuk mengekspor data ke PDF
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF();
      doc.text("Sales Report", 10, 10);
      doc.save("sales_report.pdf");
    });
  };

  const exportAsExcel = () => {
    // Gunakan library seperti SheetJS (xlsx) untuk mengekspor data ke Excel
    import("xlsx").then((XLSX) => {
      const ws = XLSX.utils.json_to_sheet(orders);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
      XLSX.writeFile(wb, "sales_report.xlsx");
    });
  };

  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    orderType: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  useEffect(() => {
    // Fetch data orders (placeholder)
    setOrders([
      {
        id: 1,
        noOrder: "ORDR#1234567890",
        orderDate: "Rabu, 18/09/2024 12:30:00",
        orderType: "Dine-in",
        category: "Foods",
        customerName: "Anisa",
      },
      {
        id: 2,
        noOrder: "ORDR#1234567891",
        orderDate: "Rabu, 18/09/2024 13:00:00",
        orderType: "Take-away",
        category: "Beverages",
        customerName: "Budi",
      },
      {
        id: 3,
        noOrder: "ORDR#1234567892",
        orderDate: "Rabu, 18/09/2024 13:30:00",
        orderType: "Dine-in",
        category: "Desserts",
        customerName: "Citra",
      },
      {
        id: 4,
        noOrder: "ORDR#1234567893",
        orderDate: "Rabu, 18/09/2024 14:00:00",
        orderType: "Take-away",
        category: "Foods",
        customerName: "Dian",
      },
      {
        id: 5,
        noOrder: "ORDR#1234567894",
        orderDate: "Rabu, 18/09/2024 14:30:00",
        orderType: "Dine-in",
        category: "Beverages",
        customerName: "Eka",
      },
      {
        id: 6,
        noOrder: "ORDR#1234567895",
        orderDate: "Rabu, 18/09/2024 15:00:00",
        orderType: "Take-away",
        category: "Desserts",
        customerName: "Fajar",
      },
      {
        id: 7,
        noOrder: "ORDR#1234567896",
        orderDate: "Rabu, 18/09/2024 15:30:00",
        orderType: "Dine-in",
        category: "Foods",
        customerName: "Gina",
      },
      {
        id: 8,
        noOrder: "ORDR#1234567897",
        orderDate: "Rabu, 18/09/2024 16:00:00",
        orderType: "Take-away",
        category: "Beverages",
        customerName: "Hadi",
      },
      {
        id: 9,
        noOrder: "ORDR#1234567898",
        orderDate: "Rabu, 18/09/2024 16:30:00",
        orderType: "Dine-in",
        category: "Desserts",
        customerName: "Indah",
      },
      {
        id: 10,
        noOrder: "ORDR#1234567899",
        orderDate: "Rabu, 18/09/2024 17:00:00",
        orderType: "Take-away",
        category: "Foods",
        customerName: "Joko",
      },
      {
        id: 11,
        noOrder: "ORDR#1234567810",
        orderDate: "Rabu, 18/09/2024 17:30:00",
        orderType: "Dine-in",
        category: "Beverages",
        customerName: "Kiki",
      },
      {
        id: 12,
        noOrder: "ORDR#1234567811",
        orderDate: "Rabu, 18/09/2024 18:00:00",
        orderType: "Take-away",
        category: "Desserts",
        customerName: "Lina",
      },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data pengguna
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/"); // Redirect ke halaman login
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredOrders = orders.filter((order) => {
    // Filter logic (contoh sederhana, sesuaikan dengan kebutuhan)
    return (
      (!filters.startDate ||
        new Date(order.orderDate) >= new Date(filters.startDate)) &&
      (!filters.endDate ||
        new Date(order.orderDate) <= new Date(filters.endDate)) &&
      (!filters.category || order.category === filters.category) &&
      (!filters.orderType || order.orderType === filters.orderType)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className=" main-content sales-report container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="col-10 col-lg-11">
          <Navbar
            isLoggedIn={isLoggedIn}
            username={username}
            handleLogout={handleLogout}
          />

          <div className="container-fluid mt-4">
            {/* Label Sales Report */}
            <div className="row mb-4 align-items-center">
              <div className="col">
                <h2 className="text">Sales Report</h2>
              </div>
              <div className="col text-end">
                <p className="mb-0">{currentDate}</p>
              </div>
            </div>
            {/* Dashboard Summary */}
            <div className="row mb-4">
              {/* Card Total Order */}
              <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
                <div className="card text">
                  <div className="card-body d-flex align-items-center">
                    <i
                      className="bi bi-cart-fill me-3"
                      style={{ fontSize: "2rem", color: "#007bff" }}
                    ></i>
                    <div>
                      <h5 className="card-title mt-2 text-truncate">
                        Total Order
                      </h5>
                      <p className="card-text fw-bold fs-5">100</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Total Omzet */}
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

              {/* Card All Menu Sales */}
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

              {/* Card Foods */}
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

              {/* Card Beverages */}
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

              {/* Card Desserts */}
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

            {/* Filters */}
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

            {/* Table */}
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
                      <td>{order.noOrder}</td>
                      <td>{order.orderDate}</td>
                      <td>{order.orderType}</td>
                      <td>{order.category}</td>
                      <td>{order.customerName}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
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
                  {/* Tombol Previous */}
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

                  {/* Pagination Number */}
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

                  {/* Tombol Next */}
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
      {/* Modals */}
      <TransactionDetailModal
        isOpen={isTransactionModalOpen}
        onClose={closeAllModals}
        transaction={selectedTransaction}
      />

      <FoodsModal
        isOpen={isFoodsModalOpen}
        onClose={closeAllModals}
        foodsData={foodsData}
      />
    </div>
  );
};

export default SalesReport;
