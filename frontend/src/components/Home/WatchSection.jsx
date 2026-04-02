// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/components/sections/WatchSection.jsx
// 📌 PURPOSE: Premium Watch Collection Section
// ═══════════════════════════════════════════════════════════════════

import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Eye,
  ShoppingBag,
  Sparkles,
  Star,
  ChevronRight,
} from "lucide-react";

import collection1 from "../../assets/images/collection1.jpg";
import collection2 from "../../assets/images/collection2.jpg";
import collection3 from "../../assets/images/collection3.jpg";

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════

const products = [
  {
    id: 1,
    title: "Chronograph 100M",
    subtitle: "Timers Villa",
    description: "Precision engineering meets timeless design",
    image: collection1,
    price: "£2,499",
    rating: 4.9,
    tag: "Best Seller",
  },
  {
    id: 2,
    title: "Men's Maiden",
    subtitle: "A Friend of a Man",
    description: "Elegance redefined for the modern gentleman",
    image: collection2,
    price: "£3,299",
    rating: 5.0,
    featured: true,
    tag: "Featured",
  },
  {
    id: 3,
    title: "Thin Dial",
    subtitle: "Complete Mechanical",
    description: "Ultra-slim profile with exceptional accuracy",
    image: collection3,
    price: "£1,899",
    rating: 4.8,
    tag: "New Arrival",
  },
];

// ═══════════════════════════════════════════════════════════════════
// SECTION HEADER
// ═══════════════════════════════════════════════════════════════════

const SectionHeader = ({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8 }}
    className="text-center mb-16"
  >
    {/* Badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.2 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b99c79]/10 border border-[#b99c79]/20 mb-6"
    >
      <Sparkles size={14} className="text-[#b99c79]" />
      <span className="text-[#b99c79] text-xs font-semibold uppercase tracking-wider">
        Curated Collection
      </span>
    </motion.div>

    {/* Title */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
      Exceptional{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b99c79] to-[#8b7355]">
        Timepieces
      </span>
    </h2>

    {/* Subtitle */}
    <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
      Discover our handpicked selection of luxury watches, where craftsmanship
      meets elegance
    </p>

    {/* Decorative Line */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="w-24 h-1 bg-gradient-to-r from-transparent via-[#b99c79] to-transparent mx-auto mt-8"
    />
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════
// PREMIUM PRODUCT CARD
// ═══════════════════════════════════════════════════════════════════

const ProductCard = ({ product, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative cursor-pointer ${
        product.featured ? "md:-mt-8 md:mb-8" : ""
      }`}
    >
      {/* Card Container */}
      <div
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-500 ${
          product.featured
            ? "bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] shadow-2xl"
            : "bg-white shadow-lg hover:shadow-2xl"
        }`}
      >
        {/* Tag Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
          className={`absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-semibold ${
            product.featured
              ? "bg-[#b99c79] text-white"
              : product.tag === "Best Seller"
                ? "bg-green-500 text-white"
                : "bg-black text-white"
          }`}
        >
          {product.tag}
        </motion.div>

        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-gray-900">
            {product.rating}
          </span>
        </motion.div>

        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* Image */}
          <motion.img
            src={product.image}
            alt={product.title}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              product.featured
                ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                : "bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
            }`}
          />

          {/* Featured Border */}
          {product.featured && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-4 sm:inset-6 border-2 border-[#b99c79]/50 rounded-xl pointer-events-none"
            />
          )}

          {/* Shine Effect */}
          <motion.div
            animate={{
              x: isHovered ? ["0%", "200%"] : "-100%",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
          />

          {/* Hover Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <Link
              to={`/product/${product.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-gray-900 font-semibold text-sm hover:bg-[#b99c79] hover:text-white transition-all duration-300"
            >
              <Eye size={16} />
              <span>View Details</span>
            </Link>
            <button className="w-12 h-12 rounded-xl bg-[#b99c79] text-white flex items-center justify-center hover:bg-[#a08968] transition-colors">
              <ShoppingBag size={18} />
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <div
          className={`p-5 sm:p-6 ${product.featured ? "text-white" : "text-gray-900"}`}
        >
          {/* Subtitle */}
          <p
            className={`text-xs uppercase tracking-wider mb-2 ${
              product.featured ? "text-[#b99c79]" : "text-gray-400"
            }`}
          >
            {product.subtitle}
          </p>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-[#b99c79] transition-colors">
            {product.title}
          </h3>

          {/* Description */}
          <p
            className={`text-sm mb-4 line-clamp-2 ${
              product.featured ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {product.description}
          </p>

          {/* Price & Action */}
          <div className="flex items-center justify-between">
            <div>
              <span
                className={`text-xs ${
                  product.featured ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Starting from
              </span>
              <p className="text-xl sm:text-2xl font-bold text-[#b99c79]">
                {product.price}
              </p>
            </div>

            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                product.featured
                  ? "bg-[#b99c79] text-white"
                  : "bg-gray-100 text-gray-600 group-hover:bg-[#b99c79] group-hover:text-white"
              }`}
            >
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </div>

        {/* Featured Glow Effect */}
        {product.featured && (
          <div className="absolute -inset-1 bg-gradient-to-r from-[#b99c79]/20 via-[#b99c79]/10 to-[#b99c79]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        )}
      </div>

      {/* Corner Decorations for Featured */}
      {product.featured && (
        <>
          <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-[#b99c79]/30 rounded-tl-lg" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-[#b99c79]/30 rounded-br-lg" />
        </>
      )}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// VIEW ALL BUTTON
// ═══════════════════════════════════════════════════════════════════

const ViewAllButton = ({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="text-center mt-12 sm:mt-16"
  >
    <Link
      to="/shop"
      className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-semibold text-sm hover:bg-[#b99c79] transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <span>Explore Full Collection</span>
      <motion.span
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronRight size={18} />
      </motion.span>
    </Link>

    <p className="text-gray-400 text-sm mt-4">
      Over 200+ premium timepieces available
    </p>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const WatchSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#b99c79]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b99c79]/5 rounded-full blur-[120px]" />

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader isInView={isInView} />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View All Button */}
        <ViewAllButton isInView={isInView} />
      </div>

      {/* Bottom Gradient Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#b99c79]/30 to-transparent"
      />
    </section>
  );
};

export default WatchSection;
