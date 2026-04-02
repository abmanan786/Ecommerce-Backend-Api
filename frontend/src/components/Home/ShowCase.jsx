import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import leftImg from "../../assets/images/banner-1.jpg";
import centerTop from "../../assets/images/banner-2.jpg";
import centerBottom from "../../assets/images/banner-4.jpg";
import rightImg from "../../assets/images/banner-3.jpg";

const Showcase = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black"
    >
      {/* Ambient Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="
          relative grid grid-cols-1 md:grid-cols-3
          min-h-screen md:h-[95vh] xl:h-screen
          gap-[1px] md:gap-[2px]
          bg-zinc-800/50
          p-[1px] md:p-[2px]
        "
      >
        {/* LEFT PANEL - Full Height */}
        <ShowCard
          image={leftImg}
          title="TIME"
          subtitle="COLLECTION"
          desc="Unique Watches from Classic Collections"
          button="BUY NOW"
          badge="NEW ARRIVAL"
          index={0}
        />

        {/* CENTER - Stacked Panels */}
        <div className="grid grid-rows-2 gap-[1px] md:gap-[2px]">
          <ShowCard
            image={centerTop}
            title="GIZMO"
            subtitle="SERIES"
            desc="Modern Excellence You Can Wear"
            button="VIEW COLLECTIONS"
            badge="TRENDING"
            index={1}
            isSmall
          />
          <ShowCard
            image={centerBottom}
            title="AUTOMATIC"
            subtitle="HERITAGE"
            desc="Classic Engineering Meets Precision"
            button="EXPLORE"
            badge="LIMITED"
            index={2}
            isSmall
          />
        </div>

        {/* RIGHT PANEL - Full Height */}
        <ShowCard
          image={rightImg}
          title="GET INVITED"
          subtitle="EXCLUSIVE"
          desc="The Classic Men Issue"
          button="JOIN NOW"
          badge="MEMBERS ONLY"
          index={3}
        />
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

