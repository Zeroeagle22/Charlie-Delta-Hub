import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 8px 30px rgba(0,0,0,0.4)",
        lift: "0 14px 40px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
