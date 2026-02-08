/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      colors: {
        zurcan: {
          red: '#D9381E',    
          dark: '#000000',   
          glass: 'rgba(255, 255, 255, 0.05)', 
          border: 'rgba(255, 255, 255, 0.1)',
        },
        boutique: {
          navy: '#050505',    // Casi negro, muy profundo
          gold: '#D4AF37',    // Oro metálico clásico
          cream: '#E5E5E5',   
          champagne: '#F7E7CE', // Oro champán suave
          accent: '#111111',  
        },
        luxury: {
          black: '#000000',
          charcoal: '#0a0a0a',
          gold: '#C5A059'
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    }
  },
  plugins: [],
}