/* === Premium Card Component === */
const ShowCard = ({
  image,
  title,
  subtitle,
  desc,
  button,
  badge,
  index,
  isSmall = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const springConfig = { stiffness: 150, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Parallax transforms
  const rotateX = useTransform(y, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-2deg", "2deg"]);
  const imageX = useTransform(x, [-0.5, 0.5], ["2%", "-2%"]);
  const imageY = useTransform(y, [-0.5, 0.5], ["2%", "-2%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleTap = () => {
    if (window.innerWidth < 768) {
      setIsTapped(true);
      setTimeout(() => setIsTapped(false), 1500);
    }
  };

  const isActive = isHovered || isTapped;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onClick={handleTap}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: window.innerWidth >= 768 ? rotateX : 0,
        rotateY: window.innerWidth >= 768 ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`
        group relative flex items-center justify-center overflow-hidden cursor-pointer
        ${isSmall ? "min-h-[45vh] md:min-h-0" : "min-h-[60vh] md:min-h-0"}
        bg-zinc-950
      `}
    >
      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-shimmer" />
        </div>
      )}

      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-[-10%] w-[120%] h-[120%]"
        style={{
          x: window.innerWidth >= 768 ? imageX : 0,
          y: window.innerWidth >= 768 ? imageY : 0,
        }}
      >
        <motion.img
          src={image}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          animate={{
            scale: isActive ? 1.1 : 1,
            filter: isActive ? "brightness(1.1)" : "brightness(0.9)",
          }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Multi-layer Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
      <motion.div
        animate={{
          opacity: isActive ? 0.3 : 0.6,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black"
      />

      {/* Vignette Effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

      {/* Golden Accent Line */}
      <motion.div
        animate={{
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a35c] to-transparent origin-center"
      />

      {/* Shine Sweep Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: isActive ? ["0%", "200%"] : "-100%",
            opacity: isActive ? [0, 1, 0] : 0,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#c5a35c]/30 transition-all duration-500 group-hover:border-[#c5a35c] group-hover:w-12 group-hover:h-12" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#c5a35c]/30 transition-all duration-500 group-hover:border-[#c5a35c] group-hover:w-12 group-hover:h-12" />

      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          className="absolute top-6 right-6 z-20"
        >
          <div
            className="
            px-3 py-1.5
            bg-gradient-to-r from-[#c5a35c] to-[#d4af37]
            text-black text-[9px] sm:text-[10px]
            font-bold tracking-[0.2em] uppercase
            shadow-lg shadow-amber-500/20
          "
          >
            {badge}
          </div>
        </motion.div>
      )}

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 md:px-10 lg:px-16">
        {/* Subtitle */}
        <motion.span
          animate={{
            opacity: isActive ? 1 : 0.6,
            y: isActive ? 0 : 5,
          }}
          transition={{ duration: 0.4 }}
          className="
            text-[10px] sm:text-xs tracking-[0.4em] uppercase
            text-[#c5a35c] font-medium
            mb-2 sm:mb-3
          "
        >
          {subtitle}
        </motion.span>

        {/* Title */}
        <motion.h2
          animate={{
            scale: isActive ? 1.05 : 1,
            y: isActive ? -5 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`
            ${
              isSmall
                ? "text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl"
                : "text-4xl sm:text-5xl md:text-4xl lg:text-6xl xl:text-7xl"
            }
            font-black tracking-[0.08em] sm:tracking-[0.12em] uppercase
            text-white
            transition-colors duration-500
            group-hover:text-transparent group-hover:bg-clip-text
            group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#c5a35c] group-hover:to-white
            drop-shadow-2xl
          `}
          style={{
            textShadow: isActive ? "0 0 60px rgba(197, 163, 92, 0.3)" : "none",
          }}
        >
          {title}
        </motion.h2>

        {/* Decorative Line */}
        <motion.div
          animate={{
            width: isActive ? "80px" : "40px",
            opacity: isActive ? 1 : 0.5,
          }}
          transition={{ duration: 0.5 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#c5a35c] to-transparent my-4 sm:my-5"
        />

        {/* Description */}
        <motion.p
          animate={{
            opacity: isActive ? 1 : 0.7,
            y: isActive ? 0 : 10,
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`
            ${isSmall ? "text-xs sm:text-sm" : "text-sm sm:text-base md:text-lg"}
            text-gray-300 leading-relaxed
            max-w-[280px] sm:max-w-xs md:max-w-sm
            font-light
          `}
        >
          {desc}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          animate={{
            y: isActive ? 0 : 15,
            opacity: isActive ? 1 : 0.8,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className={`
            mt-6 sm:mt-8 relative overflow-hidden
            border border-[#c5a35c]/80
            ${isSmall ? "px-6 sm:px-8 py-2 sm:py-2.5" : "px-8 sm:px-10 py-2.5 sm:py-3"}
            ${isSmall ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"}
            font-semibold tracking-[0.2em] uppercase
            text-[#c5a35c]
            transition-all duration-500
            group-hover:border-[#c5a35c]
            group-hover:shadow-[0_0_30px_rgba(197,163,92,0.3)]
            before:absolute before:inset-0
            before:bg-gradient-to-r before:from-[#c5a35c] before:to-[#d4af37]
            before:translate-x-[-101%]
            before:transition-transform before:duration-500
            group-hover:before:translate-x-0
            group-hover:text-black
            backdrop-blur-sm
          `}
        >
          <span className="relative z-10 flex items-center gap-2">
            {button}
            <motion.svg
              animate={{ x: isActive ? 3 : 0 }}
              transition={{ duration: 0.3 }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </span>
        </motion.button>
      </div>

      {/* Bottom Info Bar */}
      <motion.div
        animate={{
          y: isActive ? 0 : 20,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[10px] sm:text-xs text-gray-400"
      >
        <span className="tracking-wider">EST. 2024</span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          PREVIEW
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Showcase;
