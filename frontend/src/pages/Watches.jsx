import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BadgeCheck, Truck, RotateCcw } from "lucide-react";

import { CartContext } from "../context/AddCartContext";
import { useWatchesData } from "../hooks/useWatchesData";
import { useQuickView } from "../hooks/useQuickview";

import QuickViewModal from "../components/QuickViewModal";
import WatchesProductCard from "../components/WatchesProductCard";

const Watches = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const { featured, newArrivals, loading } = useWatchesData();
  const {
    open,
    loading: qvLoading,
    product,
    openQuickView,
    closeQuickView,
  } = useQuickView();

  const tiles = [
    { title: "Men Watches", desc: "Bold & timeless picks", to: "/shop" },
    { title: "Women Watches", desc: "Elegant & refined styles", to: "/shop" },
    { title: "Smart Watches", desc: "Modern essentials", to: "/shop" },
    { title: "Luxury", desc: "Premium signature range", to: "/shop" },
    { title: "New Arrivals", desc: "Fresh drops", to: "/shop" },
    { title: "Shop All", desc: "Explore everything", to: "/shop" },
  ];

  const brands = ["Rolex", "Casio", "Apple"];

  return (
    <section className="bg-white min-h-screen">
      {/* HERO */}
      <div className="relative overflow-hidden bg-linear-to-br from-black via-[#141414] to-black">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#b99c79]/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <p className="text-white/60 text-xs uppercase tracking-[0.45em]">
            360° Collection
          </p>
          <h1 className="text-white text-3xl sm:text-5xl font-extrabold mt-3">
            Watches
          </h1>
          <p className="text-white/70 mt-4 max-w-2xl leading-relaxed">
            Premium timepieces crafted for every moment — minimal design,
            maximum presence. Explore curated picks, brands, and new arrivals.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/shop")}
              className="h-12 px-6 rounded-xl font-semibold bg-[#b99c79] text-black hover:bg-[#d2b38c] transition inline-flex items-center justify-center gap-2"
            >
              Shop All Watches <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="h-12 px-6 rounded-xl font-semibold border border-white/25 text-white hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
            >
              Explore New Arrivals
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => navigate("/shop")}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/85 text-sm font-semibold hover:bg-white/15 transition"
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiles.map((t) => (
            <Link
              key={t.title}
              to={t.to}
              className="group border rounded-2xl p-6 bg-white hover:bg-[#fafafa] transition"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
                Category
              </p>
              <h3 className="text-xl font-extrabold text-gray-900 mt-2 group-hover:text-[#b99c79] transition">
                {t.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{t.desc}</p>
              <p className="mt-5 text-sm font-semibold text-gray-900 inline-flex items-center gap-2">
                Explore{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition"
                />
              </p>
            </Link>
          ))}
        </div>

        {/* FEATURED */}
        <div className="mt-14">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="uppercase tracking-[0.35em] text-gray-400 text-xs mb-2">
                Curated Picks
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Featured Watches
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Handpicked premium styles from our collection.
              </p>
            </div>

            <Link
              to="/shop"
              className="hidden sm:inline-flex text-sm font-semibold text-gray-800 hover:text-[#b99c79] transition"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-2xl overflow-hidden bg-white"
                >
                  <div className="h-60 bg-gray-100 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-24 bg-gray-100 animate-pulse rounded" />
                    <div className="h-4 w-44 bg-gray-100 animate-pulse rounded" />
                    <div className="h-4 w-20 bg-gray-100 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : featured.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((p) => (
                <WatchesProductCard
                  key={p.id}
                  product={p}
                  addToCart={addToCart}
                  onQuickView={openQuickView}
                  onOpen={() => navigate(`/product/${p.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="border rounded-2xl p-8 bg-[#fafafa] text-center">
              <p className="font-semibold text-gray-900">
                Featured products not available
              </p>
            </div>
          )}
        </div>

        {/* NEW ARRIVALS */}
        <div className="mt-14">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="uppercase tracking-[0.35em] text-gray-400 text-xs mb-2">
                Fresh Drops
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                New Arrivals
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Latest additions to the Swiss Eagle lineup.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-2xl overflow-hidden bg-white"
                >
                  <div className="h-60 bg-gray-100 animate-pulse" />
                </div>
              ))}
            </div>
          ) : newArrivals.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((p) => (
                <WatchesProductCard
                  key={p.id}
                  product={p}
                  addToCart={addToCart}
                  onQuickView={openQuickView}
                  onOpen={() => navigate(`/product/${p.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="border rounded-2xl p-8 bg-[#fafafa] text-center">
              <p className="font-semibold text-gray-900">
                No new arrivals found
              </p>
            </div>
          )}
        </div>

        {/* TRUST */}
        <div className="mt-16 border rounded-2xl p-6 bg-[#fafafa]">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
            Why Swiss Eagle
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2">
            Shop with confidence
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="border rounded-xl p-4 bg-white flex items-center gap-3">
              <BadgeCheck className="text-[#b99c79]" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Authentic</p>
                <p className="text-xs text-gray-500">Premium quality</p>
              </div>
            </div>
            <div className="border rounded-xl p-4 bg-white flex items-center gap-3">
              <Truck className="text-[#b99c79]" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Fast Delivery
                </p>
                <p className="text-xs text-gray-500">48–72 hours</p>
              </div>
            </div>
            <div className="border rounded-xl p-4 bg-white flex items-center gap-3">
              <RotateCcw className="text-[#b99c79]" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-500">7 days policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <QuickViewModal
        open={open}
        onClose={closeQuickView}
        product={product}
        loading={qvLoading}
        onAddToCart={addToCart}
        onViewDetails={() => {
          if (product?.id) navigate(`/product/${product.id}`);
          closeQuickView();
        }}
      />
    </section>
  );
};

export default Watches;
