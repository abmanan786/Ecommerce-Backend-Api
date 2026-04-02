import { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";

// Default order structure
const DEFAULT_ORDER = {
  id: "—",
  paymentMethod: "cod",
  customer: { fullName: "Customer", phone: "—", email: "—" },
  address: { address1: "—", city: "—", postalCode: "—" },
  items: [],
  totals: { subtotal: 0, shipping: 0, tax: 0, total: 0 },
};

/**
 * Parse price string to number
 */
const parsePrice = (price) => {
  if (!price) return 0;
  const n = Number(String(price).replace(/[^\d.]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};

/**
 * Custom hook for processing order data
 */
export const useOrderData = () => {
  const { id } = useParams();
  const location = useLocation();
  const stateOrder = location.state?.order;

  // Get order from state or use default
  const order = useMemo(() => {
    if (stateOrder) return stateOrder;
    return { ...DEFAULT_ORDER, id: id || DEFAULT_ORDER.id };
  }, [stateOrder, id]);

  // Check if order has items
  const hasItems = useMemo(() => {
    return Array.isArray(order.items) && order.items.length > 0;
  }, [order.items]);

  // Item count
  const itemCount = useMemo(() => {
    if (!hasItems) return 0;
    return order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [order.items, hasItems]);

  // Compute totals
  const totals = useMemo(() => {
    if (order.totals?.total) return order.totals;

    const subtotal = hasItems
      ? order.items.reduce(
          (sum, item) => sum + parsePrice(item.price) * (item.quantity || 1),
          0,
        )
      : 0;

    const shipping = hasItems ? (subtotal > 200 ? 0 : 9.99) : 0;
    const tax = subtotal * 0.02;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  }, [order.totals, order.items, hasItems]);

  return {
    order,
    orderId: order.id,
    hasItems,
    itemCount,
    totals,
    isDirectAccess: !stateOrder,
    customer: order.customer,
    address: order.address,
    paymentMethod: order.paymentMethod,
    items: order.items || [],
  };
};

export default useOrderData;
