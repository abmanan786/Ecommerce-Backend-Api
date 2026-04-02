import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Truck } from "lucide-react";
import { formatPrice } from "../../utils/price";

const OrderSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  isFreeShipping,
  amountToFreeShipping,
}) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="border rounded-2xl p-5 bg-[#fafafa] h-fit sticky top-4">
      <h2 className="text-lg font-extrabold text-gray-900">Order Summary</h2>

      {/* Free Shipping Progress */}
      {!isFreeShipping && amountToFreeShipping > 0 && (
        <div className="mt-4 p-3 bg-[#f7f3ee] rounded-xl">
          <div className="flex items-center gap-2 text-sm">
            <Truck size={16} className="text-[#b99c79]" />
            <span className="text-gray-700">
              Add <strong>{formatPrice(amountToFreeShipping)}</strong> for free
              shipping!
            </span>
          </div>
          <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#b99c79] rounded-full transition-all"
              style={{
                width: `${Math.min(100, (subtotal / 200) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Summary Items */}
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-gray-900">
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (2%)</span>
          <span className="font-semibold text-gray-900">
            {formatPrice(tax)}
          </span>
        </div>

        <div className="border-t pt-3 flex justify-between">
          <span className="text-gray-900 font-bold">Total</span>
          <span className="text-gray-900 font-extrabold text-lg">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        className="mt-5 w-full bg-black text-white py-3 rounded-xl hover:bg-[#b99c79] transition font-semibold"
        type="button"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>

      {/* Terms */}
      <p className="mt-4 text-xs text-gray-500 text-center">
        By proceeding, you agree to our{" "}
        <Link to="/terms" className="underline hover:text-gray-900">
          terms
        </Link>{" "}
        &{" "}
        <Link to="/privacy" className="underline hover:text-gray-900">
          checkout policy
        </Link>
        .
      </p>

      {/* Continue Shopping */}
      <Link
        to="/shop"
        className="mt-5 w-full inline-flex items-center justify-center gap-2 border py-3 rounded-xl hover:bg-white transition font-semibold text-sm"
      >
        Continue Shopping
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default OrderSummary;