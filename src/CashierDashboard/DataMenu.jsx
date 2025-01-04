// Data menu
const menuData = [
  {
    id: 1,
    name: "Gado-gado Special",
    description:
      "Vegetables, egg, tempe, tofu, ketupat, peanut sauce, and kerupuk.",
    price: 20000,
    category: "foods",
    image: "/assets/image5.svg",
  },
  {
    id: 2,
    name: "Es Teh Manis",
    description: "Refreshing iced tea with a sweet taste.",
    price: 5000,
    category: "Beverages",
    image: "/assets/image5.svg",
  },
  {
    id: 3,
    name: "Black Forest Cake",
    description: "Rich chocolate cake with cherry toppings.",
    price: 30000,
    category: "Dessert",
    image: "/assets/image5.svg",
  },
  {
    id: 4,
    name: "Nasi Goreng Special",
    description: "Fried rice with egg, chicken, and vegetables.",
    price: 25000,
    category: "foods",
    image: "/assets/image5.svg",
  },
  {
    id: 5,
    name: "Cappuccino",
    description: "Creamy coffee with milk foam.",
    price: 15000,
    category: "Beverages",
    image: "/assets/image5.svg",
  },
  {
    id: 6,
    name: "Tiramisu",
    description: "Italian dessert with coffee and mascarpone.",
    price: 35000,
    category: "Dessert",
    image: "/assets/image5.svg",
  },
  {
    id: 7,
    name: "Mie Ayam Special",
    description: "Noodles with chicken and vegetables.",
    price: 22000,
    category: "foods",
    image: "/assets/image5.svg",
  },
  {
    id: 8,
    name: "Green Tea Latte",
    description: "Smooth green tea with creamy milk.",
    price: 18000,
    category: "Beverages",
    image: "/assets/image5.svg",
  },
  {
    id: 9,
    name: "Cheesecake",
    description: "Creamy cheesecake with a biscuit base.",
    price: 28000,
    category: "Dessert",
    image: "/assets/image5.svg",
  },
  {
    id: 10,
    name: "Sate Ayam",
    description: "Chicken satay with peanut sauce.",
    price: 24000,
    category: "foods",
    image: "/assets/image5.svg",
  },
  // Tambahkan 40 data lainnya dengan variasi kategori
  ...Array.from({ length: 40 }, (_, i) => ({
    id: i + 11,
    name: `Menu Item ${i + 11}`,
    description: `Description for menu item ${i + 11}`,
    price: Math.floor(Math.random() * 30000) + 5000, // Harga random antara 5000-35000
    category: ["foods", "Beverages", "Dessert"][Math.floor(Math.random() * 3)], // Pilih kategori secara acak
    image: "/assets/image5.svg", // Gambar berulang dari 1-10
  })),
];

export const getMenuData = () => {
  return menuData;
};

export const updateMenuData = (updatedMenu) => {
  const menuIndex = menuData.findIndex((menu) => menu.id === updatedMenu.id);
  if (menuIndex !== -1) {
    menuData[menuIndex] = updatedMenu;
  }
};

export default menuData;
