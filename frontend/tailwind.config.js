/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "Noto Sans KR", "sans-serif"],
      },
      colors: {
        danggn: {
          orange: "#FF8A3D",
          darkgray: "#868B94",
          lightgray: "#EAEBEE",
        },
      },
      keyframes: {
        "appear-right-to-left": {
          from: {
            opacity: 0,
            transform: "translateX(100%)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        "appear-left-to-right": {
          from: {
            opacity: 0,
            transform: "translateX(-100%)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        "appear-bottom-to-top": {
          from: {
            opacity: 0,
            transform: "translateY(100%)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "appear-right-to-left":
          ".75s appear-right-to-left ease-in-out forwards",
        "appear-left-to-right":
          ".75s appear-left-to-right ease-in-out forwards",
        "appear-bottom-to-top":
          ".75s appear-bottom-to-top ease-in-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
