import React from "react";

// Fungsi untuk format harga ke IDR
const formatPriceToIDR = (price) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

const ReceiptPrint = ({
  orderNumber,
  customerName,
  orderType,
  tableNumber,
  orders,
  subtotal,
  tax,
  receivedAmount,
  changeAmount,
}) => {
  return (
    <div
      id="receipt"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        color: "#333",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <h4 style={{ textAlign: "center" }}>Receipt</h4>
      <p>
        <strong>Order No:</strong> {orderNumber}
      </p>
      <p>
        <strong>Customer:</strong> {customerName}
      </p>
      <p>
        <strong>Order Type:</strong> {orderType === "dineIn" ? "Dine In" : "Take Away"}
      </p>
      <p>
        <strong>Table:</strong> {tableNumber}
      </p>

      <hr />
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>
              {order.quantity} x {order.name}
            </span>
            <span>{formatPriceToIDR(order.price * order.quantity)}</span>
          </div>
        ))}
      </div>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Total:</strong>
        <strong>{formatPriceToIDR(subtotal + tax)}</strong>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Cash:</strong>
        <strong>{formatPriceToIDR(receivedAmount)}</strong>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Change:</strong>
        <strong>{formatPriceToIDR(changeAmount)}</strong>
      </div>

      <hr />
      <p style={{ textAlign: "center", fontSize: "10px", color: "#888" }}>
        Thank you for your purchase!
      </p>
    </div>
  );
};

export default ReceiptPrint;
