export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ball: {
          400: '#FF3864', // Hot pink/electric red
          500: '#FF1744', // Neon red
          600: '#D50032', // Deep red
        },
        rim: {
          500: '#FF0054', // Electric magenta
          600: '#D6004C', // Deep magenta
        },
        nba: {
          blue: '#0066FF', // Electric blue
          red: '#FF0054', // Hot red
        },
        dark: {
          900: '#0A0A0F', // Deep purple-black
          800: '#13131D', // Dark purple-gray
          700: '#1E1E2E', // Purple-gray
          600: '#2D2D44', // Medium purple-gray
          500: '#45455F', // Light purple-gray
        },
        accent: {
          green: '#00FF88', // Neon green/mint
          yellow: '#FFD600', // Electric yellow
          cyan: '#00E5FF', // Cyan/aqua neon
          purple: '#C74CFF', // Electric purple
          pink: '#FF49C0', // Hot pink
        },
      },
      backgroundImage: {
        'gradient-fire':
          'linear-gradient(135deg, #FF3864 0%, #FF0054 50%, #D6004C 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #0066FF 0%, #00E5FF 100%)',
        'gradient-gold':
          'linear-gradient(135deg, #FFD600 0%, #FFA800 50%, #FF6B00 100%)',
        'gradient-purple': 'linear-gradient(135deg, #C74CFF 0%, #FF49C0 100%)',
        'gradient-green': 'linear-gradient(135deg, #00FF88 0%, #00D970 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        shake: 'shake 0.4s ease',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-8px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(8px)' },
        },
      },
    },
  },
  plugins: [],
};
