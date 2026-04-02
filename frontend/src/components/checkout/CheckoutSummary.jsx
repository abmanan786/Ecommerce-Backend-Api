import { ShoppingBag, Loader2 } from "lucide-react";
import { formatPrice, parsePrice } from "../../utils/price";
import { FALLBACK_IMG } from "../../utils/constants";

const CheckoutSummary = ({
  cart,
  productMap,
  loading,
  totals,
  placing,
  onPlaceOrder,
}) => {
  const { subtotal, shipping, tax, total } = totals;

  return (
    <div className="border rounded-2xl p-5 bg-[#fafafa] h-fit sticky top-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#f7f3ee] flex items-center justify-center">
          <ShoppingBag size={16} className="text-[#b99c79]" />
        </div>
        <h2 className="text-lg font-extrabold text-gray-900">Order Summary</h2>
      </div>

      {/* Items List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {cart.map((item) => (
          <CheckoutItem
            key={item.id}
            item={item}
            product={productMap[item.id]}
          />
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-500 py-2">
            <Loader2 size={14} className="animate-spin" />
            Loading details...
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t my-4" />

      {/* Totals */}
      <div className="space-y-2.5 text-sm">
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow
          label="Shipping"
          value={shipping === 0 ? "Free" : formatPrice(shipping)}
          highlight={shipping === 0}
        />
        <SummaryRow label="Tax (2%)" value={formatPrice(tax)} />

        <div className="border-t pt-3 flex justify-between">
          <span className="font-extrabold text-gray-900">Total</span>
          <span className="font-extrabold text-gray-900 text-lg">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={placing}
        className={`
          mt-5 w-full py-3.5 rounded-xl font-semibold transition-all
          flex items-center justify-center gap-2
          ${
            placing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-[#b99c79]"
          }
        `}
      >
        {placing ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Placing order...
          </>
        ) : (
          "Place Order"
        )}
      </button>

      {/* Terms */}
      <p className="text-xs text-gray-500 mt-3 text-center">
        By placing order, you agree to our terms & conditions.
      </p>
    </div>
  );
};

const CheckoutItem = ({ item, product }) => {
  const image = product?.images?.[0] || product?.image || FALLBACK_IMG;
  const name = product?.name || `Product #${item.id}`;
  const quantity = item.quantity || 1;
  const lineTotal = parsePrice(product?.price) * quantity;

  return (
    <div className="flex items-start gap-3">
      {/* Image */}
      <div className="w-14 h-14 rounded-lg bg-white border overflow-hidden shrink-0">
        <img
          src={image}
          alt={name}
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate">{name}</p>
        <p className="text-xs text-gray-500">Qty: {quantity}</p>
      </div>

      {/* Price */}
      <p className="font-semibold text-gray-900 text-sm">
        {formatPrice(lineTotal)}
      </p>
    </div>
  );
};

const SummaryRow = ({ label, value, highlight = false }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span
      className={`font-semibold ${highlight ? "text-green-600" : "text-gray-900"}`}
    >
      {value}
    </span>
  </div>
);

export default CheckoutSummary;
