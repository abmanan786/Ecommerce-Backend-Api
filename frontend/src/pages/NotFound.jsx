import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Home,
  Search,
  ShoppingBag,
  BadgeCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

const cn = (...c) => c.filter(Boolean).join(" ");

const NotFound = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    // ✅ If you have /shop search params, you can navigate with query:
    // navigate(`/shop?search=${encodeURIComponent(q)}`);
    navigate("/shop");
  };

  return (
    <section className="min-h-screen bg-white">
      {/* Premium header */}
      <div className="relative overflow-hidden bg-linear-to-br from-black via-[#141414] to-black">
        {/* blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#b99c79]/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

        {/* subtle grid */}
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
            Swiss Eagle • 404
          </p>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
            <div className="min-w-0">
              <h1 className="text-white text-3xl sm:text-5xl font-extrabold leading-tight">
                Page not found
              </h1>

              <p className="text-white/70 mt-4 max-w-2xl leading-relaxed">
                The page you’re trying to open doesn’t exist or may have been
                moved. Don’t worry—your perfect watch is still waiting in the
                collection.
              </p>

              {/* Search box (UI) */}
              <form onSubmit={onSearch} className="mt-8">
                <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                  <div className="relative flex-1">
                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                    />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search in shop (e.g. Rolex, Casio, Apple)..."
                      className="w-full h-12 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/50 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#b99c79]/60"
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-12 px-6 rounded-xl font-semibold bg-[#b99c79] text-black hover:bg-[#d2b38c] transition inline-flex items-center justify-center gap-2"
                  >
                    Search <ArrowRight size={18} />
                  </button>
                </div>

                <p className="text-white/55 text-xs mt-3">
                  Tip: Use the menu, or go back to Home & Shop.
                </p>
              </form>
            </div>

            {/* Right actions */}
            <div className="w-full lg:w-[320px] border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl p-5">
              <p className="text-white/70 text-xs uppercase tracking-[0.35em]">
                Quick Actions
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <Link
                  to="/"
                  className="h-12 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
                >
                  <Home size={18} />
                  Back to Home
                </Link>

                <Link
                  to="/shop"
                  className="h-12 rounded-xl font-semibold bg-white text-black hover:bg-[#b99c79] hover:text-white transition inline-flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Browse Shop
                </Link>

                <Link
                  to="/cart"
                  className="h-12 rounded-xl font-semibold bg-white/10 border border-white/15 text-white hover:bg-white/15 transition inline-flex items-center justify-center gap-2"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trust badges */}
          <div className="lg:col-span-2">
            <div className="border rounded-2xl p-6 bg-[#fafafa]">
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                While you’re here…
              </h2>
              <p className="text-gray-600 mt-2">
                Explore our premium selection and shop confidently.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="border rounded-xl p-4 bg-white flex items-center gap-3">
                  <BadgeCheck className="text-[#b99c79]" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Authentic
                    </p>
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

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/shop"
                  className="px-6 py-3 rounded-xl bg-black text-white hover:bg-[#b99c79] transition font-semibold inline-flex items-center justify-center gap-2"
                >
                  Explore Products <ArrowRight size={18} />
                </Link>

                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 rounded-xl border hover:bg-gray-50 transition font-semibold"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="border rounded-2xl p-6 bg-white">
            <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">
              Quick Links
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3">
              {[
                { to: "/shop", label: "Shop All Products" },
                { to: "/cart", label: "View Cart" },
                { to: "/checkout", label: "Checkout" },
                { to: "/", label: "Home" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-4 py-3 rounded-xl border bg-white hover:bg-gray-50 transition font-semibold text-gray-900"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 text-xs text-gray-500">
              Need help?{" "}
              <a
                className="underline text-gray-900"
                href="mailto:support@example.com"
              >
                support@example.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-500 mt-10">
          © {new Date().getFullYear()} Swiss Eagle — Premium Watches
        </p>
      </div>
    </section>
  );
};

export default NotFound;
