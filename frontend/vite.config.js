// SAHI VERSION
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Tailwind CSS plugin ko configuration object ke saath pass karein
    tailwindcss({
      // Yahan aap apna poora Tailwind config object daal sakte hain
      config: {
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
        theme: {
          extend: {
            colors: {
              "brand-gold": "#b99c79", // Aapka custom gold color
            },
            animation: {
              shimmer: "shimmer 2s infinite",
            },
            keyframes: {
              shimmer: {
                "0%": { transform: "translateX(-100%)" },
                "100%": { transform: "translateX(100%)" },
              },
            },
          },
        },
        plugins: [],
      },
    }),
  ],
});
