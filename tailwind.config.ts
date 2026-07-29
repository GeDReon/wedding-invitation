import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFCFA",
          100: "#FAF7F2",
          200: "#F5F0E8",
          300: "#EDE4D6",
        },
        beige: {
          100: "#F0EBE3",
          200: "#E5DDD0",
          300: "#D4C9B8",
          400: "#C4B5A0",
        },
        gold: {
          100: "#F5EDD8",
          200: "#E8D5A8",
          300: "#D4B978",
          400: "#C4A35A",
          500: "#B8956A",
        },
        wedding: {
          white: "#FFFFFF",
          cream: "#FAF7F2",
          beige: "#E5DDD0",
          gold: "#C4A35A",
          goldLight: "#E8D5A8",
          text: "#3D3832",
          muted: "#8A8279",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 30px rgba(61, 56, 50, 0.08)",
        glass: "0 8px 32px rgba(61, 56, 50, 0.06)",
        elevated: "0 20px 60px rgba(61, 56, 50, 0.12)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
