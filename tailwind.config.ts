import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        raku: {
          50: "#fff1f2",
          100: "#ffe0e3",
          500: "#e11d48",
          600: "#be123c",
          700: "#9f1239",
        },
      },
      boxShadow: { card: "0 1px 2px rgba(16,24,40,.06), 0 4px 12px rgba(16,24,40,.06)" },
    },
  },
  plugins: [],
};
export default config;
