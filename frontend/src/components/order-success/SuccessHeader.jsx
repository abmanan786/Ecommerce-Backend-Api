// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/components/order-success/SuccessHeader.jsx
// 📌 PURPOSE: Top header + Fast Party Pack Celebrations
// ═══════════════════════════════════════════════════════════════════

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Home,
  Printer,
  Copy,
  Check,
} from "lucide-react";
import { useCopyClipboard, useWindowSize } from "../../hooks/useAppHooks";
import {
  scaleIn,
  fadeUp,
  pulseAnim,
  CONFETTI_COLORS,
} from "../../utils/orderHelpers";

// ═══════════════════════════════════════════════════════════════════
// 🎊 CONFETTI - Zyada aur Fast!
// ═══════════════════════════════════════════════════════════════════

export const Confetti = () => {
  const { width, height, isMobile } = useWindowSize();
  const count = isMobile ? 80 : 150; // Zyada confetti!

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const colors = [
          ...CONFETTI_COLORS,
          "#FF69B4",
          "#00CED1",
          "#9B59B6",
          "#2ECC71",
        ];
        const size = 6 + Math.random() * 10;
        const startX = Math.random() * width;
        const duration = 1.5 + Math.random() * 1.5; // Fast!
        const delay = Math.random() * 0.8;
        const rotation = Math.random() * 720 - 360;
        const shapes = ["rounded-none", "rounded-full", "rounded-sm"];

        return (
          <motion.div
            key={i}
            className={`absolute ${shapes[i % 3]}`}
            style={{
              width: size,
              height: size,
              backgroundColor: colors[i % colors.length],
              left: startX,
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{
              y: height + 50,
              opacity: [1, 1, 0.8, 0],
              rotate: rotation,
              x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: duration,
              delay: delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 🎆 FIREWORKS - Patakhe!
// ═══════════════════════════════════════════════════════════════════

const Firework = ({ x, y, color, delay }) => {
  const particles = 16;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {[...Array(particles)].map((_, i) => {
        const angle = (i * 360) / particles;
        const distance = 50 + Math.random() * 50;

        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
          />
        );
      })}
      <motion.div
        className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: color }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.4, delay }}
      />
    </motion.div>
  );
};

