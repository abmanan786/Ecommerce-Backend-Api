// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/pages/Account.jsx
// 📌 PURPOSE: Premium User Account Page
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  LogOut,
  Save,
  Package,
  Heart,
  CreditCard,
  Sparkles,
  Camera,
  Crown,
  CheckCircle2,
  MapPinned,
  Settings,
  CalendarDays,
  BadgeCheck,
  Edit3,
  Star,
  Truck,
  Wallet,
  Bell,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "address", label: "Address", icon: MapPinned },
  { id: "preferences", label: "Preferences", icon: Settings },
];

const INFO_CARDS = [
  {
    id: 1,
    title: "Orders",
    value: "0",
    icon: Package,
    desc: "Placed Orders",
  },
  {
    id: 2,
    title: "Wishlist",
    value: "0",
    icon: Heart,
    desc: "Saved Items",
  },
  {
    id: 3,
    title: "Reviews",
    value: "0",
    icon: Star,
    desc: "Your Ratings",
  },
  {
    id: 4,
    title: "Rewards",
    value: "120",
    icon: Crown,
    desc: "Member Points",
  },
];

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#b99c79] focus:bg-white focus:shadow-[0_0_0_4px_rgba(185,156,121,0.10)]";

const ProfileInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClass} ${Icon ? "pl-12" : ""}`}
      />
    </div>
  </div>
);

const SectionCard = ({ children, className = "" }) => (
  <div
    className={`rounded-[28px] border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] ${className}`}
  >
    {children}
  </div>
);

const Account = () => {
  const { currentUser, isAuthenticated, logout, updateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        city: currentUser.city || "",
        postalCode: currentUser.postalCode || "",
        country: currentUser.country || "",
      });
    }
  }, [currentUser]);

  const memberSince = useMemo(() => {
    if (!currentUser?.createdAt) return "Recently joined";
    const date = new Date(currentUser.createdAt);
    return date.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  }, [currentUser]);

  const initials = useMemo(() => {
    const name = currentUser?.fullName || "User";
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [currentUser]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error("Full name and email are required.");
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const result = updateProfile(formData);

      if (!result.success) {
        toast.error(result.message);
        setSaving(false);
        return;
      }

      toast.success("Profile updated successfully!");
      setSaving(false);
    }, 700);
  };

  return (
    <section className="min-h-screen bg-[#f8f8f8] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,156,121,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.04),transparent_25%),linear-gradient(to_bottom,#f8f8f8,#ffffff)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-linear-to-br from-black via-[#111111] to-[#050505] py-14 sm:py-16 md:py-20">
        <div className="absolute top-0 left-10 w-72 h-72 bg-[#b99c79]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-white/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="text-[#b99c79]" />
            <span className="text-sm text-white/80">Premium Member Area</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Welcome back,
                <span className="block mt-2 bg-linear-to-r from-[#d4b896] to-[#b99c79] bg-clip-text text-transparent">
                  {currentUser?.fullName || "User"}
                </span>
              </h1>

              <p className="text-white/60 mt-4 max-w-2xl text-sm sm:text-base">
                Manage your account, shipping details, preferences and personal
                profile from one premium dashboard.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white/80">
                  <BadgeCheck size={16} className="text-[#b99c79]" />
                  Verified Member
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white/80">
                  <CalendarDays size={16} className="text-[#b99c79]" />
                  Member since {memberSince}
                </div>
              </div>
            </div>

            {/* Profile glass card */}
            <div className="hidden md:flex items-center gap-4 rounded-3xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#b99c79] to-[#8b7355] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {initials}
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
                  <Camera size={14} />
                </button>
              </div>

              <div>
                <p className="text-white font-semibold text-lg">
                  {currentUser?.fullName}
                </p>
                <p className="text-white/60 text-sm">{currentUser?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14">
        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6 sm:mb-8">
          {INFO_CARDS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <SectionCard className="p-5 sm:p-6 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{item.title}</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                        {item.value}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        {item.desc}
                      </p>
                    </div>
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#f7f3ee] flex items-center justify-center">
                      <Icon className="text-[#b99c79]" size={22} />
                    </div>
                  </div>
                </SectionCard>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile card */}
            <SectionCard className="overflow-hidden">
              <div className="h-24 bg-linear-to-r from-black via-[#181818] to-black" />
              <div className="px-6 pb-6 -mt-10">
                <div className="relative w-fit mx-auto">
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#b99c79] to-[#8b7355] flex items-center justify-center text-white font-bold text-xl border-4 border-white shadow-lg">
                    {initials}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#b99c79] text-white flex items-center justify-center shadow-md hover:bg-[#a08968] transition-colors">
                    <Camera size={14} />
                  </button>
                </div>

                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentUser?.fullName}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 break-all">
                    {currentUser?.email}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                    <ShieldCheck size={17} className="text-[#b99c79]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Verified Account
                      </p>
                      <p className="text-xs text-gray-500">
                        Your profile is active
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                    <Truck size={17} className="text-[#b99c79]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Shipping Ready
                      </p>
                      <p className="text-xs text-gray-500">
                        Save address for quick checkout
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                    <Wallet size={17} className="text-[#b99c79]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Premium Savings
                      </p>
                      <p className="text-xs text-gray-500">
                        Get exclusive member offers
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-6 py-3.5 rounded-2xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </SectionCard>

            {/* Quick actions */}
            <SectionCard className="p-5 sm:p-6">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400 mb-4">
                Quick Actions
              </h4>

              <div className="space-y-3">
                {[
                  { icon: Package, label: "Order History" },
                  { icon: Heart, label: "Wishlist" },
                  { icon: Bell, label: "Notifications" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3.5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-[#b99c79]" />
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </SectionCard>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Tabs */}
            <SectionCard className="p-3 sm:p-4">
              <div className="grid grid-cols-3 gap-2">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                        active
                          ? "bg-black text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={16} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {/* Form card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.22 }}
              >
                <SectionCard className="p-6 sm:p-8">
                  <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#f7f3ee] px-3 py-1.5 mb-3">
                        <Edit3 size={14} className="text-[#b99c79]" />
                        <span className="text-[#8b7355] text-xs font-semibold uppercase tracking-[0.2em]">
                          {activeTab === "profile"
                            ? "Personal Info"
                            : activeTab === "address"
                            ? "Address Details"
                            : "Preferences"}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {activeTab === "profile"
                          ? "Profile Information"
                          : activeTab === "address"
                          ? "Address & Location"
                          : "Account Preferences"}
                      </h2>

                      <p className="text-gray-500 text-sm mt-2">
                        {activeTab === "profile" &&
                          "Update your personal account details and contact information."}
                        {activeTab === "address" &&
                          "Keep your address information updated for faster checkout."}
                        {activeTab === "preferences" &&
                          "Manage your preferences and account experience settings."}
                      </p>
                    </div>
                  </div>

                  {activeTab !== "preferences" ? (
                    <form onSubmit={handleSave} className="space-y-6">
                      {activeTab === "profile" && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <ProfileInput
                              label="Full Name"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              icon={User}
                            />
                            <ProfileInput
                              label="Email Address"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Enter your email address"
                              icon={Mail}
                              type="email"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <ProfileInput
                              label="Phone Number"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Enter your phone number"
                              icon={Phone}
                            />
                            <ProfileInput
                              label="Country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              placeholder="Enter your country"
                              icon={CreditCard}
                            />
                          </div>
                        </>
                      )}

                      {activeTab === "address" && (
                        <>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Address
                            </label>
                            <div className="relative">
                              <MapPin
                                size={18}
                                className="absolute left-4 top-4 text-gray-400"
                              />
                              <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Enter your full address"
                                className={`${inputClass} resize-none pl-12`}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <ProfileInput
                              label="City"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="Enter your city"
                            />
                            <ProfileInput
                              label="Postal Code"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleChange}
                              placeholder="Enter postal code"
                            />
                          </div>

                          <ProfileInput
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Enter country"
                            icon={CreditCard}
                          />
                        </>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3.5 text-white font-semibold hover:bg-[#b99c79] transition-colors disabled:opacity-70"
                      >
                        <Save size={18} />
                        {saving ? "Saving..." : "Save Changes"}
                      </motion.button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      {[
                        {
                          title: "Email Notifications",
                          desc: "Get updates on new offers, orders and account activity.",
                        },
                        {
                          title: "Promotional Updates",
                          desc: "Receive premium promotions and member discounts.",
                        },
                        {
                          title: "Wishlist Alerts",
                          desc: "Be notified when saved items come back or go on sale.",
                        },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 sm:px-5 py-4"
                        >
                          <div>
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">
                              {item.title}
                            </p>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1">
                              {item.desc}
                            </p>
                          </div>

                          <button className="relative w-14 h-8 rounded-full bg-black">
                            <span className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white shadow" />
                          </button>
                        </div>
                      ))}

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toast.success("Preferences saved successfully!")}
                        className="inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3.5 text-white font-semibold hover:bg-[#b99c79] transition-colors"
                      >
                        <Save size={18} />
                        Save Preferences
                      </motion.button>
                    </div>
                  )}
                </SectionCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;