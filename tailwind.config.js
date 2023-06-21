/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      opacity: {
        89: "0.89",
        3: "0.03",
      },
      borderRadius: {
        xs: "5px",
        md: "15px",
      },
      colors: {
        background: "#F3F3F3",
        textHeader: "#202537",
        darkHeader: "#DADCE0",
        green: { play: "#6AAA64" },
        keyBackgroundDark: "#565F7E",
        keyBackgroundLight: "#D3D6DA",
        darkHelpBg: "#262B3C",
        key: "56575E",
      },
      lineHeight: {
        6: "20px",
        6.5: "22px",
        7: "24px",
        8: "28px",
        9: "32px",
        10: "36px",
        11: "41px",
        12: "42px",
        13: "43px",
        14: "44px",
        15: "45px",
        16: "46px",
        17: "47px",
        18: "48px",
        19: "49px",
        20: "50px",
      },
    },
    fontSize: {
      18: "18px",
      19: "19px",
      24: "24px",
      35: "35px",
      28: "28px",
      40: "40px",
      41: "41px",
    },
    borderWidth: {
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
  plugins: [],
};