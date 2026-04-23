import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        snow: "#F6F9FC",
        ink: {
          DEFAULT: "#0A1F44",
          soft: "#334166",
          muted: "#6B7894",
        },
        robert: {
          DEFAULT: "#1E6BFF",
          dark: "#1651C8",
          soft: "#DCE8FF",
          ghost: "#EEF4FF",
        },
        edit: "#E03131",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(30,107,255,0.08)",
        cardHover: "0 18px 50px rgba(30,107,255,0.18)",
        ring: "0 0 0 6px rgba(30,107,255,0.18)",
      },
      borderRadius: {
        xl2: "20px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        inkSweep: {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.4)" },
        },
        caret: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        waPing: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "80%, 100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      animation: {
        inkSweep: "inkSweep 1.2s cubic-bezier(0.22,1,0.36,1) forwards",
        pulseDot: "pulseDot 2.8s ease-in-out infinite",
        caret: "caret 1s steps(1) infinite",
        shimmer: "shimmer 1.6s linear infinite",
        float: "float 6s ease-in-out infinite",
        waPing: "waPing 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
