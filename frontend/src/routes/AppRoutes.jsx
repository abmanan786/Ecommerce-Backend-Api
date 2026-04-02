import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "../layouts/MainLayout";
import PageLoader from "../components/PageLoader";

const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const OrderSuccess = lazy(() => import("../pages/orderSuccess"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Watches = lazy(() => import("../pages/Watches"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/watches" element={<Watches />} />

          <Route path="/products" element={<Navigate to="/shop" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
