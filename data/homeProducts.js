const BASE = "https://ecommerce-backend-api-production-9628.up.railway.app";

const homeProducts = [
  {
    id: 1,
    name: "3 In 1 Numeral Watch",
    image: `${BASE}/images/product1.jpg`,
    images: [
      `${BASE}/images/product1.jpg`,
      `${BASE}/images/product10.jpg`,
      `${BASE}/images/product11.jpg`,
      `${BASE}/images/product12.jpg`,
    ],
    price: "£15.00",
    isNew: true,
    description:
      "A versatile timepiece featuring three distinct numeral styles on its elegant dial, perfect for every occasion. With a durable strap and precise quartz movement, it's a blend of classic design and modern functionality.",
  },
  {
    id: 2,
    name: "Black & Red Numeral",
    image: `${BASE}/images/product2.jpg`,
    images: [
      `${BASE}/images/product2.jpg`,
      `${BASE}/images/product13.jpg`,
      `${BASE}/images/product14.jpg`,
      `${BASE}/images/product15.jpg`,
    ],
    price: "£35.00",
    isNew: true,
    description:
      "Bold and striking, this watch combines a deep black dial with vibrant red numerals and accents. Its sporty yet sophisticated look makes it an ideal accessory for those who appreciate a dynamic style.",
  },
  {
    id: 3,
    name: "Black Dial Leather Strap",
    image: `${BASE}/images/product3.jpg`,
    images: [
      `${BASE}/images/product3.jpg`,
      `${BASE}/images/product16.jpg`,
      `${BASE}/images/product17.jpg`,
      `${BASE}/images/product18.jpg`,
    ],
    price: "£35.00",
    isNew: true,
    description:
      "Elegance meets comfort with this classic watch featuring a sleek black dial and a genuine leather strap. Its minimalist design ensures it pairs effortlessly with both formal and casual attire, a true timeless piece.",
  },
  {
    id: 4,
    name: "Classic Steel Chronograph",
    image: `${BASE}/images/product4.jpg`,
    images: [
      `${BASE}/images/product4.jpg`,
      `${BASE}/images/product10.jpg`,
      `${BASE}/images/product12.jpg`,
      `${BASE}/images/product14.jpg`,
    ],
    price: "£45.00",
    isNew: false,
    description:
      "A robust chronograph crafted from polished stainless steel, designed for precision and durability. With multiple sub-dials and a strong case, it's perfect for the modern adventurer.",
  },
  {
    id: 5,
    name: "Vintage Pilot Watch",
    image: `${BASE}/images/product5.jpg`,
    images: [
      `${BASE}/images/product5.jpg`,
      `${BASE}/images/product11.jpg`,
      `${BASE}/images/product13.jpg`,
      `${BASE}/images/product16.jpg`,
    ],
    price: "£55.00",
    isNew: true,
    description:
      "Inspired by classic aviation, this pilot watch features an oversized dial with luminous hands and markers for easy readability. Its sturdy build and vintage aesthetic make it a collector's item.",
  },
  {
    id: 6,
    name: "Minimalist Ultra-Thin",
    image: `${BASE}/images/product6.jpg`,
    images: [
      `${BASE}/images/product6.jpg`,
      `${BASE}/images/product15.jpg`,
      `${BASE}/images/product17.jpg`,
      `${BASE}/images/product18.jpg`,
    ],
    price: "£25.00",
    isNew: false,
    description:
      "Experience sleek simplicity with this ultra-thin watch. Its minimalist design, clean dial, and comfortable mesh strap offer a refined look for everyday wear, emphasizing understated elegance.",
  },
  {
    id: 7,
    name: "Luxury Diver's Watch",
    image: `${BASE}/images/product7.jpg`,
    images: [
      `${BASE}/images/product7.jpg`,
      `${BASE}/images/product12.jpg`,
      `${BASE}/images/product14.jpg`,
      `${BASE}/images/product16.jpg`,
    ],
    price: "£120.00",
    isNew: true,
    description:
      "Built for the depths, this luxury diver's watch boasts exceptional water resistance, a unidirectional bezel, and a robust build. Its luminous display ensures visibility even in the darkest underwater environments.",
  },
  {
    id: 8,
    name: "Smartwatch with Health Tracker",
    image: `${BASE}/images/product8.jpg`,
    images: [
      `${BASE}/images/product8.jpg`,
      `${BASE}/images/product10.jpg`,
      `${BASE}/images/product15.jpg`,
      `${BASE}/images/product18.jpg`,
    ],
    price: "£99.00",
    isNew: true,
    description:
      "Stay connected and track your fitness with this advanced smartwatch. Featuring heart rate monitoring, step tracking, and smart notifications, it seamlessly integrates into your active lifestyle.",
  },
  {
    id: 9,
    name: "Elegant Ceramic Chronograph",
    image: `${BASE}/images/product9.jpg`,
    images: [
      `${BASE}/images/product9.jpg`,
      `${BASE}/images/product11.jpg`,
      `${BASE}/images/product13.jpg`,
      `${BASE}/images/product17.jpg`,
    ],
    price: "£150.00",
    isNew: false,
    description:
      "A sophisticated chronograph crafted with high-tech ceramic, offering scratch resistance and a luxurious feel. Its polished finish and intricate dial details exude modern elegance and high performance.",
  },
];

module.exports = homeProducts;
