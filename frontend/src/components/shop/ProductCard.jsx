// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/components/shop/ProductCard.jsx
// 📌 PURPOSE: Product card + Skeleton + Empty state
// ═══════════════════════════════════════════════════════════════════

import { useState } from "react";
import { ShoppingCart, Heart, Eye, Loader2, Check, Package } from "lucide-react";
import { cn, getImageUrl, FALLBACK_IMG } from "../../utils/shopHelpers";

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────

export const ProductCard = ({ product, onOpenProduct, onQuickView, addToCart }) => {
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
    onQuickView(product.id);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenProduct}
      className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Image Container */}
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

        {/* Wishlist Button */}
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

        {/* Hover Actions */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/50 to-transparent flex items-center justify-center gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          {/* Add to Cart */}
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

          {/* Quick View */}
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

// ─────────────────────────────────────────────────────────────
// SKELETON (Loading)
// ─────────────────────────────────────────────────────────────

export const ProductSkeleton = () => (
  <div className="bg-white rounded-xl border overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-200" />
    <div className="p-3 sm:p-4 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// EMPTY STATE (No products)
// ─────────────────────────────────────────────────────────────

export const EmptyState = ({ onClear }) => (
  <div className="col-span-full py-16 text-center">
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
      <Package className="text-gray-400" size={28} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
    <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters</p>
    <button onClick={onClear} className="text-sm text-[#b99c79] hover:underline font-medium">
      Clear all filters
    </button>
  </div>
);

export default ProductCard;