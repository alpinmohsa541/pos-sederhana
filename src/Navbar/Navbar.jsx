import PropTypes from "prop-types";

const Navbar = ({
  isLoggedIn,
  username,
  searchQuery,
  handleSearchChange,
  handleLogout,
}) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        height: "80px",
        width: "100%",
        maxWidth: "100vw", // Menghindari overflow
        padding: "0",
        margin: "0",
      }}
    >
      <div
        className="container-fluid d-flex align-items-center justify-content-between"
        style={{ paddingLeft: "16px", paddingRight: "16px" }}
      >
        {/* Search Bar */}
        <form
          className="d-flex me-auto flex-grow-1"
          style={{
            maxWidth: "450px",
            width: "100%", // Responsif untuk perangkat kecil
          }}
        >
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

        {/* Right Section */}
        <div
          className="d-flex align-items-center"
          style={{
            gap: "16px", // Jarak antar elemen
            marginRight: "80px", // Menggeser semua elemen ke kiri
          }}
        >
          {/* Order Archive Icon */}
          <div
            className="d-none d-md-flex align-items-center"
            style={{
              gap: "8px", // Jarak antara ikon dan teks
            }}
          >
            <img
              src="/assets/archive-add.svg"
              alt="Order Archive Icon"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
                color: "#5E5E5E", // Warna teks netral
              }}
            >
              Order Archive
            </span>
          </div>

          {/* Profile Section */}
          <div
            className="d-flex align-items-center"
            style={{
              gap: "12px", // Jarak antar elemen di dalam kontainer ini
            }}
          >
            {isLoggedIn && username ? (
              <div
                className="d-flex align-items-center"
                style={{
                  gap: "12px", // Jarak antar elemen internal
                }}
              >
                {/* Profile Icon */}
                <img
                  src="/assets/profile.svg"
                  alt="Profile Icon"
                  className="rounded-circle"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    background: "#f0f0f0",
                  }}
                />
                {/* Username and Role */}
                <div
                  className="d-flex flex-column"
                  style={{
                    lineHeight: "1.2", // Mengatur jarak antara teks
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#000", // Warna teks lebih kontras
                    }}
                  >
                    {username?.name || "Guest"}
                  </span>
                  <small
                    style={{
                      fontSize: "0.85rem",
                      color: "#6c757d",
                    }}
                  >
                    {username?.role || "Cashier"}
                  </small>
                </div>
              </div>
            ) : (
              <span className="d-none d-sm-block">Not Logged In</span>
            )}

            {/* Logout Icon */}
            <img
              src="/assets/logout.svg"
              alt="Logout Icon"
              style={{
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

// validasi propTypes
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
  }),
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

// Default props
Navbar.defaultProps = {
  username: { name: "Guest", role: "User" },
};

export default Navbar;
