import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      xs: "390px", // iPhone 15 / modern small
      sm: "640px",
      md: "768px", // iPad portrait / standard tablet
      lg: "1024px", // iPad landscape / laptop
      xl: "1280px", // Standard desktop
      "2xl": "1536px", // Large desktop / 4K starts scaling protection
    },
    extend: {
      maxWidth: {
        container: "1280px",
        ultra: "1440px"
      },
      colors: {
        backgroundPrimary: "#F4F5F6",
        backgroundDark: "#0C1117",
        accentTeal: "#0E4D4D",
        textDark: "#111111",
        textMuted: "#6B7280",
        cardBackground: "#FFFFFF"
      },
      borderRadius: {
        card: "22px",
        button: "12px"
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
      }
    }
  },
  plugins: []
};

export default config;