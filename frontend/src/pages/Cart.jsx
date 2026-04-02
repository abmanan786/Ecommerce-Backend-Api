import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CartContext } from "../context/AddCartContext";

// Hooks
import { useCartProducts } from "../hooks/useCartProducts";
import { useCartCalculations } from "../hooks/useCartCalculations";

// Components
import EmptyCart from "../components/cart/EmptyCart";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Load product details
  const { productMap, loading } = useCartProducts(cart);

  // Calculate totals
  const calculations = useCartCalculations(cart, productMap);

  // Empty cart state
  if (!cart?.length) {
    return <EmptyCart />;
  }

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <CartHeader itemCount={calculations.itemCount} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                product={productMap[item.id]}
                loading={loading}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Order Summary */}
          <OrderSummary {...calculations} />
        </div>
      </div>
    </section>
  );
};

// Header sub-component (can be extracted if needed)
const CartHeader = ({ itemCount }) => (
  <div className="flex items-end justify-between gap-4 mb-8">
    <div>
      <p className="uppercase tracking-[0.35em] text-gray-400 text-xs mb-2">
        Secure Checkout
      </p>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        Shopping Cart
        {itemCount > 0 && (
          <span className="text-lg font-normal text-gray-500 ml-2">
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
        )}
      </h1>
      <p className="text-sm text-gray-600 mt-2">
        Review your items and proceed to checkout.
      </p>
    </div>

    <Link
      to="/shop"
      className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition"
    >
      Continue Shopping
      <ArrowRight size={16} />
    </Link>
  </div>
);

export default Cart;
