extend: {
  fontFamily: {
    serif: ['"Playfair Display"', 'serif'],
    sans: ['Inter', 'sans-serif'],
  },
  animation: {
    'fade-in': 'fadeIn 0.7s ease-in-out',
    'zoom-in': 'zoomIn 0.7s ease-in-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    zoomIn: {
      '0%': { transform: 'scale(0.95)' },
      '100%': { transform: 'scale(1)' },
    },
  },
},