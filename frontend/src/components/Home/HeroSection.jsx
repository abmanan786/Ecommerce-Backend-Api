import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MoveRight, Star } from "lucide-react";
import watchImage from "../../assets/images/imgslider.jpg";

// ═══════════════════════════════════════════════════════════
// CUSTOMER IMAGES (Real Avatars)
// ═══════════════════════════════════════════════════════════

const CUSTOMERS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
];

// ═══════════════════════════════════════════════════════════
// PREMIUM TEXT ANIMATION COMPONENT
// ═══════════════════════════════════════════════════════════

const AnimatedText = ({ text, className, delay = 0, type = "word" }) => {
  if (type === "letter") {
    // Letter by letter animation
    const letters = text.split("");

    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
          delayChildren: delay,
        },
      },
    };

    const child = {
      hidden: { opacity: 0, y: 50, rotateX: -90 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
    };

    return (
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className={`inline-block ${className}`}
        style={{ perspective: "1000px" }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Word by word animation
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -80,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-[0.25em]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ═══════════════════════════════════════════════════════════
// ANIMATED LINE COMPONENT
// ═══════════════════════════════════════════════════════════

const AnimatedLine = ({ delay = 0 }) => (
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: 48, opacity: 1 }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className="h-px bg-linear-to-r from-[#c5a35c] to-[#c5a35c]/0"
  />
);

// ═══════════════════════════════════════════════════════════
// REVEAL ANIMATION WRAPPER
// ═══════════════════════════════════════════════════════════

const RevealWrapper = ({ children, delay = 0 }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  </div>
);

// ═══════════════════════════════════════════════════════════
// CUSTOMER AVATARS COMPONENT
// ═══════════════════════════════════════════════════════════

const CustomerAvatars = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay }}
    className="flex items-center gap-4 sm:gap-6"
  >
    {/* Avatars */}
    <div className="flex -space-x-3">
      {CUSTOMERS.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            type: "spring",
            stiffness: 200,
          }}
          className="relative"
        >
          <img
            src={src}
            alt={`Customer ${i + 1}`}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-black object-cover
                       ring-2 ring-[#c5a35c]/20"
          />
          {i === CUSTOMERS.length - 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.6, type: "spring" }}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#c5a35c] rounded-full 
                         flex items-center justify-center"
            >
              <span className="text-black text-[8px] font-bold">+</span>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Text */}
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
        className="flex items-center gap-1"
      >
        <span className="text-white font-bold text-lg sm:text-xl">25,000</span>
        <span className="text-[#c5a35c] font-bold">+</span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.6 }}
        className="text-white/50 text-xs sm:text-sm"
      >
        Happy Customers
      </motion.p>
    </div>

    {/* Rating */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay + 0.7 }}
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10"
    >
      <Star size={14} className="text-[#c5a35c] fill-[#c5a35c]" />
      <span className="text-white text-sm font-semibold">4.9</span>
    </motion.div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════
// MAIN HERO SECTION
// ═══════════════════════════════════════════════════════════

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      <div className="relative min-h-100svh">
        {/* ═══════════════ BACKGROUND ═══════════════ */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${watchImage})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30" />
        </motion.div>

        {/* ═══════════════ DECORATIVE ELEMENTS ═══════════════ */}
        {/* Corner Accents */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-[#c5a35c]/20" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-[#c5a35c]/20" />

        {/* ═══════════════ CONTENT ═══════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="min-h-100svh flex items-center py-24 sm:py-20">
            <div className="max-w-2xl lg:max-w-3xl">
              {/* Eyebrow Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex items-center gap-4 mb-6 sm:mb-8"
              >
                <AnimatedLine delay={0.2} />
                <RevealWrapper delay={0.3}>
                  <span className="text-[#c5a35c] text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
                    Established 2009
                  </span>
                </RevealWrapper>
              </motion.div>

              {/* Main Heading - Line 1 */}
              <div className="overflow-hidden mb-1 sm:mb-2">
                <AnimatedText
                  text="Timeless"
                  type="letter"
                  delay={0.4}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-white"
                />
              </div>

              {/* Main Heading - Line 2 */}
              <div className="overflow-hidden">
                <AnimatedText
                  text="Elegance"
                  type="letter"
                  delay={0.7}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#c5a35c]"
                />
              </div>

              {/* Animated Underline */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 1.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="w-24 sm:w-32 h-0.5 bg-linear-to-r from-[#c5a35c] to-transparent mt-4 sm:mt-6 origin-left"
              />

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="mt-6 sm:mt-8"
              >
                <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
                  Discover watches that define{" "}
                  <span className="text-white font-medium">sophistication</span>
                  . Handcrafted with passion, worn with{" "}
                  <span className="text-[#c5a35c] font-medium">pride</span>.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                {/* Primary Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/shop")}
                  className="group relative px-8 sm:px-10 py-4 bg-[#c5a35c] text-black font-semibold 
                           overflow-hidden transition-all duration-500"
                >
                  {/* Shine Effect */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                                 transition-transform duration-700 bg-linear-to-r from-transparent 
                                 via-white/40 to-transparent"
                  />
                  {/* Button Content */}
                  <span className="relative flex items-center justify-center gap-2">
                    Explore Collection
                    <MoveRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </span>
                </motion.button>

                {/* Secondary Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/about")}
                  className="group px-8 sm:px-10 py-4 border border-white/30 font-medium 
                           hover:bg-white hover:text-black transition-all duration-300
                           flex items-center justify-center gap-2"
                >
                  Our Heritage
                  <motion.span
                    className="w-2 h-2 rounded-full bg-[#c5a35c] group-hover:bg-black transition-colors"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>
              </motion.div>

              {/* Customers Section */}
              <div className="mt-12 sm:mt-16">
                <CustomerAvatars delay={1.8} />
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ SIDE TEXT (Desktop) ═══════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="hidden lg:block absolute right-10 xl:right-16 top-1/2 -translate-y-1/2"
        >
          <p className="text-white/10 text-xs tracking-[0.5em] uppercase [writing-mode:vertical-rl] rotate-180">
            Premium Timepieces Since 2009
          </p>
        </motion.div>

        {/* ═══════════════ SCROLL INDICATOR ═══════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-5 sm:left-8 lg:left-12 flex items-center gap-4"
        >
          <div className="relative h-12 w-px bg-white/10 overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-1/2 bg-linear-to-b from-[#c5a35c] to-transparent"
            />
          </div>
          <span className="text-white/30 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
            Scroll
          </span>
        </motion.div>

        {/* ═══════════════ BOTTOM STATS (Mobile) ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 right-5 sm:hidden"
        >
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
            <Star size={12} className="text-[#c5a35c] fill-[#c5a35c]" />
            <span className="text-white text-xs font-semibold">4.9</span>
            <span className="text-white/50 text-[10px]">Rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
