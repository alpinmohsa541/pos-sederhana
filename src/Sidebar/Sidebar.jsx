import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil role user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "cashier"; // Default role ke "cashier"

  // Semua menu yang tersedia
  const allIcons = [
    {
      src: "/assets/element-3.svg",
      alt: "Dashboard Icon",
      path: "/dashboard",
      roles: ["admin"], // Hanya admin yang dapat melihat menu ini
    },
    {
      src: "/assets/menu-board.svg",
      alt: "menu-board",
      path: "/menu-board",
      roles: ["admin"], // Hanya admin yang dapat melihat menu ini
    },
    {
      src: "/assets/shop.svg",
      alt: "Shop Icon",
      path: "/cashier-dashboard",
      roles: ["cashier"], // Admin dan cashier dapat melihat menu ini
    },
    {
      src: "/assets/clipboard-text.svg",
      alt: "Sales Report Icon",
      path: "/sales-report",
      roles: ["admin", "cashier"], // Hanya admin yang dapat melihat menu ini
    },
    {
      src: "/assets/setting-2.svg",
      alt: "Settings Icon",
      path: "/profile",
      roles: ["admin", "cashier"], // Admin dan cashier dapat melihat menu ini
    },
  ];

  // Filter menu berdasarkan role user
  const icons = allIcons.filter((icon) => icon.roles.includes(userRole));

  const handleIconClick = (path) => {
    navigate(path);
  };

  return (
    <div
      className="sidebar bg-light vh-100 d-flex flex-column align-items-center p-3 position-fixed d-none d-md-flex"
      style={{
        width: "80px", // Lebar tetap
        top: 0, // Tetap di atas
        left: 0, // Tetap di sisi kiri
        zIndex: 10, // Di atas elemen lainnya
      }}
    >
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

      {/* Menu Icons */}
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`icon-item mb-4 ${location.pathname === icon.path ? "active-icon" : ""}`}
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: location.pathname === icon.path ? "2px solid #3572EF" : "none",
            borderRadius: "10px",
            transition: "all 0.3s ease", // Animasi transisi untuk efek hover dan aktif
          }}
        >
          <button
            onClick={() => handleIconClick(icon.path)}
            className="border-0 bg-transparent p-0"
            style={{
              cursor: "pointer",
              outline: "none",
            }}
          >
            <img
              src={icon.src}
              alt={icon.alt}
              className="img-fluid"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                filter: location.pathname === icon.path ? "none" : "grayscale(100%)",
                transition: "filter 0.3s ease", // Animasi transisi untuk hover
              }}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
