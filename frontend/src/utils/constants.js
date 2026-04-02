// Image fallbacks
export const FALLBACK_IMG =
  "https://placehold.co/300x300/f3f4f6/9ca3af?text=Product";

// Cart settings
export const CART_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 200,
  SHIPPING_COST: 9.99,
  TAX_RATE: 0.02,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 99,
};

// Checkout form initial state
export const CHECKOUT_INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  address1: "",
  city: "",
  postalCode: "",
  notes: "",
};

// Payment methods
export const PAYMENT_METHODS = {
  COD: "cod",
  CARD: "card",
};

export const PAYMENT_OPTIONS = [
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when you receive the order.",
    recommended: true,
  },
  {
    id: "card",
    name: "Card (Demo)",
    description: "Card payments can be integrated later (Stripe).",
    recommended: false,
  },
];
