import { useState, useContext } from "react";
import { ShoppingCart, Heart, Eye, Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/AddCartContext";
import { useHomeProducts } from "../../hooks/useHomeProducts";
import { useQuickView } from "../../hooks/useQuickview";
import QuickViewModal from "../../components/QuickViewModal";
import { FALLBACK_IMG, getImageUrl } from "../../utils/media";

const cn = (...c) => c.filter(Boolean).join(" ");

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT CARD (Same as Shop Page)
// ═══════════════════════════════════════════════════════════════════════════

const ProductCard = ({ product, addToCart, onQuickView, onOpenProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [btnState, setBtnState] = useState("idle"); // idle | loading | success
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (btnState !== "idle") return;

    setBtnState("loading");
    const success = await addToCart(product.id, 1);

    if (success) {
      setBtnState("success");
      setTimeout(() => setBtnState("idle"), 1500);
    } else {
      setBtnState("idle");
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView(product.id, product);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenProduct}
      className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          className={cn(
            "w-full h-full object-contain p-4 transition-transform duration-300",
            isHovered && "scale-105"
          )}
        />

        {/* Wishlist Button - Always Visible */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm border flex items-center justify-center hover:shadow-md transition-shadow"
        >
          <Heart
            size={14}
            className={cn(
              "transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            )}
          />
        </button>

        {/* New Badge */}
        {product.isNew && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-black text-white text-[10px] font-bold uppercase rounded">
            New
          </span>
        )}

        {/* Hover Actions */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/50 to-transparent flex items-center justify-center gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <button
            onClick={handleAddToCart}
            disabled={btnState !== "idle"}
            className={cn(
              "h-9 px-4 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all",
              btnState === "success"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-900 hover:bg-[#b99c79] hover:text-white"
            )}
          >
            {btnState === "idle" && (
              <>
                <ShoppingCart size={14} />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
            {btnState === "loading" && <Loader2 size={14} className="animate-spin" />}
            {btnState === "success" && <Check size={14} />}
          </button>

          <button
            onClick={handleQuickView}
            className="h-9 w-9 rounded-lg bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors"
            title="Quick View"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
          {product.category || "Product"}
        </p>
        <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate mt-0.5 group-hover:text-[#b99c79] transition-colors">
          {product.name}
        </h3>
        <p className="text-[#b99c79] font-semibold mt-1 text-sm sm:text-base">
          {product.price}
        </p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// LOADING SKELETON
// ═══════════════════════════════════════════════════════════════════════════

const ProductSkeleton = () => (
  <div className="bg-white rounded-xl border overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-200" />
    <div className="p-3 sm:p-4 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const FeaturedProducts = () => {
  const { products, loading, error } = useHomeProducts();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const {
    open,
    loading: qvLoading,
    product: qvProduct,
    openQuickView,
    closeQuickView,
  } = useQuickView();

  return (
    <>
      <section className="py-16 sm:py-24 bg-white">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-0.5 bg-gray-800" />
          </div>

          <p className="uppercase tracking-[0.35em] text-gray-400 text-xs sm:text-sm mb-4">
            360° Collection
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-wide">
            <span className="text-[#b99c79] font-light">Featured </span>
            <span className="text-black">Products</span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-10">
              <p className="text-red-500">Something went wrong!</p>
              <p className="text-gray-500 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Products */}
          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
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

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        open={open}
        onClose={closeQuickView}
        product={qvProduct}
        loading={qvLoading}
        onAddToCart={addToCart}
        onViewDetails={() => {
          if (qvProduct?.id) navigate(`/product/${qvProduct.id}`);
          closeQuickView();
        }}
      />
    </>
  );
};

export default FeaturedProducts;