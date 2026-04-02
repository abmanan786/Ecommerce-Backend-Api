import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingCart, Loader2, Check } from "lucide-react";
import { FALLBACK_IMG, getImageUrl } from "../utils/media";

const cn = (...c) => c.filter(Boolean).join(" ");

const QuickViewModal = ({
  open,
  onClose,
  product,
  loading,
  onAddToCart,
  onViewDetails,
}) => {
  const [activeImage, setActiveImage] = useState("");
  const [qty, setQty] = useState(1);
  const [btn, setBtn] = useState("idle"); // idle | loading | success

  useEffect(() => {
    if (!open) return;

    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!product) return;
    const first =
      (Array.isArray(product.images) && product.images[0]) ||
      product.image ||
      "";
    setActiveImage(getImageUrl(first));
    setQty(1);
    setBtn("idle");
  }, [product]);

  const images = useMemo(() => {
    if (!product) return [];
    const list = Array.isArray(product.images) ? product.images : [];
    const base = product.image || "";

    const combined = list.length ? list : [base, base, base, base];
    const uniq = [];
    for (const img of combined) {
      const abs = getImageUrl(img);
      if (abs && !uniq.includes(abs)) uniq.push(abs);
    }
    while (uniq.length < 4) uniq.push(getImageUrl(base));
    return uniq.slice(0, 4);
  }, [product]);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(99, q + 1));

  const handleAdd = async () => {
    if (!product) return;
    if (btn !== "idle") return;

    setBtn("loading");
    const ok = await onAddToCart(product.id, qty);

    if (ok) {
      setBtn("success");
      setTimeout(() => setBtn("idle"), 1200);
    } else {
      setBtn("idle");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.78 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-60"
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-61 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-4xl bg-white rounded-2xl border shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.35em]">
                    Quick View
                  </p>
                  <p className="font-extrabold text-gray-900">
                    {loading ? "Loading..." : product?.name || "Product"}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl border hover:bg-gray-50 flex items-center justify-center"
                  aria-label="Close"
                >
                  <X />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 border-b md:border-b-0 md:border-r bg-[#fafafa]">
                  <div className="rounded-2xl border bg-[#f3f3f3] overflow-hidden">
                    <div className="aspect-square flex items-center justify-center">
                      {loading ? (
                        <div className="w-full h-full animate-pulse bg-gray-200" />
                      ) : (
                        <img
                          src={activeImage || FALLBACK_IMG}
                          alt="preview"
                          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                          className="w-full h-full object-contain p-6"
                        />
                      )}
                    </div>
                  </div>

                  {!loading && (
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(img)}
                          className={cn(
                            "aspect-square rounded-xl border bg-white overflow-hidden",
                            img === activeImage
                              ? "ring-2 ring-[#b99c79] border-[#b99c79]"
                              : "hover:border-gray-400",
                          )}
                        >
                          <img
                            src={img}
                            alt={`thumb-${idx}`}
                            onError={(e) =>
                              (e.currentTarget.src = FALLBACK_IMG)
                            }
                            className="w-full h-full object-contain p-2"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  {loading ? (
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-100 animate-pulse rounded" />
                      <div className="h-5 w-28 bg-gray-100 animate-pulse rounded" />
                      <div className="h-16 bg-gray-100 animate-pulse rounded" />
                      <div className="h-12 bg-gray-100 animate-pulse rounded" />
                    </div>
                  ) : (
                    <>
                      <p className="text-2xl font-extrabold text-[#b99c79]">
                        {product?.price || "—"}
                      </p>

                      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                        {product?.description ||
                          "A premium timepiece crafted for everyday elegance. Minimal design, maximum presence."}
                      </p>

                      <div className="mt-5 flex items-center gap-3">
                        <div className="flex items-center border rounded-xl overflow-hidden">
                          <button
                            className="w-11 h-11 flex items-center justify-center hover:bg-gray-50"
                            onClick={dec}
                            type="button"
                          >
                            <Minus size={16} />
                          </button>
                          <div className="w-12 h-11 flex items-center justify-center font-semibold">
                            {qty}
                          </div>
                          <button
                            className="w-11 h-11 flex items-center justify-center hover:bg-gray-50"
                            onClick={inc}
                            type="button"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={handleAdd}
                          disabled={btn !== "idle"}
                          className={cn(
                            "flex-1 h-11 rounded-xl font-semibold transition flex items-center justify-center gap-2",
                            btn === "success"
                              ? "bg-green-600 text-white"
                              : "bg-black text-white hover:bg-[#b99c79]",
                            btn !== "idle" && "opacity-80 cursor-wait",
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
                      </div>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={onViewDetails}
                          className="h-11 rounded-xl border font-semibold hover:bg-gray-50 transition"
                        >
                          View Full Details
                        </button>

                        <button
                          onClick={onClose}
                          className="h-11 rounded-xl bg-[#f7f3ee] text-gray-900 font-semibold hover:bg-[#eadcc8] transition"
                        >
                          Continue Browsing
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
