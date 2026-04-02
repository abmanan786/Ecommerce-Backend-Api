import { useMemo } from "react";
import { parsePrice } from "../utils/price";
import { CART_CONFIG } from "../utils/constants";

/**
 * Custom hook to calculate cart totals
 * @param {Array} cart - Cart items array
 * @param {Object} productMap - Product details map
 * @returns {Object} - { subtotal, shipping, tax, total }
 */
export const useCartCalculations = (cart, productMap) => {
  const subtotal = useMemo(() => {
    return (cart || []).reduce((sum, item) => {
      const product = productMap[item.id];
      const price = parsePrice(product?.price);
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);
  }, [cart, productMap]);

  const shipping = useMemo(() => {
    if (!cart?.length) return 0;
    if (subtotal >= CART_CONFIG.FREE_SHIPPING_THRESHOLD) return 0;
    return CART_CONFIG.SHIPPING_COST;
  }, [subtotal, cart?.length]);

  const tax = useMemo(() => {
    return subtotal * CART_CONFIG.TAX_RATE;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + shipping + tax;
  }, [subtotal, shipping, tax]);

  const itemCount = useMemo(() => {
    return (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cart]);

  return {
    subtotal,
    shipping,
    tax,
    total,
    itemCount,
    isFreeShipping: shipping === 0 && cart?.length > 0,
    amountToFreeShipping: Math.max(
      0,
      CART_CONFIG.FREE_SHIPPING_THRESHOLD - subtotal,
    ),
  };
};

export default useCartCalculations;
