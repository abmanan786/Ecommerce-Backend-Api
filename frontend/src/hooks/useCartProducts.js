import { useState, useEffect } from "react";
import { fetchProductById } from "../api/productApi";

/**
 * Custom hook to load product details for cart items
 * @param {Array} cart - Cart items array
 * @returns {Object} - { productMap, loading, error }
 */
export const useCartProducts = (cart) => {
  const [productMap, setProductMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      if (!cart?.length) {
        setProductMap({});
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const uniqueIds = [...new Set(cart.map((item) => item.id))];

        const results = await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const product = await fetchProductById(id);
              return [id, product];
            } catch (err) {
              console.error(`Failed to load product ${id}:`, err);
              return [id, null];
            }
          }),
        );

        const map = Object.fromEntries(results.filter(([, p]) => p !== null));
        setProductMap(map);
      } catch (err) {
        console.error("Cart products load failed:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [cart]);

  return { productMap, loading, error };
};

export default useCartProducts;
