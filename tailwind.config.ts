/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   '#0ebb00', // emerald-500 — the green heart 💚
          secondary: '#ffffff', // violet-500  — the purple heart 💜
        },
        surface: {
          DEFAULT: '#f5ece1',   // page background
          raised:  '#0a3024',   // cards, sidebars (gray-50)
          border:  '#e5e7eb',   // dividers (gray-200)
        },
        muted: {
          DEFAULT: '#6b7280',   // secondary text (gray-500)
          light:   '#9ca3af',   // placeholder text (gray-400)
        },
        success: '#22c55e',     // green-500
        danger:  '#ef4444',     // red-500
      },
    },
  },
  plugins: [],
}

