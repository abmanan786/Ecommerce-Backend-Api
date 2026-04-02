// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/components/layout/Footer.jsx
// 📌 PURPOSE: Premium E-commerce Footer (Improved)
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  ChevronUp,
  Gift,
  Sparkles,
  CheckCircle,
  Bell,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// SOCIAL ICONS (Custom SVG)
// ═══════════════════════════════════════════════════════════════════

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Best Sellers", href: "/shop?filter=best" },
  { label: "Sale", href: "/shop?filter=sale" },
  { label: "About Us", href: "/about" },
];

const CUSTOMER_SERVICE = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Track Order", href: "/track-order" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Refund Policy", href: "/refund" },
];

const SOCIAL_LINKS = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

const FEATURES = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over £100" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: Clock, title: "24/7 Support", desc: "Dedicated support" },
];

const PAYMENT_METHODS = [
  { name: "Visa", color: "#1A1F71" },
  { name: "Mastercard", color: "#EB001B" },
  { name: "Amex", color: "#006FCF" },
  { name: "PayPal", color: "#003087" },
  { name: "Apple Pay", color: "#000000" },
  { name: "Google Pay", color: "#4285F4" },
];

const NEWSLETTER_BENEFITS = [
  "10% off your first order",
  "Exclusive member deals",
  "Early access to sales",
];

