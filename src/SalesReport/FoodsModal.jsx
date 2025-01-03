const FoodsModal = ({ isOpen, onClose, foodsData = [] }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1050,
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "10% auto",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            zIndex: 1100,
          }}
          onClick={onClose}
        >
          &times;
        </button>
        <div style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
          <h5 style={{ margin: 0 }}>Foods</h5>
        </div>
        <div style={{ padding: "1rem" }}>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            placeholder="Enter the keyword here..."
          />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                    padding: "0.5rem",
                  }}
                >
                  Menu Name
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    textAlign: "right",
                    padding: "0.5rem",
                  }}
                >
                  Total Sales
                </th>
              </tr>
            </thead>
            <tbody>
              {foodsData.length > 0 ? (
                foodsData.map((food, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "0.5rem",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {food.menuName || "N/A"}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem",
                        textAlign: "right",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {food.totalSales || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodsModal;
