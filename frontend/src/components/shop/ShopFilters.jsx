// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/components/shop/ShopFilters.jsx
// 📌 PURPOSE: Search bar + Dropdown filters + Active filters
// ═══════════════════════════════════════════════════════════════════

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn, CATEGORIES, BRANDS } from "../../utils/shopHelpers";

// ─────────────────────────────────────────────────────────────
// SEARCH BAR
// ─────────────────────────────────────────────────────────────

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search products...",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "relative flex-1 max-w-md transition-all duration-300",
        isFocused && "max-w-lg",
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
          isFocused ? "text-[#b99c79]" : "text-gray-400",
        )}
      >
        <Search size={18} />
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-12 pr-4 py-3 rounded-2xl text-sm transition-all duration-300 outline-none",
          "bg-gray-50 border-2",
          isFocused
            ? "border-[#b99c79] bg-white shadow-lg shadow-[#b99c79]/10"
            : "border-transparent hover:border-gray-200 hover:bg-white",
        )}
      />

      {/* Clear */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        >
          <X size={12} className="text-gray-600" />
        </button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// DROPDOWN
// ─────────────────────────────────────────────────────────────

export const Dropdown = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption?.label || placeholder;

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className={cn(
          "flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 min-w-40",
          "bg-gray-50 border-2",
          isOpen
            ? "border-[#b99c79] bg-white shadow-lg shadow-[#b99c79]/10"
            : "border-transparent hover:border-gray-200 hover:bg-white",
        )}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {displayLabel}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-gray-400 transition-transform duration-300",
            isOpen && "rotate-180 text-[#b99c79]",
          )}
        />
      </button>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border overflow-hidden z-50"
          >
            <div className="py-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-all duration-200",
                    value === option.value
                      ? "bg-[#f7f3ee] text-[#b99c79] font-medium"
                      : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {value === option.value && (
                      <Check size={14} className="text-[#b99c79]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// ACTIVE FILTER TAG
// ─────────────────────────────────────────────────────────────

const FilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f7f3ee] text-[#8b7355] rounded-full text-sm font-medium">
    {label}
    <button onClick={onRemove} className="hover:text-red-500 transition-colors">
      <X size={12} />
    </button>
  </span>
);

// ─────────────────────────────────────────────────────────────
// MAIN FILTER BAR
// ─────────────────────────────────────────────────────────────

const ShopFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  hasFilters,
  clearFilters,
  onOpenMobileFilters,
}) => {
  const activeFilterCount = [search, category, brand].filter(Boolean).length;

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <SearchBar value={search} onChange={setSearch} />

          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-3">
            <Dropdown
              value={category}
              onChange={setCategory}
              options={CATEGORIES}
              placeholder="Category"
            />
            <Dropdown
              value={brand}
              onChange={setBrand}
              options={BRANDS}
              placeholder="Brand"
            />
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-500 hover:text-[#b99c79] font-medium transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilters}
            className="md:hidden flex items-center justify-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl font-medium transition-colors"
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#b99c79] text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Active Filters */}
        {hasFilters && (
          <div className="hidden md:flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm text-gray-500">Active filters:</span>
            {search && (
              <FilterTag label={`"${search}"`} onRemove={() => setSearch("")} />
            )}
            {category && (
              <FilterTag
                label={CATEGORIES.find((c) => c.value === category)?.label}
                onRemove={() => setCategory("")}
              />
            )}
            {brand && <FilterTag label={brand} onRemove={() => setBrand("")} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopFilters;
