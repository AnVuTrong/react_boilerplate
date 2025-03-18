/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005f69',
          light: '#007780',
          dark: '#004850',
        },
        secondary: {
          DEFAULT: '#e5e7eb',
          light: '#f3f4f6',
          dark: '#d1d5db',
        },
        background: {
          primary: '#f9fafb',
          secondary: '#ffffff',
        },
        text: {
          primary: '#111827',
          secondary: '#4b5563',
          light: '#9ca3af',
        },
        accent: {
          success: '#10b981',
          error: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
        },
        highlight: {
          red: '#ef4444',
          green: '#10b981',
          blue: '#3b82f6',
          yellow: '#f59e0b',
          orange: '#F36F32',
        }
      }
    },
  },
  plugins: [],
}