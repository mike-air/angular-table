/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'primary': '#3381EB', // Blue color for primary buttons and accents
        'secondary': '#0061E6', // Another shade of blue for secondary elements
        'background': '#F3F4F6', // Light gray background color
        'textColor': '#374151', // Dark gray for text
        'inputBorder': '#D1D5DB', // Light gray for input borders
        'success': '#DCFCE7', // Green for success status
        'warning': '#F59E0B', // Yellow for warning status
        'error': '#EF4444', // Red for errors
      },
      borderRadius: {
        'lg': '32px',
        'md':'12px'// Custom border radius for inputs and buttons
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow for modals and cards
      },
    },
  },
  plugins: [],
}
