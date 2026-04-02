import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Shield } from "lucide-react";

import { CartContext } from "../context/AddCartContext";

// Hooks
import { useCartProducts } from "../hooks/useCartProducts";
import { useCartCalculations } from "../hooks/useCartCalculations";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { usePlaceOrder } from "../hooks/usePlaceOrder";

// Components
import CustomerInfoForm from "../components/checkout/CustomerInfoForm";
import ShippingAddressForm from "../components/checkout/ShippingAddressForm";
import PaymentMethodSelect from "../components/checkout/PaymentMethodSelect";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);

  // Load product details
  const { productMap, loading: loadingDetails } = useCartProducts(cart);

  // Calculate totals
  const calculations = useCartCalculations(cart, productMap);
  const totals = {
    subtotal: calculations.subtotal,
    shipping: calculations.shipping,
    tax: calculations.tax,
    total: calculations.total,
  };

  // Form state
  const {
    form,
    errors,
    paymentMethod,
    setPaymentMethod,
    handleChange,
    validate,
  } = useCheckoutForm();

  // Order placement
  const {
    placing,
    error: submitError,
    createdOrderId,
    placeOrder,
    clearError,
  } = usePlaceOrder(clearCart);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart?.length && !placing && !createdOrderId) {
      navigate("/cart");
    }
  }, [cart, placing, createdOrderId, navigate]);

  // Clear error when form changes
  useEffect(() => {
    clearError();
  }, [form, clearError]);

  // Handle order placement
  const handlePlaceOrder = () => {
    placeOrder({
      form,
      paymentMethod,
      cart,
      productMap,
      totals,
      validateForm: validate,
    });
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <CheckoutHeader />

        {/* Error Alert */}
        {submitError && <ErrorAlert message={submitError} />}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Forms */}
          <div className="lg:col-span-2 space-y-6">
            <CustomerInfoForm
              form={form}
              errors={errors}
              onChange={handleChange}
            />

            <ShippingAddressForm
              form={form}
              errors={errors}
              onChange={handleChange}
            />

            <PaymentMethodSelect
              selected={paymentMethod}
              onChange={setPaymentMethod}
            />

            {/* Security Badge - Mobile */}
            <SecurityBadge className="lg:hidden" />
          </div>

          {/* Right: Summary */}
          <div className="space-y-4">
            <CheckoutSummary
              cart={cart || []}
              productMap={productMap}
              loading={loadingDetails}
              totals={totals}
              placing={placing}
              onPlaceOrder={handlePlaceOrder}
            />

            {/* Security Badge - Desktop */}
            <SecurityBadge className="hidden lg:flex" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-components

const CheckoutHeader = () => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
    <div>
      <p className="uppercase tracking-[0.35em] text-gray-400 text-xs mb-2">
        Secure Checkout
      </p>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        Checkout
      </h1>
      <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
        <Lock size={16} className="text-[#b99c79]" />
        Your information is protected & secure.
      </p>
    </div>

    <Link
      to="/cart"
      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition"
    >
      <ArrowLeft size={16} />
      Back to Cart
    </Link>
  </div>
);

const ErrorAlert = ({ message }) => (
  <div className="mb-6 border border-red-200 bg-red-50 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
    <div className="w-2 h-2 rounded-full bg-red-500" />
    {message}
  </div>
);

const SecurityBadge = ({ className = "" }) => (
  <div
    className={`items-center gap-3 p-4 bg-white rounded-xl border ${className}`}
  >
    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
      <Shield size={20} className="text-green-600" />
    </div>
    <div>
      <p className="font-semibold text-gray-900 text-sm">Secure Checkout</p>
      <p className="text-xs text-gray-500">Your data is encrypted and secure</p>
    </div>
  </div>
);

export default Checkout;