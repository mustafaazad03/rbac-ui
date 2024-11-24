import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#091E42",
        "light-blue": "#6B788E",
        "fade-blue": "#C2C7D0",
        "primary-red": "#9A1E1E",
        "secondary-red": "#6A1039",
        "dot-orange": "#93312B",
        "fade-orange": "#FFF2EA",
        "fade-primary-red": "#F9F5FF",
        "fade-primary-red-2": "#F7E8EF",
        "success-50": "#ECFDF3",
        "success-500": "#12B76A",
        "success-700": "#027A48",
        "gray-bg": "#FAFBFB",
        "gray-border": "#EAECF0"
      },
    },
  },
  plugins: [],
} satisfies Config;
