export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ball: {
          400: '#FF6B35',
          500: '#E86A33',
          600: '#C94D1C',
        },
        rim: {
          500: '#DC2626',
          600: '#B91C1C',
        },
        nba: {
          blue: '#1D428A',
          red: '#C8102E',
        },
        dark: {
          900: '#09090B',
          800: '#18181B',
          700: '#27272A',
          600: '#3F3F46',
          500: '#52525B',
        },
        accent: {
          green: '#10B981',
          yellow: '#FBBF24',
          cyan: '#06B6D4',
        },
      },
      backgroundImage: {
        'gradient-fire':
          'linear-gradient(135deg, #FF6B35 0%, #DC2626 50%, #991B1B 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #1D428A 0%, #0EA5E9 100%)',
        'gradient-gold':
          'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'gradient-green': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
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
