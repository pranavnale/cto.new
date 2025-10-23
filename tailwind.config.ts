import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans]
      },
      backgroundImage: {
        "pulse-radial": "radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 55%)",
        "pulse-conic": "conic-gradient(from 180deg at 50% 50%, #818cf8 0deg, #22d3ee 120deg, #f472b6 240deg, #818cf8 360deg)"
      },
      boxShadow: {
        glow: "0 20px 45px -20px rgba(79,70,229,0.45)",
        subtle: "0 12px 30px -12px rgba(15, 23, 42, 0.25)"
      },
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81"
        }
      }
    }
  },
  plugins: [animatePlugin]
};

export default config;
