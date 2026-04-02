import BASE_URL from "./config";

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/product/${id}`);
  if (!res.ok) throw new Error("Product load nahi hua");
  return res.json();
};

export const fetchHomeProducts = async () => {
  const res = await fetch(`${BASE_URL}/products-home`);
  if (!res.ok) throw new Error("Home products load nahi hue");
  return res.json();
};

export const fetchShopProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/products-shop?${query}`);
  if (!res.ok) throw new Error("Shop products load nahi hue");
  return res.json();
};