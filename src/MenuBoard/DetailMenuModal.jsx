import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Base URL untuk backend, sesuaikan dengan URL tempat server Anda berjalan
const BASE_URL = "https://backend-pos-rho.vercel.app"; // Ganti dengan URL backend Anda

const DetailMenuModal = ({ menu, onClose, onSave, onDelete }) => {
  const [menuData, setMenuData] = useState({
    name: menu.name,
    category: menu.category,
    price: menu.price,
    description: menu.description,
    image: menu.image,
    imagePreview: menu.image
      ? `${BASE_URL}${menu.image}`
      : "/assets/default-image.jpg", // Menggunakan base URL untuk preview
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
      // Mengirim data yang telah diubah ke server
      const formData = new FormData();
      formData.append("name", menuData.name);
      formData.append("category", menuData.category);
      formData.append("price", menuData.price);
      formData.append("description", menuData.description);
      if (menuData.image) formData.append("image", menuData.image);

      const response = await fetch(`${BASE_URL}/menus/${menu.menu_id}`, {
        method: "PUT", // Menggunakan PUT untuk update data
        body: formData,
      });

      const updatedMenu = await response.json();

      if (response.ok) {
        onSave(updatedMenu); // Mengirim menu yang telah diupdate ke parent
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
      onClose(); // Tutup modal setelah penghapusan
    }
  };

  // Menghapus menu
  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/menus/${menu.menu_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete(menu.menu_id); // Menghapus menu dari UI setelah penghapusan berhasil
        alert("Menu successfully deleted!");
      } else {
        const errorData = await response.json();
        alert(`Failed to delete menu: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
      alert("Menu successfully updated!");
    } finally {
      onClose(); // Tutup modal setelah penghapusan
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
