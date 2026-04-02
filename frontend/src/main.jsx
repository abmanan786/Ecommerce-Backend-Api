import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/AddCartContext";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          {/* ✅ Route change scroll */}
          <ScrollToTop />

          {/* ✅ ErrorBoundary must WRAP the App */}
          <ErrorBoundary>
            <App />
          </ErrorBoundary>

          {/* ✅ Global toasts */}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
