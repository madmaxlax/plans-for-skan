import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF5",
          100: "#FAF6EE",
          200: "#F5EFE0",
          300: "#F0E8D4",
          400: "#E8DEC8",
          500: "#D6C9A8",
        },
        ink: "#1E3A5F",
        coral: {
          DEFAULT: "#E07A2C",
          deep: "#9C5A2C",
        },
        lake: "#1E73A8",
        forest: "#2D5A3D",
        muted: {
          tan: "#8B6F3D",
          "tan-light": "#B8956A",
          slate: "#4A5C70",
          "slate-deep": "#3A4A5C",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
