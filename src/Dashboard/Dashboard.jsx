import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [currentDate, setCurrentDate] = useState("");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ label: "", data: [] });

  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(now.toLocaleDateString("en-US", options));

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    // Hapus data user dari localStorage dan reset state
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    window.location.href = "/"; // Redirect ke halaman login
  };

  const handleCardClick = (label) => {
    // Set data for each card modal
    const dataMap = {
      Foods: [
        { menuName: "Gado-gado Spesial", totalSales: 10 },
        { menuName: "Ketoprak", totalSales: 5 },
        { menuName: "Siomay", totalSales: 3 },
        { menuName: "Batagor", totalSales: 2 },
        { menuName: "Bakso", totalSales: 2 },
        { menuName: "Mie Ayam", totalSales: 2 },
        { menuName: "Soto Ayam", totalSales: 1 },
        { menuName: "Soto Sapi", totalSales: 0 },
      ],
      Beverages: [
        { menuName: "Es Teh", totalSales: 15 },
        { menuName: "Kopi Susu", totalSales: 8 },
        { menuName: "Jus Jeruk", totalSales: 5 },
        { menuName: "Es Kopi", totalSales: 4 },
        { menuName: "Es Coklat", totalSales: 3 },
        { menuName: "Es Kelapa", totalSales: 2 },
      ],
      Desserts: [
        { menuName: "Pudding", totalSales: 6 },
        { menuName: "Ice Cream", totalSales: 12 },
        { menuName: "Cheesecake", totalSales: 7 },
        { menuName: "Brownies", totalSales: 5 },
        { menuName: "Fruit Salad", totalSales: 3 },
      ],
    };

    setModalContent({ label, data: dataMap[label] || [] });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Dummy Data for Cards
  const dashboardStats = [
    { label: "Total Orders", value: 500, icon: "/assets/receipt.svg" },
    {
      label: "Total Omzet",
      value: "Rp 10.000.000",
      icon: "/assets/currency.svg",
    },
    { label: "All Menu Orders", value: 1000, icon: "/assets/document.svg" },
    { label: "Foods", value: 500, icon: "/assets/reserves.svg" },
    { label: "Beverages", value: 300, icon: "/assets/coffees.svg" },
    { label: "Desserts", value: 200, icon: "/assets/cakes.svg" },
  ];

  // Dummy Chart Data
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Food",
        data: [50, 100, 200, 150, 175, 150, 200],
        backgroundColor: "#3572EF",
      },
      {
        label: "Beverage",
        data: [20, 50, 75, 60, 50, 40, 80],
        backgroundColor: "#6CC0FF",
      },
      {
        label: "Dessert",
        data: [10, 20, 30, 25, 15, 20, 35],
        backgroundColor: "#D9EFFF",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 300,
      },
    },
  };

  return (
    <div className="main-content dashboard d-flex vh-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <Navbar
          isLoggedIn={isLoggedIn}
          username={username}
          handleLogout={handleLogout}
        />

        {/* Dashboard */}
        <div className="container-fluid mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Dashboard Orders</h2>
            <p className="text-muted mb-0">Today, {currentDate}</p>
          </div>

          {/* Dashboard Cards */}
          <div className="row mb-4">
            {dashboardStats.map((stat, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3"
                onClick={() => handleCardClick(stat.label)} // Add onClick event
                style={{ cursor: "pointer" }}
              >
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <img
                      src={stat.icon}
                      alt={stat.label}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h6 className="card-title text-truncate mb-1">
                        {stat.label}
                      </h6>
                      <p className="card-text fw-bold mb-0">{stat.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bar Chart with Filters */}
          <div className="card p-4 position-relative">
            <h5 className="mb-4">Total Omzet</h5>

            {/* Chart */}
            <div style={{ height: "400px" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div
          className="modal"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1050,
          }}
          onClick={handleCloseModal} // Tambahkan event ini agar modal tertutup saat area luar modal diklik
        >
          <div
            className="modal-dialog"
            style={{
              maxWidth: "500px",
              margin: "10% auto",
              background: "#fff",
              borderRadius: "10px",
              padding: "20px",
              position: "relative", // Penting agar tombol close tetap dalam posisi
            }}
            onClick={(e) => e.stopPropagation()} // Tambahkan ini agar klik pada konten modal tidak menutup modal
          >
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">{modalContent.label}</h5>
              <button
                type="button"
                onClick={handleCloseModal} // Pastikan event handler disambungkan ke fungsi handleCloseModal
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                &times; {/* Ikon close */}
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Enter the keyword here..."
                className="form-control mb-4"
              />
              <table className="table">
                <thead>
                  <tr>
                    <th>Menu Name</th>
                    <th>Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {modalContent.data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.menuName}</td>
                      <td>{item.totalSales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
