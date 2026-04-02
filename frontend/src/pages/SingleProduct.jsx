import { useEffect, useMemo, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Loader2,
  Star,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
} from "lucide-react";

import { fetchProductById } from "../api/productApi";
import { CartContext } from "../context/AddCartContext";

const FALLBACK_IMG =
  "https://placehold.co/900x900/f3f4f6/9ca3af?text=Product+Image";

// ✅ Backend origin (images + shop endpoint)
const BACKEND_ORIGIN =
  "https://ecommerce-backend-api-production-9628.up.railway.app";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const formatRating = (val) => {
  const n = Number(val);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(5, n));
};

const Stars = ({ value = 0, size = 16 }) => {
  const rating = formatRating(value);
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <div key={i} className="relative">
            <Star
              size={size}
              className={cn(
                "text-gray-300",
                (filled || isHalf) && "text-[#b99c79]",
              )}
              fill={filled ? "currentColor" : "none"}
            />
            {isHalf && !filled && (
              <Star
                size={size}
                className="absolute left-0 top-0 text-[#b99c79] overflow-hidden"
                style={{ clipPath: "inset(0 50% 0 0)" }}
                fill="currentColor"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const ReviewCard = ({ r }) => (
  <div className="border rounded-xl p-4 bg-white">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-semibold text-gray-900">{r.name}</p>
        <p className="text-xs text-gray-500">{r.date}</p>
      </div>
      <Stars value={r.rating} />
    </div>
    <p className="text-sm text-gray-700 mt-3 leading-relaxed">{r.comment}</p>
  </div>
);

// ✅ NEW: Related Product Card (premium)
const RelatedProductCard = ({ p, toAbsolute, onAddToCart, onOpen }) => {
  const [hover, setHover] = useState(false);
  const [btn, setBtn] = useState("idle"); // idle | loading | success

  const img = toAbsolute((p?.images && p.images[0]) || p?.image);

  const handleAdd = async (e) => {
    e.stopPropagation();
    if (btn !== "idle") return;

    setBtn("loading");
    const ok = await onAddToCart(p.id, 1);

    if (ok) {
      setBtn("success");
      setTimeout(() => setBtn("idle"), 1200);
    } else {
      setBtn("idle");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group cursor-pointer"
    >
      <div className="relative border rounded-2xl bg-white overflow-hidden">
        <div className="h-56 bg-[#f3f3f3] flex items-center justify-center">
          <img
            src={img}
            alt={p?.name}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
            className={cn(
              "w-full h-full object-contain p-4 transition-transform duration-500",
              hover && "scale-110",
            )}
          />
        </div>

        {/* badge */}
        {p?.isNew && (
          <div className="absolute top-3 left-3 bg-[#b99c79] text-white text-[11px] font-semibold px-3 py-1 uppercase tracking-wider">
            New
          </div>
        )}

        {/* premium overlay actions */}
        <div
          className={cn(
            "absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 transition-all duration-300",
            hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          )}
        >
          <button
            onClick={handleAdd}
            disabled={btn !== "idle"}
            className={cn(
              "flex-1 h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition",
              btn === "success"
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-[#b99c79]",
              btn !== "idle" && "opacity-90 cursor-wait",
            )}
          >
            {btn === "idle" ? (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            ) : btn === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Check size={16} />
                Added
              </>
            )}
          </button>

          <span className="hidden sm:inline-flex px-3 h-11 items-center rounded-xl border bg-white text-gray-800 text-sm font-semibold">
            {p?.price || "—"}
          </span>
        </div>
      </div>

      <div className="pt-4 px-1">
        <p className="text-[13px] text-gray-500 uppercase tracking-[0.22em]">
          {p?.brand || "Premium"}
        </p>
        <h3 className="text-base font-extrabold text-gray-900 mt-1 line-clamp-1">
          {p?.name}
        </h3>
        <p className="text-[#b99c79] font-semibold mt-1 sm:hidden">
          {p?.price || "—"}
        </p>
      </div>
    </motion.div>
  );
};

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [buttonState, setButtonState] = useState("idle"); // idle | loading | success
  const [activeTab, setActiveTab] = useState("description"); // description | shipping | reviews

  // ✅ NEW: Related products state
  const [related, setRelated] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  // ✅ Convert relative URLs coming from backend into absolute Railway URLs
  const toAbsolute = (u) => {
    if (!u) return FALLBACK_IMG;
    if (u.startsWith("http")) return u;
    if (u.startsWith("/")) return `${BACKEND_ORIGIN}${u}`;
    return `${BACKEND_ORIGIN}/images/${u}`;
  };

  // ✅ Load single product
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((data) => {
        if (!mounted) return;
        setProduct(data);

        const first =
          (Array.isArray(data?.images) && data.images[0]) ||
          data?.image ||
          FALLBACK_IMG;

        setActiveImage(toAbsolute(first));
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || "Something went wrong");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  // ✅ NEW: Fetch related products (brand/category match)
  useEffect(() => {
    const run = async () => {
      if (!product?.id) return;

      setRelatedLoading(true);
      try {
        const params = new URLSearchParams();
        if (product.brand) params.set("brand", product.brand);
        if (product.category) params.set("category", product.category);
        params.set("page", "1");
        params.set("limit", "6");

        const res = await fetch(
          `${BACKEND_ORIGIN}/api/products-shop?${params.toString()}`,
        );

        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.products || [];

        const filtered = list
          .filter((p) => String(p.id) !== String(product.id))
          .slice(0, 4);

        setRelated(filtered);
      } catch (e) {
        console.error("Related products load failed:", e);
        setRelated([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    run();
  }, [product?.id, product?.brand, product?.category]);

  // ✅ Thumbnails as absolute URLs
  const images = useMemo(() => {
    if (!product) return [];
    const list = Array.isArray(product.images) ? product.images : [];

    const base = product.image || FALLBACK_IMG;
    const combined = list.length ? list : [base, base, base, base];

    const uniq = [];
    for (const img of combined) {
      const abs = toAbsolute(img);
      if (abs && !uniq.includes(abs)) uniq.push(abs);
    }

    while (uniq.length < 4) uniq.push(toAbsolute(base));
    return uniq.slice(0, 4);
  }, [product]);

  const rating = useMemo(() => {
    if (!product) return 0;
    if (product.rating != null) return product.rating;

    const rev = Array.isArray(product.reviews) ? product.reviews : [];
    if (!rev.length) return 0;

    const avg =
      rev.reduce((sum, r) => sum + Number(r.rating || 0), 0) / rev.length;
    return avg;
  }, [product]);

  const reviews = useMemo(() => {
    const rev = Array.isArray(product?.reviews) ? product.reviews : null;
    if (rev && rev.length) {
      return rev.map((r, idx) => ({
        id: r.id ?? idx,
        name: r.name ?? "Customer",
        date: r.date ?? "Recently",
        rating: r.rating ?? 5,
        comment: r.comment ?? "",
      }));
    }
    return [
      {
        id: 1,
        name: "Ayesha",
        date: "2 days ago",
        rating: 5,
        comment:
          "Premium feel and packaging. Dial looks even better in real life. Totally worth it.",
      },
      {
        id: 2,
        name: "Manan",
        date: "1 week ago",
        rating: 4.5,
        comment:
          "Quality is great. Strap is comfortable. Delivery time was good as well.",
      },
    ];
  }, [product]);

  const meta = useMemo(() => {
    return {
      sku: product?.sku || `SKU-${product?.id ?? id}`,
      category: product?.category || "Watches",
      brand: product?.brand || "Time",
      stock: product?.stock ?? 12,
    };
  }, [product, id]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (buttonState !== "idle") return;

    setButtonState("loading");
    try {
      const success = await addToCart(product.id, qty);
      if (success) {
        setButtonState("success");
        setTimeout(() => setButtonState("idle"), 1400);
      } else {
        setButtonState("idle");
      }
    } catch {
      setButtonState("idle");
    }
  };

  const decQty = () => setQty((q) => Math.max(1, q - 1));
  const incQty = () => setQty((q) => Math.min(99, q + 1));

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="h-6 w-40 bg-gray-100 animate-pulse rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-square bg-gray-100 animate-pulse rounded-2xl" />
          <div className="space-y-4">
            <div className="h-10 bg-gray-100 animate-pulse rounded" />
            <div className="h-6 w-40 bg-gray-100 animate-pulse rounded" />
            <div className="h-24 bg-gray-100 animate-pulse rounded" />
            <div className="h-12 bg-gray-100 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600 font-semibold">Error</p>
        <p className="text-gray-700 mt-2">{error || "Product not found"}</p>
        <Link
          to="/shop"
          className="inline-block mt-6 px-5 py-2.5 bg-black text-white hover:bg-[#b99c79] transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-black">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" className="hover:text-black">
            Shop
          </Link>{" "}
          / <span className="text-gray-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl bg-[#f3f3f3] overflow-hidden border">
              <div className="aspect-square flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={product.name}
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-contain p-6"
                  />
                </AnimatePresence>
              </div>

              {product.isNew && (
                <div className="absolute top-4 left-4 bg-[#b99c79] text-white text-xs font-semibold px-3 py-1 tracking-wider uppercase shadow-md">
                  New
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => {
                const isActive = img === activeImage;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "rounded-xl border bg-[#f7f7f7] overflow-hidden aspect-square",
                      isActive
                        ? "ring-2 ring-[#b99c79] border-[#b99c79]"
                        : "hover:border-gray-400",
                    )}
                  >
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                );
              })}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="border rounded-xl p-3 flex items-center gap-3">
                <ShieldCheck className="text-[#b99c79]" />
                <div>
                  <p className="text-sm font-semibold">Authentic</p>
                  <p className="text-xs text-gray-500">Premium quality</p>
                </div>
              </div>
              <div className="border rounded-xl p-3 flex items-center gap-3">
                <Truck className="text-[#b99c79]" />
                <div>
                  <p className="text-sm font-semibold">Fast Delivery</p>
                  <p className="text-xs text-gray-500">48–72 hours</p>
                </div>
              </div>
              <div className="border rounded-xl p-3 flex items-center gap-3">
                <RotateCcw className="text-[#b99c79]" />
                <div>
                  <p className="text-sm font-semibold">Easy Returns</p>
                  <p className="text-xs text-gray-500">7 days policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:pt-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <Stars value={rating} />
              <span className="text-sm text-gray-600">
                {reviews.length} review{reviews.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <p className="text-3xl font-bold text-[#b99c79]">
                {product.price}
              </p>
              <p className="text-sm text-gray-500">
                Inclusive of standard taxes
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mt-6">
              {product.description ||
                "A premium timepiece crafted for everyday elegance. Minimalist design, maximum presence."}
            </p>

            {/* Meta */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="border rounded-xl p-3">
                <p className="text-gray-500 text-xs">SKU</p>
                <p className="font-semibold text-gray-900">{meta.sku}</p>
              </div>
              <div className="border rounded-xl p-3">
                <p className="text-gray-500 text-xs">Brand</p>
                <p className="font-semibold text-gray-900">{meta.brand}</p>
              </div>
              <div className="border rounded-xl p-3">
                <p className="text-gray-500 text-xs">Category</p>
                <p className="font-semibold text-gray-900">{meta.category}</p>
              </div>
              <div className="border rounded-xl p-3">
                <p className="text-gray-500 text-xs">Availability</p>
                <p className="font-semibold text-gray-900">
                  {meta.stock > 0 ? "In stock" : "Out of stock"}
                </p>
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border rounded-xl overflow-hidden w-full sm:w-44">
                <button
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-50"
                  onClick={decQty}
                  type="button"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 h-12 flex items-center justify-center font-semibold">
                  {qty}
                </div>
                <button
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-50"
                  onClick={incQty}
                  type="button"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={buttonState !== "idle" || meta.stock <= 0}
                className={cn(
                  "w-full h-12 rounded-xl font-semibold tracking-wide transition flex items-center justify-center gap-2",
                  buttonState === "success"
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-[#b99c79]",
                  (meta.stock <= 0 || buttonState !== "idle") &&
                    "opacity-70 cursor-not-allowed",
                )}
              >
                {meta.stock <= 0 ? (
                  "Out of Stock"
                ) : buttonState === "idle" ? (
                  "Add to Cart"
                ) : buttonState === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Added
                  </>
                )}
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-10">
              <div className="flex gap-2 border-b">
                {[
                  { key: "description", label: "Description" },
                  { key: "shipping", label: "Shipping & Returns" },
                  { key: "reviews", label: "Reviews" },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTab(t.key)}
                    className={cn(
                      "px-4 py-3 text-sm font-semibold",
                      activeTab === t.key
                        ? "border-b-2 border-[#b99c79] text-gray-900"
                        : "text-gray-500 hover:text-gray-900",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="pt-6">
                {activeTab === "description" && (
                  <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                    <p>
                      This product is designed with a premium finish and a clean
                      silhouette—perfect for office, formal events, and daily
                      wear.
                    </p>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li>Premium dial finishing</li>
                      <li>Comfort strap for all-day wear</li>
                      <li>Reliable movement & build quality</li>
                    </ul>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                    <p>
                      Standard delivery:{" "}
                      <span className="font-semibold">48–72 hours</span>.
                    </p>
                    <p>
                      Returns: <span className="font-semibold">7 days</span>{" "}
                      return/exchange policy.
                    </p>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Customer Reviews
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Stars value={rating} />
                          <span className="text-sm text-gray-600">
                            {formatRating(rating).toFixed(1)} / 5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {reviews.map((r) => (
                        <ReviewCard key={r.id} r={r} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ NEW: Related Products (Premium) */}
        <div className="mt-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="uppercase tracking-[0.35em] text-gray-400 text-xs mb-2">
                Curated for you
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                You may also like
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Similar products based on brand & category.
              </p>
            </div>

            <Link
              to="/shop"
              className="hidden sm:inline-flex text-sm font-semibold text-gray-800 hover:text-[#b99c79] transition"
            >
              View all
            </Link>
          </div>

          {relatedLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-2xl bg-white overflow-hidden"
                >
                  <div className="h-56 bg-gray-100 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-24 bg-gray-100 animate-pulse rounded" />
                    <div className="h-4 w-44 bg-gray-100 animate-pulse rounded" />
                    <div className="h-4 w-20 bg-gray-100 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : related.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <RelatedProductCard
                  key={p.id}
                  p={p}
                  toAbsolute={toAbsolute}
                  onAddToCart={addToCart}
                  onOpen={() => navigate(`/product/${p.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="border rounded-2xl p-8 bg-[#fafafa] text-center">
              <p className="font-semibold text-gray-900">
                No related products found
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Try exploring the shop for more premium watches.
              </p>
              <Link
                to="/shop"
                className="inline-flex mt-5 px-6 py-3 rounded-xl bg-black text-white hover:bg-[#b99c79] transition font-semibold"
              >
                Browse Shop
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
