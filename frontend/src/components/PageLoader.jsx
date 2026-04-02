import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="text-center w-full max-w-sm">
        {/* Premium card */}
        <div className="border rounded-2xl p-10 bg-white shadow-sm">
          {/* Logo / Brand */}
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
            Swiss Eagle
          </p>

          {/* Watch spinner */}
          <div className="mx-auto mt-6 relative h-16 w-16">
            {/* outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-200" />

            {/* animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#b99c79] border-r-[#b99c79] animate-spin" />

            {/* watch center */}
            <div className="absolute inset-3 rounded-full bg-white border border-gray-200 shadow-sm" />

            {/* watch hands */}
            <div className="absolute left-1/2 top-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-full bg-[#b99c79] rounded-full origin-bottom animate-[spin_1.2s_linear_infinite]" />
            <div className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-full bg-gray-900/80 rounded-full origin-bottom animate-[spin_3s_linear_infinite]" />
          </div>

          {/* Text */}
          <p className="mt-6 text-lg font-extrabold text-gray-900">
            Loading your experience
          </p>
          <p className="mt-1 text-sm text-gray-500">Just a moment…</p>

          {/* Premium shimmer bar */}
          <div className="mt-7 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              className="h-full w-1/3 bg-linear-to-r from-transparent via-[#b99c79]/50 to-transparent"
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;