// ═══════════════════════════════════════════════════════════════════
// 📌 PURPOSE: All constants, helpers, utilities & animations
// ═══════════════════════════════════════════════════════════════════

import BASE_URL from "../api/config";

// ─────────────────────────────────────────────────────────────
// ROOT URL
// ─────────────────────────────────────────────────────────────

const ROOT = BASE_URL.endsWith("/api")
  ? BASE_URL.replace(/\/api$/, "")
  : BASE_URL;

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

export const FALLBACK_IMG =
  "https://placehold.co/200x200/f3f4f6/9ca3af?text=Product";

export const CONFETTI_COLORS = [
  "#b99c79",
  "#d4b896",
  "#FFD700",
  "#FFA500",
  "#FF6B6B",
  "#4ECDC4",
];

export const ORDER_STEPS = [
  { id: "placed", label: "Order Placed", status: "completed", time: "Just now" },
  { id: "processing", label: "Processing", status: "current", time: "Est. 1-2 hours" },
  { id: "shipped", label: "Shipped", status: "pending", time: "Est. 1-2 days" },
  { id: "delivered", label: "Delivered", status: "pending", time: "Est. 3-5 days" },
];

export const PAYMENT_LABELS = {
  cod: "Cash on Delivery",
  card: "Card (Demo)",
};

export const SUPPORT = {
  email: "support@example.com",
  hours: "Mon–Sat • 10am–6pm",
};

// ─────────────────────────────────────────────────────────────
// PRICE HELPERS
// ─────────────────────────────────────────────────────────────

export const parsePrice = (price) => {
  if (!price) return 0;
  const n = Number(String(price).replace(/[^\d.]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};

export const money = (n) => `£${Number(n || 0).toFixed(2)}`;

// ─────────────────────────────────────────────────────────────
// IMAGE HELPERS
// ─────────────────────────────────────────────────────────────

export const resolveImg = (img) => {
  if (!img) return FALLBACK_IMG;
  if (img.startsWith("http")) return img;
  if (img.startsWith("/")) return `${ROOT}${img}`;
  return `${ROOT}/images/${img}`;
};

export const handleImgError = (e) => {
  e.currentTarget.src = FALLBACK_IMG;
};

// ─────────────────────────────────────────────────────────────
// STATUS HELPERS
// ─────────────────────────────────────────────────────────────

export const getStatusStyle = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-500 text-white";
    case "current":
      return "bg-[#b99c79] text-white animate-pulse";
    default:
      return "bg-gray-100 text-gray-400";
  }
};

// ─────────────────────────────────────────────────────────────
// ANIMATIONS (Framer Motion)
// ─────────────────────────────────────────────────────────────

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, delay },
});

export const scaleIn = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { type: "spring", duration: 0.6 },
};

export const pulseAnim = {
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.5, 0.3],
};