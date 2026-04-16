/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Cinema dark theme
        background: "#0e0e0e",
        surface: {
          DEFAULT: "#0e0e0e",
          container: "#191919",
          "container-low": "#131313",
          "container-high": "#1f1f1f",
          "container-highest": "#262626",
          bright: "#2c2c2c",
        },
        // Primary purple
        primary: "yellow",
        "primary-dim": "#ce7eec",
        "primary-container": "#d180ef",
        // Secondary pink
        secondary: "#fda0fc",
        "secondary-dim": "#ee93ed",
        // Tertiary coral
        tertiary: "#ff928a",
        // Accent (backward compat)
        accent: "#e08efe",
        // Error
        error: "#ff6e84",
        // Outline
        outline: "#757575",
        "outline-variant": "#484848",
        // On-colors (text on top of)
        "on-surface": "#ffffff",
        "on-surface-variant": "#ababab",
        "on-primary": "#4f006c",
        // Legacy aliases (for other screens)
        dark: {
          100: "#221F3D",
          200: "#0F0D23",
        },
        light: {
          100: "#D6C7FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
      },
      fontFamily: {
        headline: ["Manrope"],
        body: ["Inter"],
      },
    },
  },
  plugins: [],
};
