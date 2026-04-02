import { Trash2, Minus, Plus } from "lucide-react";
import { FALLBACK_IMG, CART_CONFIG } from "../../utils/constants";
import { parsePrice, formatPrice } from "../../utils/price";

const CartItem = ({ item, product, loading, onRemove, onUpdateQuantity }) => {
  const { id, quantity = 1 } = item;

  const image = product?.images?.[0] || product?.image || FALLBACK_IMG;
  const title = product?.name || `Product #${id}`;
  const priceText = product?.price || "£0.00";
  const lineTotal = parsePrice(product?.price) * quantity;

  const handleDecrease = () => {
    onUpdateQuantity(id, Math.max(CART_CONFIG.MIN_QUANTITY, quantity - 1));
  };

  const handleIncrease = () => {
    onUpdateQuantity(id, Math.min(CART_CONFIG.MAX_QUANTITY, quantity + 1));
  };

  return (
    <div className="border rounded-2xl p-4 md:p-5 bg-white">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-[#f3f3f3] border overflow-hidden flex items-center justify-center shrink-0">
          <img
            src={image}
            alt={title}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Product</p>
              <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
                {title}
              </h3>
              <p className="text-sm text-[#b99c79] font-semibold mt-1">
                {priceText}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemove(id)}
              className="text-gray-500 hover:text-red-600 transition p-1"
              title="Remove from cart"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Quantity & Line Total */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4">
            {/* Quantity Selector */}
            <div className="inline-flex items-center border rounded-xl overflow-hidden w-fit">
              <button
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition"
                onClick={handleDecrease}
                disabled={quantity <= CART_CONFIG.MIN_QUANTITY}
                type="button"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <div className="w-12 h-10 flex items-center justify-center font-semibold">
                {quantity}
              </div>
              <button
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition"
                onClick={handleIncrease}
                disabled={quantity >= CART_CONFIG.MAX_QUANTITY}
                type="button"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Line Total */}
            <div className="text-sm text-gray-700">
              <span className="text-gray-500">Line total: </span>
              <span className="font-bold text-gray-900">
                {formatPrice(lineTotal)}
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading && !product && (
            <p className="text-xs text-gray-400 mt-3 animate-pulse">
              Loading product details...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
