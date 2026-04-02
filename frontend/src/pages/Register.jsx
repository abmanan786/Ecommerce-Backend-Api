import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  Crown,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.webp";

const inputBase =
  "w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl border bg-white/80 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300";
const inputFocus =
  "border-gray-200 focus:border-[#b99c79] focus:bg-white focus:shadow-[0_0_0_4px_rgba(185,156,121,0.12)]";

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (isAuthenticated) return <Navigate to="/account" replace />;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = register({
        fullName,
        email,
        password,
      });

      if (!result.success) {
        toast.error(result.message);
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      navigate("/account");
      setLoading(false);
    }, 800);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,156,121,0.20),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(to_bottom_right,#050505,#111111,#050505)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm sm:text-base"
        >
          <ChevronLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative z-10 px-4 pb-10 sm:pb-14">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8 items-stretch">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 xl:p-12 text-white"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#b99c79]/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 blur-[100px] rounded-full" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6">
                  <Sparkles size={14} className="text-[#b99c79]" />
                  <span className="text-sm text-white/80">
                    Create Premium Account
                  </span>
                </div>

                <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                  Join the world of
                  <span className="block bg-gradient-to-r from-[#d4b896] to-[#b99c79] bg-clip-text text-transparent">
                    Luxury Watches
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-white/60 text-base leading-7">
                  Create your account to enjoy a premium shopping experience,
                  faster checkout, saved details, exclusive offers and personal
                  account access.
                </p>
              </div>

              <div className="space-y-4 mt-10">
                {[
                  "Save your favourite products instantly",
                  "Track your order history and profile",
                  "Unlock exclusive member offers",
                  "Secure personal account experience",
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <CheckCircle2 className="text-[#b99c79]" size={18} />
                    <span className="text-white/80 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/10 bg-white shadow-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#b99c79] to-transparent" />
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f7f3ee] px-3 py-1.5 mb-4">
                    <Crown size={14} className="text-[#b99c79]" />
                    <span className="text-[#8b7355] text-xs font-semibold uppercase tracking-[0.2em]">
                      New Member
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Create Account
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Start your premium shopping journey with us.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                          focusedField === "fullName"
                            ? "text-[#b99c79]"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("fullName")}
                        onBlur={() => setFocusedField("")}
                        placeholder="Enter your full name"
                        className={`${inputBase} ${inputFocus}`}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                          focusedField === "email"
                            ? "text-[#b99c79]"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        placeholder="Enter your email"
                        className={`${inputBase} ${inputFocus}`}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                          focusedField === "password"
                            ? "text-[#b99c79]"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField("")}
                        placeholder="Create password"
                        className={`${inputBase} ${inputFocus} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                          focusedField === "confirmPassword"
                            ? "text-[#b99c79]"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField("")}
                        placeholder="Confirm password"
                        className={`${inputBase} ${inputFocus} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-300"
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-[#b99c79] hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-[#b99c79] hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 sm:py-4 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#b99c79] transition-colors disabled:opacity-70"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                    {!loading && <ArrowRight size={18} />}
                  </motion.button>
                </form>

                <div className="mt-8">
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-xs uppercase tracking-[0.2em] text-gray-400">
                        Already joined?
                      </span>
                    </div>
                  </div>

                  <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-[#b99c79] font-semibold hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Register;
