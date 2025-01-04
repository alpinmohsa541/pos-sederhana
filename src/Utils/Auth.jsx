import React, { createContext, useContext, useState, useEffect } from "react";

// Membuat Context
const AuthContext = createContext();

// Provider untuk AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan data user (termasuk role)
  const [isLoading, setIsLoading] = useState(true); // Untuk menampilkan loading selama user dicek

  // Fungsi untuk login
  const login = (userData) => {
    // Simpan user ke localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Fungsi untuk logout
  const logout = () => {
    localStorage.removeItem("user"); // Hapus user dari localStorage
    setUser(null);
  };

  // Cek user di localStorage saat aplikasi pertama kali dibuka
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user jika ditemukan di localStorage
    }
    setIsLoading(false); // Matikan loading setelah cek selesai
  }, []);

  // Nilai yang akan disediakan oleh AuthContext
  const value = {
    user, // Data user (username, role, dll.)
    login, // Fungsi untuk login
    logout, // Fungsi untuk logout
    isLoading, // Status loading untuk proses autentikasi
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook untuk menggunakan AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
