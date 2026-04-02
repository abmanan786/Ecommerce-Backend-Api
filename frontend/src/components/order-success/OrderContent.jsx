// ═══════════════════════════════════════════════════════════════════
// 📌 PURPOSE: Timeline, Items, Summary, Cards, Actions
// ═══════════════════════════════════════════════════════════════════

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import {
  ORDER_STEPS,
  PAYMENT_LABELS,
  SUPPORT,
  money,
  parsePrice,
  resolveImg,
  handleImgError,
  fadeUp,
  fadeLeft,
  getStatusStyle,
} from "../../utils/orderHelpers";

// ─────────────────────────────────────────────────────────────
// STEP ICONS
// ─────────────────────────────────────────────────────────────

const STEP_ICONS = {
  placed: CheckCircle2,
  processing: Package,
  shipped: Truck,
  delivered: Home,
};

// ═══════════════════════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════════════════════

const Timeline = () => (
  <motion.div
    {...fadeUp(0.2)}
    className="border rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-white"
  >
    <div className="flex items-center gap-2 mb-4 sm:mb-6">
      <Clock className="text-[#b99c79]" size={18} />
      <h3 className="text-base sm:text-lg font-bold text-gray-900">
        Order Status
      </h3>
    </div>

    {/* Desktop */}
    <div className="hidden sm:flex items-start justify-between relative">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
        <div className="h-full bg-green-500" style={{ width: "25%" }} />
      </div>
      {ORDER_STEPS.map((step, idx) => {
        const Icon = STEP_ICONS[step.id];
        return (
          <div
            key={step.id}
            className="flex flex-col items-center relative z-10 flex-1"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.15 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusStyle(step.status)}`}
            >
              <Icon size={18} />
            </motion.div>
            <p
              className={`mt-2 text-xs sm:text-sm font-medium text-center ${step.status === "pending" ? "text-gray-400" : "text-gray-900"}`}
            >
              {step.label}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
              {step.time}
            </p>
          </div>
        );
      })}
    </div>

    {/* Mobile */}
    <div className="sm:hidden">
      {ORDER_STEPS.map((step, idx) => {
        const Icon = STEP_ICONS[step.id];
        const isLast = idx === ORDER_STEPS.length - 1;
        return (
          <div key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${getStatusStyle(step.status)}`}
              >
                <Icon size={14} />
              </motion.div>
              {!isLast && (
                <div
                  className={`w-0.5 h-8 ${step.status === "completed" ? "bg-green-500" : "bg-gray-200"}`}
                />
              )}
            </div>
            <div className={isLast ? "" : "pb-6"}>
              <p
                className={`text-sm font-semibold ${step.status === "pending" ? "text-gray-400" : "text-gray-900"}`}
              >
                {step.label}
              </p>
              <p className="text-xs text-gray-500">{step.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════
// ITEMS LIST
// ═══════════════════════════════════════════════════════════════════

const ItemsList = ({ items, itemCount, hasItems }) => (
  <motion.div
    {...fadeUp(0.3)}
    className="border rounded-xl sm:rounded-2xl bg-white overflow-hidden"
  >
    <div className="flex items-center justify-between p-3 sm:p-5 border-b bg-linear-to-r from-gray-50 to-white">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-linear-to-r from-[#f7f3ee] to-[#efe8dd] flex items-center justify-center">
          <Package className="text-[#b99c79] w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <h2 className="text-sm sm:text-lg font-bold text-gray-900">
          Order Items
        </h2>
      </div>
      <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-100 text-[10px] sm:text-xs font-medium text-gray-600">
        {hasItems ? `${itemCount} item(s)` : "No items"}
      </span>
    </div>

    <div className="p-3 sm:p-5">
      {!hasItems ? (
        <div className="border-2 border-dashed rounded-xl p-6 sm:p-8 bg-gray-50 text-center">
          <Package className="mx-auto text-gray-300 mb-2 w-8 h-8 sm:w-10 sm:h-10" />
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            No items found
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Order data isn't available in demo mode.
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {items.map((item, idx) => {
            const qty = item.quantity || 1;
            const lineTotal = parsePrice(item.price) * qty;
            return (
              <motion.div
                key={idx}
                {...fadeLeft(0.1 * idx)}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20 rounded-lg sm:rounded-xl bg-white border overflow-hidden shrink-0 shadow-sm">
                  <img
                    src={resolveImg(item.image)}
                    alt={item.name || `Product ${item.id}`}
                    onError={handleImgError}
                    className="w-full h-full object-contain p-1 sm:p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {item.name || `Product #${item.id}`}
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs sm:text-sm text-gray-500">
                      Qty: {qty}
                    </span>
                    {item.price && (
                      <>
                        <span className="text-gray-300 hidden xs:inline">
                          •
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-[#b99c79]">
                          {item.price} each
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">
                    Total
                  </p>
                  <p className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">
                    {item.price ? money(lineTotal) : "—"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════
// PRICE SUMMARY
// ═══════════════════════════════════════════════════════════════════

const PriceSummary = ({ totals }) => {
  const isFreeShipping = Number(totals.shipping) === 0;

  return (
    <motion.div
      {...fadeUp(0.4)}
      className="border rounded-xl sm:rounded-2xl overflow-hidden"
    >
      <div className="p-4 sm:p-5 bg-linear-to-br from-[#faf8f5] to-[#f5f0ea]">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shadow-sm">
            <CreditCard className="text-[#b99c79] w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-sm sm:text-lg font-bold text-gray-900">
            Payment Summary
          </h2>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="font-semibold text-sm text-gray-900">
              {money(totals.subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Shipping</span>
            <span
              className={`font-semibold text-sm ${isFreeShipping ? "text-green-600" : "text-gray-900"}`}
            >
              {isFreeShipping ? "Free" : money(totals.shipping)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Tax</span>
            <span className="font-semibold text-sm text-gray-900">
              {money(totals.tax)}
            </span>
          </div>

          <div className="border-t border-[#e5ddd2] my-2 sm:my-3" />

          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900 text-sm sm:text-lg">
              Total Paid
            </span>
            <span className="font-extrabold text-lg sm:text-xl md:text-2xl bg-linear-to-r from-[#b99c79] to-[#8b7355] bg-clip-text text-transparent">
              {money(totals.total)}
            </span>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-5 py-2 sm:py-3 bg-green-50 border-t border-green-100 flex items-center gap-2">
        <ShieldCheck size={16} className="text-green-600 shrink-0" />
        <span className="text-xs sm:text-sm text-green-700 font-medium">
          Secure payment processed successfully
        </span>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// INFO CARD & ROW
// ═══════════════════════════════════════════════════════════════════

const InfoCard = ({ icon, title, children, delay = 0 }) => (
  <motion.div
    {...fadeUp(delay)}
    className="border rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-white hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br from-[#f7f3ee] to-[#efe8dd] flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-sm sm:text-base font-bold text-gray-900">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-center justify-between gap-2 sm:gap-4 py-1.5 sm:py-2">
    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
      {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
      <span className="text-xs sm:text-sm text-gray-500 truncate">{label}</span>
    </div>
    <span className="text-xs sm:text-sm text-gray-900 font-semibold text-right truncate max-w-[50%]">
      {value || "—"}
    </span>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// CARDS
// ═══════════════════════════════════════════════════════════════════

const CustomerCard = ({ customer }) => (
  <InfoCard
    icon={<User className="text-[#b99c79] w-4 h-4 sm:w-4.5 sm:h-4.5" />}
    title="Customer Details"
    delay={0.3}
  >
    <div className="space-y-0.5 divide-y divide-gray-100">
      <InfoRow label="Name" value={customer.fullName} />
      <InfoRow
        label="Phone"
        value={customer.phone}
        icon={<Phone size={12} />}
      />
      <InfoRow label="Email" value={customer.email} icon={<Mail size={12} />} />
    </div>
  </InfoCard>
);

const AddressCard = ({ address }) => (
  <InfoCard
    icon={<MapPin className="text-[#b99c79] w-4 h-4 sm:w-4.5 sm:h-4.5" />}
    title="Delivery Address"
    delay={0.4}
  >
    <div className="space-y-0.5 divide-y divide-gray-100">
      <InfoRow label="Address" value={address.address1} />
      <InfoRow label="City" value={address.city} />
      <InfoRow label="Postal Code" value={address.postalCode} />
    </div>
    <div className="mt-3 sm:mt-4 h-20 sm:h-24 rounded-lg sm:rounded-xl bg-linear-to-br from-gray-100 to-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="mx-auto text-gray-300 mb-1 w-5 h-5 sm:w-6 sm:h-6" />
        <p className="text-[10px] sm:text-xs text-gray-400">Map Preview</p>
      </div>
    </div>
  </InfoCard>
);

const PaymentCard = ({ paymentMethod, orderId }) => (
  <InfoCard
    icon={<CreditCard className="text-[#b99c79] w-4 h-4 sm:w-4.5 sm:h-4.5" />}
    title="Payment Method"
    delay={0.5}
  >
    <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 flex items-center gap-2 sm:gap-3">
      <div className="w-10 h-6 sm:w-12 sm:h-8 rounded bg-linear-to-r from-gray-800 to-gray-600 flex items-center justify-center shrink-0">
        {paymentMethod === "cod" ? (
          <span className="text-white text-[8px] sm:text-[10px] font-bold">
            COD
          </span>
        ) : (
          <CreditCard className="text-white w-3 h-3 sm:w-4 sm:h-4" />
        )}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
          {PAYMENT_LABELS[paymentMethod] || paymentMethod}
        </p>
        <p className="text-[10px] sm:text-xs text-gray-500">Order #{orderId}</p>
      </div>
    </div>
  </InfoCard>
);

const HelpCard = ({ orderId }) => (
  <motion.div
    {...fadeUp(0.6)}
    className="border rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-linear-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shadow-sm">
        <HelpCircle className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm sm:text-base">
          Need Help?
        </p>
        <p className="text-[10px] sm:text-xs text-gray-500">
          We're here for you
        </p>
      </div>
    </div>

    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
      Have questions? Contact support with your{" "}
      <span className="font-semibold text-gray-900">Order ID #{orderId}</span>
    </p>

    <div className="space-y-2">
      <a
        href={`mailto:${SUPPORT.email}`}
        className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white hover:bg-gray-50 transition-colors"
      >
        <Mail className="text-blue-600 w-4 h-4 sm:w-4.5 sm:h-4.5" />
        <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
          {SUPPORT.email}
        </span>
      </a>
      <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white">
        <Clock className="text-gray-400 w-4 h-4 sm:w-4.5 sm:h-4.5" />
        <span className="text-xs sm:text-sm text-gray-500">
          {SUPPORT.hours}
        </span>
      </div>
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════
// ACTION BUTTONS
// ═══════════════════════════════════════════════════════════════════

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Secure Checkout", color: "text-green-600" },
  { icon: Truck, label: "Fast Delivery", color: "text-blue-600" },
  { icon: CheckCircle2, label: "Quality Guaranteed", color: "text-[#b99c79]" },
];

const ActionButtons = () => (
  <motion.div {...fadeUp(0.7)} className="mt-8 sm:mt-12 text-center">
    <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 px-4">
      Thank you for shopping with us! We hope you enjoy your purchase.
    </p>

    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
      <Link
        to="/shop"
        className="px-6 sm:px-8 py-3 sm:py-3.5 bg-linear-to-r from-black to-gray-800 text-white rounded-xl hover:shadow-xl transition-all font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 active:scale-95"
      >
        Explore More Products{" "}
        <ArrowRight size={16} className="sm:w-4.5 sm:h-4.5" />
      </Link>
      <Link
        to="/"
        className="px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 active:scale-95"
      >
        <Home size={16} className="sm:w-4.5 sm:h-4.5" /> Back to Home
      </Link>
    </div>

    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t">
      {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
        <div
          key={label}
          className="flex items-center gap-1.5 sm:gap-2 text-gray-500"
        >
          <Icon className={`${color} w-4 h-4 sm:w-5 sm:h-5`} />
          <span className="text-xs sm:text-sm">{label}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════

const OrderContent = ({
  items,
  itemCount,
  hasItems,
  totals,
  customer,
  address,
  paymentMethod,
  orderId,
}) => (
  <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-10 md:py-14">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {/* Left */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        <Timeline />
        <ItemsList items={items} itemCount={itemCount} hasItems={hasItems} />
        <PriceSummary totals={totals} />
      </div>

      {/* Right */}
      <div className="space-y-4 sm:space-y-6">
        <CustomerCard customer={customer} />
        <AddressCard address={address} />
        <PaymentCard paymentMethod={paymentMethod} orderId={orderId} />
        <HelpCard orderId={orderId} />
      </div>
    </div>

    <ActionButtons />
  </div>
);

export default OrderContent;
