import BASE_URL from "./config";

export const createOrder = async (payload) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Order create failed");
  return res.json(); // { message, order }
};

export const getOrderById = async (id) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`);
  if (!res.ok) throw new Error("Order not found");
  return res.json(); // { order }
};