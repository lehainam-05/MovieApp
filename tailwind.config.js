/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#9D50BB",
        secondary: "#AB57AC",
        tertiary: "#C4534D",
        light: {
          100: "#F5E9FA",
          200: "#D8B4E8",
          300: "#A3A3A3",
        },
        dark: {
          100: "#2A2A2E",
          200: "#111216",
        },
        accent: "#D175F3",
      },
    },
  },
  plugins: [],
};
