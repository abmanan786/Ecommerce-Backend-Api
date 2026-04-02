import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Heart, Loader2, Check } from "lucide-react";
import { getImageUrl, FALLBACK_IMG } from "../utils/media";

const cn = (...c) => c.filter(Boolean).join(" ");

const WatchesProductCard = ({ product, addToCart, onQuickView, onOpen }) => {
  const [hover, setHover] = useState(false);
  const [btn, setBtn] = useState("idle");

  const handleAdd = async (e) => {
    e.stopPropagation();
    if (btn !== "idle") return;

    setBtn("loading");
    const ok = await addToCart(product.id, 1);

    if (ok) {
      setBtn("success");
      setTimeout(() => setBtn("idle"), 1200);
    } else {
      setBtn("idle");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOpen}
      className="cursor-pointer"
    >
      <div className="relative border rounded-2xl bg-white overflow-hidden">
        <div className="h-60 bg-[#f3f3f3] flex items-center justify-center overflow-hidden">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
            className={cn(
              "w-full h-full object-contain p-5 transition-transform duration-500",
              hover && "scale-110",
            )}
          />
        </div>

        {product.isNew && (
          <div className="absolute top-3 left-3 bg-[#b99c79] text-white text-[11px] font-semibold px-3 py-1 uppercase tracking-wider">
            New
          </div>
        )}

        <div
          className={cn(
            "absolute bottom-3 left-3 right-3 flex items-center gap-2 transition-all duration-300",
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
                Add
              </>
            ) : btn === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Adding
              </>
            ) : (
              <>
                <Check size={16} />
                Added
              </>
            )}
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="h-11 w-11 rounded-xl bg-white border hover:bg-gray-50 transition flex items-center justify-center"
            title="Wishlist"
          >
            <Heart size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product.id);
            }}
            className="h-11 w-11 rounded-xl bg-white border hover:bg-gray-50 transition flex items-center justify-center"
            title="Quick view"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      <div className="pt-4 px-1">
        <p className="text-[12px] text-gray-500 uppercase tracking-[0.25em]">
          {product.brand || "Premium"}
        </p>
        <h3 className="text-base font-extrabold text-gray-900 mt-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[#b99c79] font-semibold mt-1">{product.price}</p>
      </div>
    </motion.div>
  );
};

export default WatchesProductCard;
