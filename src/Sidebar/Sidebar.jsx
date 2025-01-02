import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi

const Sidebar = () => {
  const location = useLocation(); // Mengambil lokasi halaman saat ini
  const navigate = useNavigate(); // Hook untuk melakukan navigasi programatik

  // Menyusun array icon dengan informasi terkait
  const icons = [
    {
      src: "/assets/shop.svg",
      alt: "Shop Icon",
      title: "Shop",
      path: "/cashier-dashboard",
    },
    {
      src: "/assets/clipboard-text.svg",
      alt: "Clipboard",
      title: "Clipboard",
      path: "/sales-report",
    },
    {
      src: "/assets/setting-2.svg",
      alt: "Setting",
      title: "Setting",
      path: "/settings",
    },
  ];

  // Mengecek apakah path saat ini adalah CashierDashboard
  const isCashierDashboard = location.pathname === "/cashier-dashboard";

  // Fungsi untuk menangani klik dan melakukan navigasi
  const handleIconClick = (path) => {
    navigate(path); // Melakukan navigasi ke path yang diklik
  };

  return (
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

      {/* Menampilkan icons dengan logika hover dan menambahkan kemampuan klik */}
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`icon-item mb-4 ${
            isCashierDashboard && icon.title === "Shop" ? "hover-effect" : ""
          }`}
          title={icon.title}
        >
          <button
            onClick={() => handleIconClick(icon.path)} // Menambahkan event onClick untuk navigasi
            className="border-0 bg-transparent p-0"
            style={{ cursor: "pointer" }} // Menambahkan pointer cursor untuk menandakan elemen yang dapat diklik
          >
            <img
              src={icon.src}
              alt={icon.alt}
              className="img-fluid"
              style={{ maxWidth: "30px", maxHeight: "30px" }}
              aria-label={icon.title}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
