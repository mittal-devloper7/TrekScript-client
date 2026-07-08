/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#05B603",
        secondary: "#Ef863E",
      },
      backgroundImage: {
        "login-bg-img": "url('./src/assets/images/login.jpeg')",
        "signup-bg-img": "url('./src/assets/images/Signup.jpeg')",
      },
    },
  },
  plugins: [],
};
