import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.webp";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
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
          to="/login"
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm sm:text-base"
        >
          <ChevronLeft size={18} />
          <span>Back to Login</span>
        </Link>
      </div>

      <div className="relative z-10 px-4 pb-10 sm:pb-14">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8 items-stretch">
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
                    Password Recovery
                  </span>
                </div>

                <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                  Reset your
                  <span className="block bg-gradient-to-r from-[#d4b896] to-[#b99c79] bg-clip-text text-transparent">
                    Account Password
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-white/60 text-base leading-7">
                  Enter your registered email address and we’ll help you recover
                  access to your account securely.
                </p>
              </div>

              <div className="space-y-4 mt-10">
                {[
                  "Safe and secure recovery process",
                  "Instant email reset instructions",
                  "Helps keep your account protected",
                ].map((point) => (
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

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/10 bg-white shadow-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#b99c79] to-transparent" />

            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="mb-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#f7f3ee] px-3 py-1.5 mb-4">
                          <KeyRound size={14} className="text-[#b99c79]" />
                          <span className="text-[#8b7355] text-xs font-semibold uppercase tracking-[0.2em]">
                            Forgot Password
                          </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                          Reset Password
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm sm:text-base">
                          Enter your email and we’ll send reset instructions.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail
                              size={18}
                              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                                focused ? "text-[#b99c79]" : "text-gray-400"
                              }`}
                            />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setFocused(true)}
                              onBlur={() => setFocused(false)}
                              placeholder="Enter your email"
                              className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl border border-gray-200 bg-white/80 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#b99c79] focus:bg-white focus:shadow-[0_0_0_4px_rgba(185,156,121,0.12)]"
                            />
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full py-3.5 sm:py-4 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#b99c79] transition-colors"
                        >
                          Send Reset Link
                          <ArrowRight size={18} />
                        </motion.button>
                      </form>

                      <p className="text-center text-sm text-gray-500 mt-6">
                        Remember your password?{" "}
                        <Link
                          to="/login"
                          className="text-[#b99c79] font-semibold hover:underline"
                        >
                          Back to Login
                        </Link>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="text-center py-8"
                    >
                      <div className="w-18 h-18 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-5">
                        <CheckCircle2 className="text-green-600" size={34} />
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Check Your Email
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base mb-6">
                        We sent password reset instructions to:
                      </p>

                      <p className="font-semibold text-[#b99c79] mb-8 break-all">
                        {email}
                      </p>

                      <div className="space-y-3">
                        <Link
                          to="/login"
                          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-black text-white font-semibold hover:bg-[#b99c79] transition-colors"
                        >
                          Back to Login
                        </Link>

                        <button
                          onClick={() => setSubmitted(false)}
                          className="w-full py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Try Another Email
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
