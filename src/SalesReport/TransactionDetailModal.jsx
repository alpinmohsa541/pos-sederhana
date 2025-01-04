const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen) return null; // Tidak menampilkan modal jika isOpen === false

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        outline: 0,
      }}
      tabIndex="-1"
    >
      <div
        className="modal-dialog"
        style={{ margin: "1.75rem auto", zIndex: 1060 }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Transaction Details</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>No Order:</strong> {transaction.noOrder}
            </p>
            <p>
              <strong>Order Date:</strong> {transaction.orderDate}
            </p>
            <p>
              <strong>Order Type:</strong> {transaction.orderType}
            </p>
            <p>
              <strong>Category:</strong> {transaction.category}
            </p>
            <p>
              <strong>Customer Name:</strong> {transaction.customerName}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop fade show"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
        onClick={onClose} // Klik backdrop juga menutup modal
      ></div>
    </div>
  );
};

export default TransactionDetailModal;
