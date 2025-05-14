/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['"Helvetica Neue"', '"Helvetica Neue Condensed"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#E30613',    // e.g., blue-700
        // secondary: '#9333EA',  // e.g., purple-600
        // danger: '#DC2626',     // e.g., red-600
        // Add more as needed
      }
    },
  },
  plugins: [],
}
