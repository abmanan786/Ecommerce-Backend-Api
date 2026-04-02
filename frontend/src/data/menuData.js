// src/data/menuData.js

// Dummy data, aap isko apne real data se replace kar sakte hain.
export const megaMenuData = {
  SHOP: {
    columns: [
      {
        title: "FEATURED",
        items: ["New Arrivals", "Best Sellers", "Sale", "Gift Cards"],
      },
      {
        title: "CLOTHING",
        items: ["T-Shirts", "Shirts", "Pants", "Jackets", "Hoodies"],
      },
      { title: "ACCESSORIES", items: ["Bags", "Belts", "Hats", "Sunglasses"] },
    ],
    images: [
      {
        src: "https://swisseagle.wpenginepowered.com/wp-content/uploads/2017/10/dropdown_1.jpg",
        alt: "Shop Image 1",
      },
      {
        src: "https://swisseagle.wpenginepowered.com/wp-content/uploads/2017/10/dropdown_1.jpg",
        alt: "Shop Image 2",
      },
    ],
  },
  WATCH: {
    columns: [
      {
        title: "PHILIPPE PATEK",
        items: [
          "Fancy analog",
          "Unique Arrival",
          "Oboy Analog",
          "Bell and Ross",
        ],
      },
      {
        title: "GOLD ANALOG",
        items: [
          "Breguet Watch",
          "Breitling Watch",
          "Christopher Ward",
          "Dietrich Watch",
        ],
      },
      {
        title: "SILVER IIK",
        items: [
          "Festina watches",
          "Girard Perregaux",
          "Gorg Jensen",
          "De Grisogono",
        ],
      },
    ],
    images: [
      {
        src: "https://swisseagle.wpenginepowered.com/wp-content/uploads/2017/10/dropdown_2.jpg",
        alt: "Watch Image 1",
      },
      {
        src: "https://swisseagle.wpenginepowered.com/wp-content/uploads/2017/10/dropdown_3.jpg",
        alt: "Watch Image 2",
      },
    ],
  },
  MODELS: {
    columns: [
      {
        title: "CLASSIC MODELS",
        items: ["Heritage", "Classic Fusion", "Legacy"],
      },
      {
        title: "SPORT MODELS",
        items: ["Chrono Sport", "Diver Pro", "Racer GT"],
      },
      { title: "LUXURY MODELS", items: ["Elegance", "Prestige", "Royale"] },
    ],
    images: [
      {
        src: "https://swisseagle.wpenginepowered.com/wp-content/uploads/2017/10/bottom_1.jpg",
        alt: "Model Image 1",
      },
      {
        src: "https://swisseagle.wpenginepowered.com/wp-content/uploads/2017/10/bottom_2.jpg",
        alt: "Model Image 2",
      },
    ],
  },
  BRANDS: {
    columns: [
      {
        title: "SWISS LUXURY",
        items: ["Rolex", "Patek Philippe", "Omega", "Audemars Piguet"],
      },
      {
        title: "GERMAN PRECISION",
        items: ["A. Lange & Söhne", "Glashütte Original", "Nomos"],
      },
      {
        title: "JAPANESE INNOVATION",
        items: ["Grand Seiko", "Seiko", "Citizen", "Casio"],
      },
    ],
    images: [
      {
        src: "https://swisseagle.wpenginepowered.com/wp-content/uploads/2017/10/dropdown_5.jpg",
        alt: "Brand Image 1",
      },
      {
        src: "https://swisseagle.wpenginepowered.com/wp-content/uploads/2017/10/dropdown_6.jpg",
        alt: "Brand Image 2",
      },
    ],
  },
};

export const navItems = [
  { name: "HOME", path: "/", hasMegaMenu: false },
  { name: "SHOP", path: "/shop", hasMegaMenu: true },
  { name: "WATCH", path: "/watches", hasMegaMenu: true },
  { name: "MODELS", path: "/models", hasMegaMenu: true },
  { name: "BRANDS", path: "/brands", hasMegaMenu: true },
  { name: "SHOP STYLES", path: "/shop-styles", hasMegaMenu: true },
];
