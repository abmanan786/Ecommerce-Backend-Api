import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  getCartItems,
  addToCart as addApi,
  removeFromCart as removeApi,
  updateCartQuantity as updateQtyApi,
  clearCart as clearCartApi,
} from "../api/cartapi";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCartItems()
      .then((data) => setCart(data.cart || []))
      .catch(console.error);
  }, []);

  const addToCart = async (id, quantity = 1) => {
    try {
      const updated = await addApi(id, quantity);
      setCart(updated.cart);
      toast.success("Added to cart");
      return true;
    } catch (err) {
      toast.error("Failed to add");
      return false;
    }
  };

  // ✅ NEW: update quantity (set quantity)
  const updateQuantity = async (id, quantity) => {
    try {
      const updated = await updateQtyApi(id, quantity);
      setCart(updated.cart);
      return true;
    } catch (err) {
      toast.error("Failed to update quantity");
      return false;
    }
  };

  const removeFromCart = async (id) => {
    try {
      const updated = await removeApi(id);
      setCart(updated.cart);
      toast.info("Removed from cart");
      return true;
    } catch (err) {
      toast.error("Failed to remove");
      return false;
    }
  };
  const clearCart = async () => {
    try {
      const updated = await clearCartApi();
      setCart(updated.cart);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
