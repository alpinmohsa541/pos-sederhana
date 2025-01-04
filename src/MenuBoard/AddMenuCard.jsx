import React, { useState } from "react";

const AddMenuCard = ({ menus, setMenus }) => {
  const [menuData, setMenuData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
    imagePreview: null, // Untuk preview gambar
  });

  const [showNotification, setShowNotification] = useState(false); // State untuk notifikasi

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData({ ...menuData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Generate preview URL
      const previewURL = URL.createObjectURL(file);
      setMenuData({ ...menuData, image: file, imagePreview: previewURL });
    }
  };

  const handleRemoveFile = () => {
    setMenuData({ ...menuData, image: null, imagePreview: null });
  };

  const handleAddMenu = () => {
    if (
      !menuData.name ||
      !menuData.category ||
      !menuData.price ||
      !menuData.description
    ) {
      alert("All fields are required!");
      return;
    }

    const newMenu = {
      ...menuData,
      price: parseInt(menuData.price, 10),
      image: menuData.imagePreview || "/assets/default-image.jpg", // Gunakan preview jika ada
    };

    setMenus([...menus, newMenu]);

    // Reset form
    setMenuData({
      name: "",
      category: "",
      price: "",
      description: "",
      image: null,
      imagePreview: null,
    });

    // Tampilkan notifikasi
    setShowNotification(true);

    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div
      className="card p-4"
      style={{
        height: "100%",
        background: "#f8f9fa",
        border: "1px dashed #ced4da",
        textAlign: "center",
      }}
    >
      <h5 className="mb-3">Add Menu</h5>

      {/* Notifikasi */}
      {showNotification && (
        <div
          className="notification"
          style={{
            position: "fixed",
            top: "80px", // Tepat di bawah navbar
            right: "20px",
            backgroundColor: "#e6f7e6",
            color: "#28a745",
            border: "1px solid #28a745",
            borderRadius: "8px",
            padding: "10px 20px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span
            style={{
              marginRight: "10px",
              fontSize: "20px",
              lineHeight: "1",
            }}
          >
            ✅
          </span>
          <span>New menu successfully added!</span>
          <button
            style={{
              marginLeft: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => setShowNotification(false)} // Close button
          >
            ✕
          </button>
        </div>
      )}

      {/* Preview Section */}
      {menuData.imagePreview ? (
        <div className="mb-3">
          <img
            src={menuData.imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <button
            className="btn btn-danger mt-3"
            onClick={handleRemoveFile}
            style={{ width: "100%" }}
          >
            Remove File
          </button>
        </div>
      ) : (
        // Upload Section
        <div
          className="mb-4"
          style={{
            border: "2px dashed #ced4da",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p className="text-muted mb-2">Drag and Drop your file here or</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="btn btn-primary"
            style={{ cursor: "pointer" }}
          >
            Choose File
          </label>
        </div>
      )}

      {/* Form Inputs */}
      <input
        type="text"
        name="name"
        placeholder="Enter name here..."
        className="form-control mb-3"
        value={menuData.name}
        onChange={handleInputChange}
      />
      <select
        name="category"
        className="form-control mb-3"
        value={menuData.category}
        onChange={handleInputChange}
      >
        <option value="">Select category</option>
        <option value="Foods">Foods</option>
        <option value="Beverages">Beverages</option>
        <option value="Desserts">Desserts</option>
      </select>
      <input
        type="number"
        name="price"
        placeholder="Enter price here..."
        className="form-control mb-3"
        value={menuData.price}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Add description here..."
        className="form-control mb-3"
        value={menuData.description}
        onChange={handleInputChange}
      />
      <button className="btn btn-primary w-100" onClick={handleAddMenu}>
        Save
      </button>
    </div>
  );
};

export default AddMenuCard;
