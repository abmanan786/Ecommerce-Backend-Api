import { useEffect, useState } from "react";
import { fetchHomeProducts } from "../api/productApi";

export const useHomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchHomeProducts();
        if (!mounted) return;
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Failed to load products");
      } finally {
        mounted && setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading, error };
};