/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-1000px);",
            transform: "translateX(-1000px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
      },
    },
    animation: {
      "slide-right":
        "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    require("daisyui")
  ],
  daisyui: {
    themes: false,
    darkTheme: "light",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
