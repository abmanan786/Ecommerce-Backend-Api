// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/pages/Shop.jsx
// 📌 PURPOSE: Main Shop Page - Clean & Simple
// ═══════════════════════════════════════════════════════════════════

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { CartContext } from "../context/AddCartContext";

// API
import { fetchProductById } from "../api/productApi";

// Hooks
import useShopProducts from "../hooks/useShopProducts";

// Utils
import { ITEMS_PER_PAGE } from "../utils/shopHelpers";

// Components
import ShopHeader from "../components/shop/ShopHeader";
import ShopFilters from "../components/shop/ShopFilters";
import {
  ProductCard,
  ProductSkeleton,
  EmptyState,
} from "../components/shop/ProductCard";
import FilterDrawer from "../components/shop/FilterDrawer";
import Pagination from "../components/shop/Pagination";
import QuickViewModal from "../components/QuickViewModal";

const Shop = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // ─────────────────────────────────────────────────────────────
  // PRODUCTS & FILTERS (from custom hook)
  // ─────────────────────────────────────────────────────────────

  const {
    products,
    loading,
    totalProducts,
    totalPages,
    search,
    category,
    brand,
    page,
    hasFilters,
    setSearch,
    setCategory,
    setBrand,
    setPage,
    clearFilters,
  } = useShopProducts();

  // ─────────────────────────────────────────────────────────────
  // MOBILE FILTER DRAWER
  // ─────────────────────────────────────────────────────────────

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    clearFilters();
    setIsFilterOpen(false);
  };

  // ─────────────────────────────────────────────────────────────
  // QUICK VIEW MODAL
  // ─────────────────────────────────────────────────────────────

  const [qvOpen, setQvOpen] = useState(false);
  const [qvLoading, setQvLoading] = useState(false);
  const [qvProduct, setQvProduct] = useState(null);

  const openQuickView = async (productId) => {
    setQvOpen(true);
    setQvLoading(true);
    try {
      const product = await fetchProductById(productId);
      setQvProduct(product);
    } catch (error) {
      setQvProduct(null);
    } finally {
      setQvLoading(false);
    }
  };

  const closeQuickView = () => {
    setQvOpen(false);
    setQvProduct(null);
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <section className="min-h-screen bg-white">
      {/* Header Banner */}
      <ShopHeader totalProducts={totalProducts} />

      {/* Filters Bar */}
      <ShopFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        hasFilters={hasFilters}
        clearFilters={clearFilters}
        onOpenMobileFilters={() => setIsFilterOpen(true)}
      />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Results Count */}
        {!loading && products.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {(page - 1) * ITEMS_PER_PAGE + 1} -{" "}
                {Math.min(page * ITEMS_PER_PAGE, totalProducts)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {totalProducts}
              </span>{" "}
              products
            </p>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <EmptyState onClear={clearFilters} />
        )}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                onQuickView={openQuickView}
                onOpenProduct={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        open={qvOpen}
        onClose={closeQuickView}
        product={qvProduct}
        loading={qvLoading}
        onAddToCart={addToCart}
        onViewDetails={() => {
          if (qvProduct?.id) navigate(`/product/${qvProduct.id}`);
          closeQuickView();
        }}
      />
    </section>
  );
};

export default Shop;