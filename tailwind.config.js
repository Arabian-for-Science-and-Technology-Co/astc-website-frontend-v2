const path = require('path')

module.exports = {
  // prefix: 'tw-', // Add a 'tw-' prefix to all TailwindCSS classes
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',

    // 👇 include local Nuxt modules
    path.join(__dirname, 'modules/**/*.{vue,js,ts}'),

    // if you actually put it under app/modules/, include this too:
    path.join(__dirname, 'app/modules/**/*.{vue,js,ts}')
  ],
  darkMode: 'class', //  disables automatic media-based dark mode
  theme: {
    fontFamily: {
      zarid: ['29LT Zarid Sans AL', 'Zarid-Fallback', 'system-ui', ' sans-serif'],
      sans: ['29LT Zarid Sans AL', 'Zarid-Fallback', 'system-ui', ' sans-serif'],
      durke: ['Druk Wide'],
      roboto: ['Roboto']
    },
    extend: {
      colors: {
        'theme-light': {
          background: 'rgb(var(--background) / <alpha-value>)',
          foreground: 'rgb(var(--foreground) / <alpha-value>)',
          primary: {
            DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
            foreground: 'rgb(var(--primary-foreground) / <alpha-value>)'
          }
        },
        'theme-dark': {
          primary: '#60a5fa',
          background: '#0f172a'
        }
      },
      spacing: {
        '4xs': 'var(--space-4xs)',
        '3xs': 'var(--space-3xs)'
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)'
      },
      screens: {
        'xs':'375px',
        '3xl': '1600px' // or any value > 1536px
      }
    }
  },
  plugins: []
}
