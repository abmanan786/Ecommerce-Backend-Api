import BASE_URL from "./config";

export const getCartItems = async () => {
  const res = await fetch(`${BASE_URL}/cart`);
  if (!res.ok) throw new Error("Cart load nahi hua");
  return res.json(); // { cart }
};

export const addToCart = async (id, quantity = 1) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, quantity }),
  });
  if (!res.ok) throw new Error("Add to cart failed");
  return res.json(); // { cart }
};

export const updateCartQuantity = async (id, quantity) => {
  const res = await fetch(`${BASE_URL}/cart/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Update quantity failed");
  return res.json(); // { cart }
};

export const removeFromCart = async (id) => {
  const res = await fetch(`${BASE_URL}/cart/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Remove from cart failed");
  return res.json(); // { cart }
};

export const clearCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`, { method: "DELETE" });
  if (!res.ok) throw new Error("Clear cart failed");
  return res.json(); // { message, cart }
};
