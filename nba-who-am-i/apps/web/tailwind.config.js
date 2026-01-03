import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ball: {
          400: '#FF3864',
          500: '#FF1744',
          600: '#D50032',
        },
        rim: {
          500: '#FF0054',
          600: '#D6004C',
        },
        nba: {
          blue: '#0066FF',
          red: '#FF0054',
        },
        dark: {
          500: '#45455F',
          600: '#2D2D44',
          700: '#1E1E2E',
          800: '#13131D',
          900: '#0A0A0F',
        },
        accent: {
          green: '#00FF88',
          yellow: '#FFD600',
          cyan: '#00E5FF',
          purple: '#C74CFF',
          pink: '#FF49C0',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
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
          '0%, 50%': {
            opacity: '1',
          },
          '51%, 100%': {
            opacity: '0',
          },
        },
        shake: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-8px)',
          },
          '20%, 40%, 60%, 80%': {
            transform: 'translateX(8px)',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
