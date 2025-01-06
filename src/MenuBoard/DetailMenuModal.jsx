import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DetailMenuModal = ({ menu, onClose, onSave, onDelete }) => {
  const [menuData, setMenuData] = useState({
    name: menu.name,
    category: menu.category,
    price: menu.price,
    description: menu.description,
    image: menu.image,
    imagePreview: menu.image, // Untuk preview gambar
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData({ ...menuData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setMenuData({ ...menuData, image: file, imagePreview: previewURL });
    }
  };

  const handleSave = () => {
    onSave(menuData); // Kirim data menu yang telah diedit
    onClose(); // Tutup modal
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/menus/${menu.menu_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDelete(menu.menu_id); // Kirim ID menu yang telah dihapus
        alert("Menu successfully deleted!");
      } else {
        alert("Failed to delete menu!");
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
      alert("An error occurred while deleting the menu.");
    } finally {
      onClose(); // Tutup modal
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">Detail Menu</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Image Preview */}
            <div className="text-center mb-3">
              <img
                src={menuData.imagePreview}
                alt="Menu"
                className="img-fluid rounded"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileUpload"
                  className="btn btn-outline-primary btn-sm"
                >
                  Change Picture
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={menuData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="form-select"
                value={menuData.category}
                onChange={handleInputChange}
              >
                <option value="Food">Food</option>
                <option value="Beverage">Beverage</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="form-control"
                value={menuData.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="3"
                className="form-control"
                value={menuData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={handleDelete}>
              🗑 Delete
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              💾 Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMenuModal;
