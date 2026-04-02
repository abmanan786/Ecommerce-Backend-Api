// controllers/orderController.js
let orders = [];
let nextId = 1;

exports.createOrder = (req, res) => {
  const { customer, address, paymentMethod, items, totals, notes } = req.body;

  if (!customer?.fullName || !customer?.phone) {
    return res.status(400).json({ message: "Customer info missing" });
  }
  if (!address?.address1 || !address?.city) {
    return res.status(400).json({ message: "Address missing" });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const order = {
    id: nextId++,
    status: paymentMethod === "cod" ? "confirmed" : "pending_payment",
    createdAt: new Date().toISOString(),
    customer,
    address,
    paymentMethod,
    items,
    totals,
    notes: notes || "",
  };

  orders.push(order);
  return res.json({ message: "Order created", order });
};

exports.getOrderById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const order = orders.find((o) => o.id === id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  return res.json({ order });
};