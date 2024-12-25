import "../App.css";

const CashierDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-1 bg-light p-3">
          <div className="d-flex flex-column align-items-center">
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
        </div>

        {/* Main Content */}
        <div className="col-md-10">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center p-3">
            <h4>All Menu</h4>
            <div className="d-flex align-items-center">
              <div className="text-end me-3">
                <p className="mb-0">John Doe</p>
                <small>Cashier</small>
              </div>
              <div className="rounded-circle bg-light p-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="rounded-circle"
                />
              </div>
            </div>
          </div>

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

          {/* Order Section */}
          <div
            className="position-fixed end-0 top-0 bg-white p-3 border ms-auto"
            style={{ width: "25%" }}
          >
            <h5>List Order</h5>
            <div className="btn-group d-flex mb-3">
              <button className="btn btn-outline-primary flex-fill">
                Dine in
              </button>
              <button className="btn btn-outline-primary flex-fill">
                Take Away
              </button>
            </div>
            <form>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Customer Name"
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="No. Table"
              />
            </form>
            <p>No Menu Selected</p>
            <button className="btn btn-success w-100 mt-3">Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
