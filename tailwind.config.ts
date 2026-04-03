import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#09090f",
        surface: "#111118",
        "surface-2": "#1a1a26",
        cream: "#f0ebe0",
        "cream-muted": "#a09a8e",
        flame: "#ff6b35",
        cyan: "#4cc9f0",
        violet: "#7b5ea7",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        grain: "grain 8s steps(10) infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 2%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-3%, 1%)" },
          "60%": { transform: "translate(1%, 3%)" },
          "70%": { transform: "translate(3%, -1%)" },
          "80%": { transform: "translate(-2%, 2%)" },
          "90%": { transform: "translate(2%, -3%)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