// ═══════════════════════════════════════════════════════════════════
// PREMIUM NEWSLETTER COMPONENT (Improved Design)
// ═══════════════════════════════════════════════════════════════════

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#b99c79]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b99c79]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Left Side - Content */}
          <div className="flex-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b99c79]/20 border border-[#b99c79]/30 mb-4"
            >
              <Sparkles size={14} className="text-[#b99c79]" />
              <span className="text-[#b99c79] text-xs font-semibold uppercase tracking-wider">
                Exclusive Offer
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3"
            >
              Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b99c79] to-[#d4b896]">
                VIP Club
              </span>
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm sm:text-base mb-6 max-w-md"
            >
              Subscribe to our newsletter and unlock exclusive benefits, early
              access to new collections, and special member-only discounts.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              {NEWSLETTER_BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                >
                  <CheckCircle size={12} className="text-green-400" />
                  <span className="text-white/80 text-xs sm:text-sm">
                    {benefit}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-auto lg:min-w-[380px]"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10">
              {/* Success State */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <CheckCircle className="text-green-400" size={32} />
                    </motion.div>
                    <h4 className="text-white font-bold text-lg mb-2">
                      Welcome to the Club! 🎉
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Check your inbox for your exclusive 10% discount code.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Gift Icon Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b99c79] to-[#8b7355] flex items-center justify-center">
                        <Gift size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Get 10% Off
                        </p>
                        <p className="text-gray-500 text-xs">
                          On your first order
                        </p>
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <div
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                          isFocused ? "text-[#b99c79]" : "text-gray-500"
                        }`}
                      >
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Enter your email address"
                        disabled={status === "loading"}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border-2 text-white text-sm placeholder:text-gray-500 outline-none transition-all duration-300 disabled:opacity-50 ${
                          isFocused
                            ? "border-[#b99c79] bg-white/10"
                            : status === "error"
                              ? "border-red-500"
                              : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-5 left-0 text-red-400 text-xs"
                        >
                          Please enter a valid email
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-[#b99c79] to-[#a08968] text-white hover:shadow-lg hover:shadow-[#b99c79]/25 disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Bell size={16} />
                          <span>Subscribe & Save 10%</span>
                        </>
                      )}
                    </motion.button>

                    {/* Privacy Note */}
                    <p className="text-gray-500 text-xs text-center">
                      By subscribing, you agree to our{" "}
                      <Link
                        to="/privacy"
                        className="text-[#b99c79] hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      . Unsubscribe anytime.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// FEATURES BAR
// ═══════════════════════════════════════════════════════════════════

const FeaturesBar = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-8 border-b border-gray-800">
    {FEATURES.map((feature, index) => {
      const Icon = feature.icon;
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 sm:gap-4"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#b99c79]/10 flex items-center justify-center flex-shrink-0">
            <Icon className="text-[#b99c79]" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base">
              {feature.title}
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
          </div>
        </motion.div>
      );
    })}
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// LINK COLUMN
// ═══════════════════════════════════════════════════════════════════

const LinkColumn = ({ title, links }) => (
  <div>
    <h4 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider">
      {title}
    </h4>
    <ul className="space-y-2 sm:space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.href}
            className="text-gray-400 hover:text-[#b99c79] text-sm sm:text-base transition-colors duration-200 inline-flex items-center gap-1 group"
          >
            <span>{link.label}</span>
            <ArrowRight
              size={12}
              className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
            />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// CONTACT INFO
// ═══════════════════════════════════════════════════════════════════

const ContactInfo = () => (
  <div>
    <h4 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider">
      Contact Us
    </h4>
    <ul className="space-y-4">
      <li>
        <a
          href="tel:+441234567890"
          className="flex items-start gap-3 text-gray-400 hover:text-[#b99c79] transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-[#b99c79]/10 flex items-center justify-center flex-shrink-0 transition-colors">
            <Phone size={14} className="group-hover:text-[#b99c79]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Call Us</p>
            <p className="text-white text-sm sm:text-base">+44 123 456 7890</p>
          </div>
        </a>
      </li>
      <li>
        <a
          href="mailto:support@luxwatch.com"
          className="flex items-start gap-3 text-gray-400 hover:text-[#b99c79] transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-[#b99c79]/10 flex items-center justify-center flex-shrink-0 transition-colors">
            <Mail size={14} className="group-hover:text-[#b99c79]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Us</p>
            <p className="text-white text-sm sm:text-base">
              support@luxwatch.com
            </p>
          </div>
        </a>
      </li>
      <li>
        <div className="flex items-start gap-3 text-gray-400">
          <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
            <MapPin size={14} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Visit Us</p>
            <p className="text-white text-sm sm:text-base">
              123 Luxury Street
              <br />
              London, UK W1A 1AA
            </p>
          </div>
        </div>
      </li>
      <li>
        <div className="flex items-start gap-3 text-gray-400">
          <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
            <Clock size={14} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Working Hours</p>
            <p className="text-white text-sm sm:text-base">
              Mon - Sat: 10AM - 8PM
              <br />
              Sun: 11AM - 6PM
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// SOCIAL LINKS
// ═══════════════════════════════════════════════════════════════════

const SocialLinks = () => (
  <div className="flex items-center gap-2">
    {SOCIAL_LINKS.map((social, index) => {
      const Icon = social.icon;
      return (
        <motion.a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-[#b99c79] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
          title={social.label}
        >
          <Icon />
        </motion.a>
      );
    })}
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// PAYMENT METHODS
// ═══════════════════════════════════════════════════════════════════

const PaymentMethods = () => (
  <div className="flex flex-wrap items-center gap-3">
    {PAYMENT_METHODS.map((method, index) => (
      <div
        key={index}
        className="h-8 px-3 rounded-md bg-white flex items-center justify-center"
        title={method.name}
      >
        <span className="text-xs font-bold" style={{ color: method.color }}>
          {method.name}
        </span>
      </div>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// SCROLL TO TOP BUTTON (Fixed & Improved)
// ═══════════════════════════════════════════════════════════════════

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 300); // Show after 300px scroll
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 20;

    const scrollAnimation = () => {
      if (window.scrollY > 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };

    requestAnimationFrame(scrollAnimation);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#b99c79] hover:bg-[#a08968] text-white flex items-center justify-center shadow-lg shadow-[#b99c79]/30 transition-colors"
          title="Back to top"
        >
          {/* Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-150"
            />
          </svg>

          {/* Icon */}
          <ChevronUp size={20} className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════════════
// MAIN FOOTER COMPONENT
// ═══════════════════════════════════════════════════════════════════

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(185,156,121,0.5) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Gradient Orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#b99c79]/5 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <div className="py-10 sm:py-16 border-b border-gray-800">
            <Newsletter />
          </div>

          {/* Features Bar */}
          <FeaturesBar />

          {/* Main Footer Content */}
          <div className="py-10 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  LUX<span className="text-[#b99c79]">WATCH</span>
                </h2>
              </Link>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                Discover timeless elegance with our premium collection of luxury
                watches. Crafted for those who appreciate the finer things in
                life.
              </p>

              <div className="mb-6">
                <p className="text-white font-semibold mb-4 text-sm">
                  Follow Us
                </p>
                <SocialLinks />
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <LinkColumn title="Quick Links" links={QUICK_LINKS} />
            </div>

            {/* Customer Service */}
            <div className="lg:col-span-2">
              <LinkColumn title="Help & Support" links={CUSTOMER_SERVICE} />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-4">
              <ContactInfo />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 sm:py-8 border-t border-gray-800">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <p className="text-gray-400 text-sm">
                  © {currentYear}{" "}
                  <span className="text-white font-semibold">LUXWATCH</span>.
                  All rights reserved.
                </p>
                <span className="hidden sm:inline text-gray-600">|</span>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  Made with{" "}
                  <Heart size={12} className="text-red-500 fill-red-500" /> in
                  London
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {LEGAL_LINKS.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-gray-400 hover:text-[#b99c79] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6 border-t border-gray-800/50">
              <p className="text-gray-500 text-sm">Secure Payment Methods</p>
              <PaymentMethods />
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button - Outside footer, always visible */}
      <ScrollToTop />
    </>
  );
};

export default Footer;
