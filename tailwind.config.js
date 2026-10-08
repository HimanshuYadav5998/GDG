/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          bg: "#FFFFFF",
          surface: "#F7F7F5",
          card: "#FFFFFF",
          border: "#E8E8E5",
          primary: "#171717",
          secondary: "#666666",
          muted: "#999999",
          accent: "#FF5A36",
          accentHover: "#E04826",
          accentSoft: "#FFF0EB",
        }
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.06)',
        'dropdown': '0 12px 32px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
