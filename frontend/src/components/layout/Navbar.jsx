// ═══════════════════════════════════════════════════════════
// 📁 FILE: src/components/layout/Navbar.jsx
// 📌 PURPOSE: Premium Navbar with Auth Dropdown + Cart + Search + Mobile Menu
// ═══════════════════════════════════════════════════════════

import { useState, useMemo, useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Package,
  Trash2,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

import logo from "../../assets/logo.webp";
import { megaMenuData, navItems } from "../../data/menuData";
import { CartContext } from "../../context/AddCartContext";
import { useAuth } from "../../context/AuthContext";
import { fetchProductById } from "../../api/productApi";

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════

const parsePrice = (price) => {
  if (!price) return 0;
  const n = Number(String(price).replace(/[^\d.]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};

const cn = (...classes) => classes.filter(Boolean).join(" ");

const FALLBACK_IMG = "https://placehold.co/100x100/f5f5f5/999?text=Product";

// ═══════════════════════════════════════════════════════════
// CUSTOM HOOK - CHECK IF MOBILE
// ═══════════════════════════════════════════════════════════

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

// ═══════════════════════════════════════════════════════════
// LOGO COMPONENT
// ═══════════════════════════════════════════════════════════

const Logo = () => (
  <Link to="/" className="relative group" aria-label="Go to homepage">
    <motion.img
      src={logo}
      alt="Logo"
      className="h-8 sm:h-10 w-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    />
  </Link>
);

// ═══════════════════════════════════════════════════════════
// SEARCH BAR COMPONENT
// ═══════════════════════════════════════════════════════════

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl"
          >
            <div className="max-w-3xl mx-auto p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for watches, brands..."
                  className="w-full pl-12 pr-12 py-3 sm:py-4 text-base border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:border-[#b99c79] transition-colors"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </form>

              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                <span className="text-xs sm:text-sm text-gray-500">
                  Popular:
                </span>
                {["Rolex", "Casio", "Apple Watch"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      navigate(`/shop?search=${term}`);
                      onClose();
                    }}
                    className="px-3 py-1 text-xs sm:text-sm bg-gray-100 hover:bg-[#f7f3ee] hover:text-[#b99c79] rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════
// CART PREVIEW DROPDOWN
// ═══════════════════════════════════════════════════════════

const CartPreview = ({ isOpen, cart, productMap, total, onClose }) => {
  const navigate = useNavigate();
  const { removeFromCart } = useContext(CartContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Shopping Cart</h3>
              <span className="text-xs text-gray-500">
                {cart?.length || 0} items
              </span>
            </div>

            <div className="max-h-72 overflow-y-auto">
              {!cart?.length ? (
                <div className="p-8 text-center">
                  <Package className="mx-auto text-gray-300 mb-3" size={40} />
                  <p className="text-gray-500 text-sm">Your cart is empty</p>
                </div>
              ) : (
                <div className="divide-y">
                  {cart.slice(0, 3).map((item) => {
                    const product = productMap[item.id];
                    const image = product?.image || FALLBACK_IMG;
                    const name = product?.name || `Product #${item.id}`;
                    const price = product?.price || "£0.00";

                    return (
                      <div
                        key={item.id}
                        className="p-3 flex gap-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                          <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-contain p-1"
                            onError={(e) =>
                              (e.currentTarget.src = FALLBACK_IMG)
                            }
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity || 1}
                          </p>
                          <p className="text-sm font-semibold text-[#b99c79]">
                            {price}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2
                            size={14}
                            className="text-gray-400 hover:text-red-500"
                          />
                        </button>
                      </div>
                    );
                  })}

                  {cart.length > 3 && (
                    <div className="p-3 text-center text-sm text-gray-500">
                      +{cart.length - 3} more items
                    </div>
                  )}
                </div>
              )}
            </div>

            {cart?.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="font-bold text-lg">£{total.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      navigate("/cart");
                      onClose();
                    }}
                    className="py-2.5 border-2 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={() => {
                      navigate("/checkout");
                      onClose();
                    }}
                    className="py-2.5 bg-black text-white rounded-xl font-semibold text-sm hover:bg-[#b99c79] transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════
// ACCOUNT DROPDOWN
// ═══════════════════════════════════════════════════════════

const AccountDropdown = ({
  isOpen,
  onClose,
  isAuthenticated,
  currentUser,
  onLogout,
}) => {
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-br from-black to-[#1a1a1a] text-white">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                  <User size={20} className="text-[#b99c79]" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">
                    {currentUser?.fullName || "My Account"}
                  </p>
                  <p className="text-xs text-white/60 truncate">
                    {currentUser?.email || ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  navigate("/account");
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LayoutDashboard size={18} className="text-[#b99c79]" />
                <span>My Account</span>
              </button>

              <button
                onClick={() => {
                  navigate("/account");
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Package size={18} className="text-[#b99c79]" />
                <span>Orders & Details</span>
              </button>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════

const MobileMenu = ({ isOpen, onClose, isAuthenticated, currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f7f3ee] flex items-center justify-center">
                  <Menu size={18} className="text-[#b99c79]" />
                </div>
                <span className="font-bold text-gray-900">Menu</span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 border-b">
              <div
                onClick={() => {
                  onClose();
                }}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <Search size={18} className="text-gray-400" />
                <span className="text-gray-500 text-sm">
                  Search products...
                </span>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all",
                          isActive
                            ? "bg-[#f7f3ee] text-[#b99c79]"
                            : "text-gray-700 hover:bg-gray-50",
                        )
                      }
                    >
                      <span>{item.name}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="my-6 border-t" />

              <NavLink
                to={isAuthenticated ? "/account" : "/login"}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User size={20} />
                <span className="font-medium">
                  {isAuthenticated
                    ? currentUser?.fullName || "My Account"
                    : "Login / Register"}
                </span>
              </NavLink>
            </nav>

            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => {
                  navigate("/shop");
                  onClose();
                }}
                className="w-full py-3 bg-black text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#b99c79] transition-colors"
              >
                Shop Collection
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════
// MEGA MENU
// ═══════════════════════════════════════════════════════════

const MegaMenu = ({ data, isOpen }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-full w-full bg-white shadow-xl border-t"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 px-8 py-10">
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {data.columns?.map((column) => (
                <div key={column.title}>
                  <h4 className="text-sm font-bold text-[#b99c79] uppercase tracking-wider mb-4">
                    {column.title}
                  </h4>
                  <ul className="space-y-3">
                    {column.items.map((item) => (
                      <li key={item}>
                        <Link
                          to={`/shop?category=${item.toLowerCase()}`}
                          className="text-sm text-gray-600 hover:text-black hover:pl-2 transition-all"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {data.images && (
              <div className="lg:col-span-2 hidden lg:grid grid-cols-2 gap-4">
                {data.images.map((image) => (
                  <Link
                    key={image.alt}
                    to="/shop"
                    className="group relative overflow-hidden rounded-xl aspect-4/5"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold">{image.alt}</p>
                      <p className="text-white/70 text-sm">Shop Now →</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════
// MAIN NAVBAR
// ═══════════════════════════════════════════════════════════

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { cart } = useContext(CartContext);

  const cartCount = useMemo(() => {
    return (cart || []).reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [cart]);

  const [cartTotal, setCartTotal] = useState(0);
  const [productMap, setProductMap] = useState({});

  useEffect(() => {
    let mounted = true;

    const loadCartData = async () => {
      if (!cart?.length) {
        if (mounted) {
          setCartTotal(0);
          setProductMap({});
        }
        return;
      }

      try {
        const uniqueIds = [...new Set(cart.map((c) => c.id))];
        const entries = await Promise.all(
          uniqueIds.map(async (id) => {
            const p = await fetchProductById(id);
            return [id, p];
          }),
        );

        const map = Object.fromEntries(entries);

        const total = cart.reduce((sum, item) => {
          const p = map[item.id];
          const price = parsePrice(p?.price);
          return sum + price * (item.quantity || 1);
        }, 0);

        if (mounted) {
          setProductMap(map);
          setCartTotal(total);
        }
      } catch (e) {
        if (mounted) setCartTotal(0);
      }
    };

    loadCartData();

    return () => {
      mounted = false;
    };
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    if (isMobile) {
      navigate("/cart");
    } else {
      setIsCartOpen(!isCartOpen);
      setIsAccountOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-white shadow-sm",
        )}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* TOP BAR */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <Logo />

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Search */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} className="text-gray-600" />
                </motion.button>

                {/* Account */}
                <div className="relative hidden sm:block">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => {
                          setIsAccountOpen((prev) => !prev);
                          setIsCartOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 h-10 rounded-xl hover:bg-gray-100 transition-colors"
                        aria-label="Account"
                        title={currentUser?.fullName || "My Account"}
                      >
                        <User size={20} className="text-gray-600" />
                        <ChevronDown
                          size={14}
                          className={cn(
                            "text-gray-500 transition-transform duration-200",
                            isAccountOpen && "rotate-180",
                          )}
                        />
                      </button>

                      <AccountDropdown
                        isOpen={isAccountOpen}
                        onClose={() => setIsAccountOpen(false)}
                        isAuthenticated={isAuthenticated}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                      />
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="flex w-10 h-10 items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                      aria-label="Login"
                      title="Login"
                    >
                      <User size={20} className="text-gray-600" />
                    </Link>
                  )}
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-gray-200" />

                {/* Cart */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCartClick}
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative">
                      <ShoppingCart size={20} className="text-gray-600" />
                      {cartCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-[#b99c79] text-white text-[10px] font-bold"
                        >
                          {cartCount > 99 ? "99+" : cartCount}
                        </motion.span>
                      )}
                    </div>

                    <span className="hidden lg:block text-sm font-semibold text-gray-900">
                      £{cartTotal.toFixed(2)}
                    </span>
                  </motion.button>

                  {!isMobile && (
                    <CartPreview
                      isOpen={isCartOpen}
                      cart={cart}
                      productMap={productMap}
                      total={cartTotal}
                      onClose={() => setIsCartOpen(false)}
                    />
                  )}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                  aria-label="Menu"
                >
                  <Menu size={22} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:block bg-black" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-center">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasMegaMenu && setActiveMenu(item.name)
                  }
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "relative px-6 py-4 text-sm font-medium tracking-wide transition-colors flex items-center gap-1",
                        isActive || activeMenu === item.name
                          ? "text-[#b99c79]"
                          : "text-white hover:text-[#b99c79]",
                      )
                    }
                  >
                    {item.name}
                    {activeMenu === item.name && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b99c79]"
                      />
                    )}
                  </NavLink>

                  {index < navItems.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        <MegaMenu data={megaMenuData[activeMenu]} isOpen={!!activeMenu} />
      </header>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
      />
    </>
  );
};

export default Navbar;
