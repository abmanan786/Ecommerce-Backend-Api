import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/orderApi";

/**
 * Custom hook for order placement logic
 * @param {Function} clearCart - Clear cart function from context
 * @returns {Object} - Order placement state and handlers
 */
export const usePlaceOrder = (clearCart) => {
  const navigate = useNavigate();

  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState(null);

  /**
   * Clear any existing error
   */
  const clearError = useCallback(() => {
    setError("");
  }, []);

  /**
   * Build order payload
   */
  const buildOrderPayload = useCallback((form, paymentMethod, cart, totals) => {
    return {
      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
      },
      address: {
        address1: form.address1,
        city: form.city,
        postalCode: form.postalCode,
      },
      paymentMethod,
      items: cart,
      totals,
      notes: form.notes,
    };
  }, []);

  /**
   * Build order data for success page
   */
  const buildSuccessPageData = useCallback(
    (orderId, form, paymentMethod, cart, productMap, totals) => {
      const itemsWithDetails = cart.map((item) => {
        const product = productMap[item.id];
        return {
          id: item.id,
          quantity: item.quantity || 1,
          name: product?.name || `Product #${item.id}`,
          image: product?.images?.[0] || product?.image || "",
          price: product?.price || "£0.00",
        };
      });

      return {
        id: orderId,
        paymentMethod,
        customer: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
        },
        address: {
          address1: form.address1,
          city: form.city,
          postalCode: form.postalCode,
        },
        items: itemsWithDetails,
        totals,
      };
    },
    [],
  );

  /**
   * Place order
   */
  const placeOrder = useCallback(
    async ({ form, paymentMethod, cart, productMap, totals, validateForm }) => {
      // Validate form
      if (!validateForm()) {
        setError("Please fill all required fields correctly.");
        return false;
      }

      setPlacing(true);
      setError("");

      try {
        // Build and send payload
        const payload = buildOrderPayload(form, paymentMethod, cart, totals);
        const response = await createOrder(payload);

        const orderId = response.order.id;
        setCreatedOrderId(orderId);

        // Build success page data
        const orderForSuccessPage = buildSuccessPageData(
          orderId,
          form,
          paymentMethod,
          cart,
          productMap,
          totals,
        );

        // Clear cart
        await clearCart();

        // Navigate to success page
        navigate(`/order-success/${orderId}`, {
          state: { order: orderForSuccessPage },
        });

        return true;
      } catch (err) {
        console.error("Order placement failed:", err);
        setError("Failed to place order. Please try again.");
        return false;
      } finally {
        setPlacing(false);
      }
    },
    [navigate, clearCart, buildOrderPayload, buildSuccessPageData],
  );

  return {
    placing,
    error,
    createdOrderId,
    placeOrder,
    clearError,
    setError,
  };
};

export default usePlaceOrder;
