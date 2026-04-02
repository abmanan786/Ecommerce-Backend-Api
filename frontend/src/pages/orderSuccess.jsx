// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/pages/OrderSuccess.jsx
// ✅ FIX: Party pack sirf ek dafa chalega
// ═══════════════════════════════════════════════════════════════════

import { useEffect, useState } from "react";
import { useOrderData } from "../hooks/useOrderData";
import SuccessHeader, { PartyPack } from "../components/order-success/SuccessHeader";
import OrderContent from "../components/order-success/OrderContent";

const OrderSuccess = () => {
  const {
    orderId,
    items,
    itemCount,
    hasItems,
    totals,
    customer,
    address,
    paymentMethod,
    isDirectAccess,
  } = useOrderData();

  const [showParty, setShowParty] = useState(false);

  useEffect(() => {
    // Unique key per order
    const key = `party-shown-${orderId}`;

    // Check agar pehle show ho chuka hai
    const alreadyShown = sessionStorage.getItem(key);

    // ✅ Only show if:
    // 1. Direct access nahi hai
    // 2. Pehle show nahi hua
    if (!isDirectAccess && !alreadyShown) {
      setShowParty(true);

      // Mark as shown
      sessionStorage.setItem(key, "true");

      // Auto hide after 4 sec
      setTimeout(() => setShowParty(false), 4000);
    }
  }, [orderId, isDirectAccess]);

  return (
    <section className="bg-linear-to-b from-gray-50 to-white min-h-screen">
      
      {/* 🎉 PARTY PACK - Only Once */}
      {showParty && <PartyPack />}
      
      <SuccessHeader 
        orderId={orderId} 
        isDirectAccess={isDirectAccess} 
      />
      
      <OrderContent
        items={items}
        itemCount={itemCount}
        hasItems={hasItems}
        totals={totals}
        customer={customer}
        address={address}
        paymentMethod={paymentMethod}
        orderId={orderId}
      />
    </section>
  );
};

export default OrderSuccess;