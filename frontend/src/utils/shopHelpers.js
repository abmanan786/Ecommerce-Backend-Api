// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/utils/shopHelpers.js
// 📌 PURPOSE: Shop page ke liye constants aur helper functions
// ═══════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// API & IMAGE CONSTANTS
// ─────────────────────────────────────────────────────────────

export const BACKEND_URL =
  "https://ecommerce-backend-api-production-9628.up.railway.app";
export const FALLBACK_IMG =
  "https://placehold.co/600x600/f5f5f5/999999?text=No+Image";
export const ITEMS_PER_PAGE = 12;

// ─────────────────────────────────────────────────────────────
// FILTER OPTIONS
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
];

export const BRANDS = [
  { value: "", label: "All Brands" },
  { value: "Rolex", label: "Rolex" },
  { value: "Casio", label: "Casio" },
  { value: "Apple", label: "Apple" },
  { value: "Samsung", label: "Samsung" },
];

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────

/**
 * Multiple classes ko join karta hai
 * Example: cn("text-red", isActive && "bg-blue") → "text-red bg-blue"
 */
export const cn = (...classes) => classes.filter(Boolean).join(" ");

/**
 * Image URL ko proper format mein convert karta hai
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return FALLBACK_IMG;
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return `${BACKEND_URL}${imagePath}`;
  return `${BACKEND_URL}/images/${imagePath}`;
};

/**
 * Image error handle karta hai
 */
export const handleImageError = (e) => {
  e.currentTarget.src = FALLBACK_IMG;
};
