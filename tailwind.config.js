/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0f172a",
          secondary: "#1e293b",
          accent: "#334155",
        },
        accent: {
          emerald: "#10b981",
        }
      },
    },
  },
  plugins: [],
}
