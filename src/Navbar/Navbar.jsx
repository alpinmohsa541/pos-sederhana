import PropTypes from "prop-types"; // Tambahkan import ini

const Navbar = ({
  isLoggedIn,
  username,
  searchQuery,
  handleSearchChange,
  handleLogout,
}) => {
  return (
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
          {isLoggedIn && username ? (
            <>
              <img
                src="/assets/profile.svg"
                className="profile me-2"
                alt="Profile Icon"
                style={{
                  fontSize: "60px",
                  padding: "5px",
                  color: "#6392F3",
                }}
              />
              <div className="d-flex flex-column">
                <span className="me-3" style={{ fontSize: "1.2rem" }}>
                  {username?.name || "Guest"}
                </span>
                <small style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                  {username?.role || "Cashier"}
                </small>
              </div>
              <img
                src="/assets/logout.svg"
                alt="Logout Icon"
                className="ms-3"
                style={{ width: "24px", cursor: "pointer" }}
                onClick={handleLogout}
              />
            </>
          ) : (
            <span>Not Logged In</span>
          )}
        </div>
      </div>
    </nav>
  );
};

// validasi propTypes
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // Boolean yang harus ada
  username: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
  }),
  searchQuery: PropTypes.string.isRequired, // String yang harus ada
  handleSearchChange: PropTypes.func.isRequired, // Function yang harus ada
  handleLogout: PropTypes.func.isRequired, // Function yang harus ada
};

// Default props jika diperlukan
Navbar.defaultProps = {
  username: { name: "Guest", role: "User" },
};

export default Navbar;
