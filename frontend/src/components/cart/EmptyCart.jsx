import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="border rounded-2xl p-10 bg-white text-center">
        {/* Icon */}
        <div className="mx-auto w-14 h-14 rounded-full bg-[#f7f3ee] flex items-center justify-center mb-4">
          <ShoppingBag className="text-[#b99c79]" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-extrabold text-gray-900">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Looks like you haven't added anything yet. Explore our collection and
          pick your favorites.
        </p>

        {/* CTA Button */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-[#b99c79] transition font-semibold"
        >
          Continue Shopping
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;