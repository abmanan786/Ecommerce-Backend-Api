// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/hooks/useShopProducts.js
// 📌 PURPOSE: Products fetch karna + Filter state manage karna
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL, ITEMS_PER_PAGE } from "../utils/shopHelpers";

const useShopProducts = () => {
  // ─────────────────────────────────────────────────────────────
  // PRODUCTS STATE
  // ─────────────────────────────────────────────────────────────

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  // ─────────────────────────────────────────────────────────────
  // FILTER STATE
  // ─────────────────────────────────────────────────────────────

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [page, setPage] = useState(1);

  // ─────────────────────────────────────────────────────────────
  // COMPUTED VALUES
  // ─────────────────────────────────────────────────────────────

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const hasFilters = Boolean(search || category || brand);

  // ─────────────────────────────────────────────────────────────
  // FETCH PRODUCTS
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${BACKEND_URL}/api/products-shop`, {
          params: { search, category, brand, page, limit: ITEMS_PER_PAGE },
        });

        setProducts(response.data.products || []);
        setTotalProducts(response.data.total || 0);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, category, brand, page]);

  // ─────────────────────────────────────────────────────────────
  // FILTER ACTIONS
  // ─────────────────────────────────────────────────────────────

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategory("");
    setBrand("");
    setPage(1);
  }, []);

  const updateSearch = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const updateCategory = useCallback((value) => {
    setCategory(value);
    setPage(1);
  }, []);

  const updateBrand = useCallback((value) => {
    setBrand(value);
    setPage(1);
  }, []);

  const updatePage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // RETURN
  // ─────────────────────────────────────────────────────────────

  return {
    // Data
    products,
    loading,
    totalProducts,
    totalPages,

    // Filter values
    search,
    category,
    brand,
    page,
    hasFilters,

    // Actions
    setSearch: updateSearch,
    setCategory: updateCategory,
    setBrand: updateBrand,
    setPage: updatePage,
    clearFilters,
  };
};

export default useShopProducts;
