import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,vue,css}'],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1200px',
        '2xl': '1200px'
      },
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '1rem',
        xl: '1rem'
      }
    }
  },
  plugins: []
} satisfies Config