const Fireworks = () => {
  const { width, height, isMobile } = useWindowSize();
  const colors = [
    "#FFD700",
    "#FF6B6B",
    "#4ECDC4",
    "#FF69B4",
    "#b99c79",
    "#9B59B6",
    "#00CED1",
  ];

  // Zyada fireworks!
  const positions = isMobile
    ? [
        { x: width * 0.2, y: height * 0.2 },
        { x: width * 0.8, y: height * 0.15 },
        { x: width * 0.5, y: height * 0.25 },
        { x: width * 0.3, y: height * 0.35 },
        { x: width * 0.7, y: height * 0.3 },
      ]
    : [
        { x: width * 0.1, y: height * 0.15 },
        { x: width * 0.9, y: height * 0.1 },
        { x: width * 0.5, y: height * 0.12 },
        { x: width * 0.25, y: height * 0.25 },
        { x: width * 0.75, y: height * 0.2 },
        { x: width * 0.15, y: height * 0.35 },
        { x: width * 0.85, y: height * 0.3 },
        { x: width * 0.4, y: height * 0.18 },
        { x: width * 0.6, y: height * 0.22 },
        { x: width * 0.35, y: height * 0.4 },
        { x: width * 0.65, y: height * 0.38 },
        { x: width * 0.2, y: height * 0.45 },
        { x: width * 0.8, y: height * 0.42 },
      ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {positions.map((pos, i) => (
        <Firework
          key={i}
          x={pos.x}
          y={pos.y}
          color={colors[i % colors.length]}
          delay={i * 0.15} // Fast sequence!
        />
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ⭐ STARS BURST
// ═══════════════════════════════════════════════════════════════════

const StarBurst = () => {
  const { width, height, isMobile } = useWindowSize();
  const count = isMobile ? 15 : 30;
  const colors = ["#FFD700", "#FFA500", "#FFFF00", "#FFE4B5", "#b99c79"];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const size = 12 + Math.random() * 16;
        const x = Math.random() * width;
        const y = Math.random() * height * 0.6;
        const delay = Math.random() * 0.5;

        return (
          <motion.svg
            key={i}
            className="absolute"
            style={{ left: x, top: y }}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={colors[i % colors.length]}
            initial={{ scale: 0, rotate: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], rotate: 180, opacity: [1, 1, 0] }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ✨ SPARKLES EVERYWHERE
// ═══════════════════════════════════════════════════════════════════

const SparklesEffect = () => {
  const { width, height, isMobile } = useWindowSize();
  const count = isMobile ? 25 : 50;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(count)].map((_, i) => {
        const size = 4 + Math.random() * 8;
        const x = Math.random() * width;
        const y = Math.random() * height * 0.7;
        const delay = Math.random() * 1;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-300"
            style={{ width: size, height: size, left: x, top: y }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 🎉 PARTY PACK - Sab Ek Jagah!
// ═══════════════════════════════════════════════════════════════════

export const PartyPack = () => {
  return (
    <>
      <Confetti />
      <Fireworks />
      <StarBurst />
      <SparklesEffect />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 📋 COPY BUTTON
// ═══════════════════════════════════════════════════════════════════

const CopyButton = ({ text }) => {
  const { copied, copy } = useCopyClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className="p-1 sm:p-1.5 rounded-lg hover:bg-white/20 transition-colors"
    >
      {copied ? (
        <Check size={12} className="sm:w-3.5 sm:h-3.5 text-green-400" />
      ) : (
        <Copy size={12} className="sm:w-3.5 sm:h-3.5 text-white/60" />
      )}
    </button>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 🎯 MAIN HEADER - Original Text (No Changes)
// ═══════════════════════════════════════════════════════════════════

const SuccessHeader = ({ orderId, isDirectAccess }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-[#1a1a1a] to-[#0d0d0d]" />

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={pulseAnim}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-20 -right-20 sm:-top-32 sm:-right-32 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 rounded-full bg-[#b99c79]/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 sm:-bottom-32 sm:-left-32 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 rounded-full bg-white/10 blur-3xl"
        />
      </div>

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M20 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-16">
        {/* Success Icon */}
        <motion.div {...scaleIn} className="flex justify-center mb-5 sm:mb-8">
          <div className="relative">
            <motion.div
              animate={pulseAnim}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-[#b99c79]/30 blur-xl"
            />
            <div className="relative w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20 rounded-full bg-linear-to-br from-[#b99c79] to-[#8b7355] flex items-center justify-center shadow-2xl">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <CheckCircle2 className="text-white w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10" />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text - ORIGINAL (No Changes) */}
        <motion.div {...fadeUp(0.2)} className="text-center px-2">
          <p className="text-[#b99c79] text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium mb-2 sm:mb-3">
            Order Confirmed
          </p>
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Thank You for Your Order!
          </h1>
          <p className="text-white/60 text-sm sm:text-base md:text-lg mt-2 sm:mt-4 max-w-xl mx-auto">
            Your order has been successfully placed. We'll send you a
            confirmation email shortly.
          </p>

          {/* Order ID Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <span className="text-white/70 text-xs sm:text-sm">Order ID:</span>
            <span className="text-white font-bold text-sm sm:text-lg">
              #{orderId}
            </span>
            <CopyButton text={orderId} />
          </motion.div>

          {isDirectAccess && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/50 text-[10px] sm:text-xs mt-3 sm:mt-4 px-4"
            >
              Demo page - order data may not be available if opened directly.
            </motion.p>
          )}
        </motion.div>

        {/* Buttons */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-2"
        >
          <Link
            to="/shop"
            className="h-10 sm:h-12 px-5 sm:px-8 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#b99c79] to-[#a08968] text-white hover:shadow-lg hover:shadow-[#b99c79]/25 transition-all duration-300 active:scale-95"
          >
            Continue Shopping{" "}
            <ArrowRight size={16} className="sm:w-4.5 sm:h-4.5" />
          </Link>

          <div className="flex gap-2 sm:gap-3">
            <Link
              to="/"
              className="flex-1 sm:flex-none h-10 sm:h-12 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 active:scale-95"
            >
              <Home size={16} className="sm:w-4.5 sm:h-4.5" />
              <span>Home</span>
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-none h-10 sm:h-12 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 transition-all duration-300 active:scale-95"
            >
              <Printer size={16} className="sm:w-4.5 sm:h-4.5" />
              <span className="hidden xs:inline">Print</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessHeader;
