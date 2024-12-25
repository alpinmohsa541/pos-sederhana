import "../App.css";

const CashierDashboard = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-1 bg-light vh-100 d-flex flex-column align-items-center p-3">
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

          {/* Arrow Right Circle Icon with Border */}
          <div className="arrow-right-icon mb-5">
            <i
              className="bi bi-arrow-right-circle"
              style={{ fontSize: "1.5rem", color: "#6392F3" }}
            ></i>
          </div>

          {/* Shop Icon */}
          <div className="mb-5" title="Shop">
            <img
              src="/assets/shop.svg"
              alt="Shop Icon"
              style={{ width: "30px", height: "30px" }}
            />
          </div>

          {/* Clipboard Icon */}
          <div className="mb-5" title="clipboard-text">
            <img
              src="/assets/clipboard-text.svg"
              alt="clipboard"
              style={{ width: "30px", height: "30px" }}
            />
          </div>

          {/* Setting Icon */}
          <div className="mb-5" title="setting">
            <img
              src="/assets/setting-2.svg"
              alt="setting"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-11">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <div className="container-fluid">
              {/* Search Bar */}
              <form className="d-flex me-auto">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>

              {/* Order Archive */}
              <div className="d-flex align-items-center me-4">
                <i
                  className="bi bi-archive me-2"
                  style={{ fontSize: "1.5rem", color: "#6392F3" }}
                ></i>
                <span>Order Archive</span>
              </div>

              {/* Profile and Logout */}
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-person-circle me-2"
                  style={{ fontSize: "1.5rem", color: "#6392F3" }}
                ></i>
                <span className="me-3">John Doe</span>
                <i
                  className="bi bi-box-arrow-right"
                  style={{ fontSize: "1.5rem", color: "#6392F3" }}
                ></i>
              </div>
            </div>
          </nav>

          {/* Category Tabs */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button className="nav-link active">All Menu</button>
            </li>
            <li className="nav-item">
              <button className="nav-link">Foods</button>
            </li>
            <li className="nav-item">
              <button className="nav-link">Beverages</button>
            </li>
            <li className="nav-item">
              <button className="nav-link">Dessert</button>
            </li>
          </ul>

          {/* Menu Items */}
          <div className="row mt-3">
            {[...Array(12)].map((_, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <div className="card">
                  <img
                    src="https://via.placeholder.com/150"
                    className="card-img-top"
                    alt="Menu Item"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Gado-gado Special</h5>
                    <p className="card-text text-muted">
                      Vegetables, egg, tempe, tofu, ketupat, peanut sauce, and
                      kerupuk
                    </p>
                    <p className="card-text">Rp 20.000/portion</p>
                    <button className="btn btn-primary w-100">
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
