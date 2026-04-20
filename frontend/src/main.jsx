import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import Lenis from "lenis";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/AddCartContext";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ─── Lenis Smooth Scroll Wrapper (inline) ─── */
function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Route change → scroll to top
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return <>{children}</>;
}

/* ─── Root Render ─── */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          {/* ✅ Route change scroll */}
          <ScrollToTop />

          {/* ✅ Lenis Smooth Scrolling */}
          <SmoothScroll>
            {/* ✅ ErrorBoundary wraps App */}
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </SmoothScroll>

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