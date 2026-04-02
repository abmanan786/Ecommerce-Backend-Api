// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/components/shop/FilterDrawer.jsx
// 📌 PURPOSE: Mobile filter drawer (slide from right)
// ═══════════════════════════════════════════════════════════════════

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Check, Filter } from "lucide-react";
import { cn, CATEGORIES, BRANDS } from "../../utils/shopHelpers";

const FilterDrawer = ({
  isOpen,
  onClose,
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  onApply,
  onClear,
}) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.25,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-101 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f7f3ee] flex items-center justify-center">
                  <Filter size={18} className="text-[#b99c79]" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">Filters</span>
                  <span className="text-xs text-gray-500">
                    Refine your search
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl border bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-3 block">
                  Search
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-sm focus:outline-none focus:border-[#b99c79] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-3 block">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={cn(
                        "py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200",
                        category === cat.value
                          ? "bg-[#b99c79] text-white shadow-lg shadow-[#b99c79]/25"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100",
                      )}
                    >
                      {cat.label.replace("All Categories", "All")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-3 block">
                  Brand
                </label>
                <div className="space-y-2">
                  {BRANDS.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setBrand(b.value)}
                      className={cn(
                        "w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200",
                        brand === b.value
                          ? "bg-[#f7f3ee] text-[#b99c79] border-2 border-[#b99c79]"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent",
                      )}
                    >
                      <span>{b.label}</span>
                      {brand === b.value && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={onApply}
                  className="flex-1 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-[#b99c79] transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={onClear}
                  className="flex-1 py-3 bg-white border-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;
