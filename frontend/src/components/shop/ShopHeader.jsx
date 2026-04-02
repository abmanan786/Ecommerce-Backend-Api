// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/components/shop/ShopHeader.jsx
// 📌 PURPOSE: Shop page ka premium header banner
// ═══════════════════════════════════════════════════════════════════

import { Sparkles } from "lucide-react";

const ShopHeader = ({ totalProducts }) => {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-black via-[#1a1a1a] to-black py-16 md:py-24">
      {/* Background Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#b99c79]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <Sparkles className="text-[#b99c79]" size={14} />
          <span className="text-white/80 text-sm font-medium">
            Premium Collection
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Shop All Products
        </h1>

        {/* Subtitle */}
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Discover our curated collection of premium watches and accessories
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-10">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#b99c79]">
              {totalProducts}+
            </p>
            <p className="text-white/50 text-sm">Products</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-3xl font-bold text-[#b99c79]">50+</p>
            <p className="text-white/50 text-sm">Brands</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-3xl font-bold text-[#b99c79]">4.9</p>
            <p className="text-white/50 text-sm">Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
