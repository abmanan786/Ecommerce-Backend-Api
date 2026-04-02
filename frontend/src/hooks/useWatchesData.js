import { useEffect, useState } from "react";
import { fetchShopProducts } from "../api/productApi";

const normalizeList = (data) => (Array.isArray(data) ? data : data?.products || []);

export const useWatchesData = () => {
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const f = await fetchShopProducts({ page: 1, limit: 8 });
        const listF = normalizeList(f);

        const n = await fetchShopProducts({ page: 1, limit: 30 });
        const listN = normalizeList(n);

        if (!mounted) return;

        setFeatured(listF.slice(0, 8));
        setNewArrivals(listN.filter((p) => p?.isNew).slice(0, 8));
      } catch (e) {
        console.error("Watches load failed:", e);
        if (!mounted) return;
        setFeatured([]);
        setNewArrivals([]);
      } finally {
        mounted && setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { featured, newArrivals, loading };
};