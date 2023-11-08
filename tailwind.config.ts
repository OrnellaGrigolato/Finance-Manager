import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "640px",
      sm: "1100px",
      lg: "1100px",
    },
    gridTemplateRows: {
      "3": "repeat(3, minmax(0, 1fr))",
    },
    // gridTemplateColumns: {
    //   "2": "repeat(2, minmax(0, 1fr))",
    // },
    extend: {
      colors: {
        primary: "#8A22F0",
        bg: "#fff",
        "card-bg": "#ececec",
      },
      backgroundImage: {
        "login-bg": "url('/login-bg.jpg')",
      },
      boxShadow: {
        blackShadow: "0 12px 54px -32px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
