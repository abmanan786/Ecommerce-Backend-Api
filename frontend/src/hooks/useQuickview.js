import { useState } from "react";
import { fetchProductById } from "../api/productApi";

export const useQuickView = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  // ✅ fallbackProduct optional (FeaturedProducts me card data show ho jayega while full loads)
  const openQuickView = async (id, fallbackProduct = null) => {
    setOpen(true);
    setLoading(true);
    setProduct(fallbackProduct);

    try {
      const full = await fetchProductById(id);
      setProduct(full);
    } catch (e) {
      console.error("Quick view load failed:", e);
      // fallback already set, so keep it
    } finally {
      setLoading(false);
    }
  };

  const closeQuickView = () => {
    setOpen(false);
    setLoading(false);
    setProduct(null);
  };

  return { open, loading, product, openQuickView, closeQuickView };
};
