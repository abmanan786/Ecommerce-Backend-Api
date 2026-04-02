/**
 * Parse price string to number
 * @param {string|number} price - Price value
 * @returns {number} - Parsed price
 */
export const parsePrice = (price) => {
  if (!price) return 0;

  const cleaned = String(price).replace(/[^\d.]/g, "");
  const parsed = Number(cleaned);

  return Number.isNaN(parsed) ? 0 : parsed;
};

/**
 * Format price with currency symbol
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency symbol
 * @returns {string} - Formatted price
 */
export const formatPrice = (amount, currency = "£") => {
  return `${currency}${amount.toFixed(2)}`;
};
