/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)', // Blush
        accent: 'var(--color-accent)', // Soft Peach
        text: 'var(--color-text)', // Warm Charcoal
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        glow: 'var(--color-glow)',
        
        // New Rich Pastels for Phase 12
        pastel: {
          peach: '#FFD6C9',
          blush: '#F7A8B8',
          coral: '#F28FA3',
          lavender: '#C9B6F2',
          yellow: '#FFE49A',
          mint: '#BFE8D4',
        }
      },
      fontFamily: {
        display: ['"Lora"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(243, 168, 177, 0.15)',
        'float': '0 10px 30px -5px rgba(243, 168, 177, 0.2)',
      }
    },
  },
  plugins: [],
}
