import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  Star,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.webp";

const inputBase =
  "w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl border bg-white/80 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300";
const inputFocus =
  "border-gray-200 focus:border-[#b99c79] focus:bg-white focus:shadow-[0_0_0_4px_rgba(185,156,121,0.12)]";
const sidePoints = [
  "Secure sign in with protected session",
  "Track orders and manage profile easily",
  "Save shipping details for faster checkout",
];

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (isAuthenticated) return <Navigate to="/account" replace />;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = login({ email, password });

      if (!result.success) {
        toast.error(result.message);
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
      navigate("/account");
      setLoading(false);
    }, 700);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Background */}
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

      {/* Main */}
      <div className="relative z-10 px-4 pb-10 sm:pb-14">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 items-stretch">
          {/* Left premium side */}
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
                    Premium Member Access
                  </span>
                </div>

                <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                  Sign in to your
                  <span className="block bg-gradient-to-r from-[#d4b896] to-[#b99c79] bg-clip-text text-transparent">
                    Luxury Account
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-white/60 text-base leading-7">
                  Continue your premium shopping experience, manage orders, save
                  favourites and checkout faster with your personal account.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="w-10 h-10 rounded-full border-2 border-[#111] bg-white/10 flex items-center justify-center text-xs font-bold text-white"
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">
                      Trusted by premium buyers
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-[#b99c79] text-[#b99c79]"
                        />
                      ))}
                      <span className="text-xs text-white/60 ml-2">
                        4.9/5 satisfaction
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-10">
                {sidePoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <ShieldCheck className="text-[#b99c79]" size={18} />
                    <span className="text-white/80 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form side */}
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
                    <CheckCircle2 size={14} className="text-[#b99c79]" />
                    <span className="text-[#8b7355] text-xs font-semibold uppercase tracking-[0.2em]">
                      Account Access
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Welcome Back
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Enter your details to access your premium account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-[#b99c79] hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>

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
                        placeholder="Enter your password"
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

                  {/* Remember me */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-600">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                      Remember me
                    </label>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 sm:py-4 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#b99c79] transition-colors disabled:opacity-70"
                  >
                    {loading ? "Signing In..." : "Sign In"}
                    {!loading && <ArrowRight size={18} />}
                  </motion.button>
                </form>

                {/* Bottom */}
                <div className="mt-8">
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-xs uppercase tracking-[0.2em] text-gray-400">
                        New here?
                      </span>
                    </div>
                  </div>

                  <p className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/register"
                      className="text-[#b99c79] font-semibold hover:underline"
                    >
                      Create one
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

export default Login;
