/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        rye: ["Rubik Iso", "cursive"],
      },
      minHeight: {
        reviewBoxHeight: "80px",
      },
      minWidth: {
        reviewBoxWidth: "400px",
        reviewBoxWidthMd: "896px",
      },
      maxWidth: {
        textAreaReview: "75%",
      },
    },
  },
  plugins: [],
};
