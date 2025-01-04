import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const icons = [
    {
      src: "/assets/shop.svg",
      alt: "Shop Icon",
      path: "/cashier-dashboard",
    },
    {
      src: "/assets/clipboard-text.svg",
      alt: "Clipboard Icon",
      path: "/sales-report",
    },
    {
      src: "/assets/setting-2.svg",
      alt: "Setting Icon",
      path: "/profile",
    },
  ];

  const handleIconClick = (path) => {
    navigate(path);
  };

  return (
    <div
      className="sidebar bg-light vh-100 d-flex flex-column align-items-center p-3 position-fixed"
      style={{
        width: "80px", // Sidebar tetap dengan lebar tetap
        top: 0, // Sidebar tetap berada di atas
        left: 0, // Pastikan sidebar berada di sisi kiri layar
        zIndex: 10, // Sidebar tetap di atas elemen lainnya
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
          className={`icon-item mb-4 ${
            location.pathname === icon.path ? "active-icon" : ""
          }`}
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border:
              location.pathname === icon.path ? "2px solid #3572EF" : "none",
            borderRadius: "10px",
          }}
        >
          <button
            onClick={() => handleIconClick(icon.path)}
            className="border-0 bg-transparent p-0"
            style={{ cursor: "pointer" }}
          >
            <img
              src={icon.src}
              alt={icon.alt}
              className="img-fluid"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                filter:
                  location.pathname === icon.path ? "none" : "grayscale(100%)",
              }}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
