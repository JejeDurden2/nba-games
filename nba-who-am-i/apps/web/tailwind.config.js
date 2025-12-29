export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        court: { 200: '#C4A484', 400: '#8B5A2B' },
        ball: { 400: '#FF6B35', 500: '#E86A33' },
        rim: { 500: '#DC2626' },
        nba: { blue: '#1D428A', red: '#C8102E' },
      },
    },
  },
  plugins: [],
};
