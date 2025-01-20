import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Base URL untuk backend, sesuaikan dengan URL tempat server Anda berjalan
const BASE_URL = "https://backend-pos-rho.vercel.app";

const DetailMenuModal = ({ menu, onClose, onSave, onDelete }) => {
  const [menuData, setMenuData] = useState({
    name: menu.name,
    category: menu.category,
    price: menu.price,
    description: menu.description,
    image: menu.image,
    imagePreview: menu.image
      ? `${BASE_URL}${menu.image}`
      : "/assets/default-image.jpg",
  });

  // Menghandle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData({ ...menuData, [name]: value });
  };

  // Menghandle perubahan file gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setMenuData({ ...menuData, image: file, imagePreview: previewURL });
    }
  };

  // Menyimpan perubahan data menu
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", menuData.name);
      formData.append("category", menuData.category);
      formData.append("price", menuData.price);
      formData.append("description", menuData.description);
      if (menuData.image instanceof File) {
        formData.append("image", menuData.image);
      }

      const response = await fetch(`${BASE_URL}/api/menus/${menu._id}`, {
        method: "PUT",
        body: formData,
      });

      const updatedMenu = await response.json();

      if (response.ok) {
        onSave(updatedMenu);
        alert("Menu successfully updated!");
      } else {
        alert(
          `Failed to update menu. ${updatedMenu.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error updating menu:", error);
      alert(
        "An error occurred while updating the menu. Please try again later."
      );
    } finally {
      onClose();
    }
  };

  // Menghapus menu
  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/menus/${menu._id}`, {
        method: "DELETE",
      });

      console.log("Response Status:", response.status);
      console.log("Response OK:", response.ok);

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok && responseData.message === "Menu deleted successfully") {
        onDelete(menu._id);
        alert("Menu successfully deleted!");
      } else {
        alert(
          `Failed to delete menu: ${responseData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
      alert(
        "An error occurred while deleting the menu. Please try again later."
      );
    } finally {
      onClose();
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
