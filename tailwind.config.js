module.exports = {
  // prefix: 'tw-', // Add a 'tw-' prefix to all TailwindCSS classes
  corePlugins: {
    preflight: false // Disable Tailwind's base reset
  },
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    fontFamily: {
      sans: ['Zarid', 'Zarid-Fallback', 'system-ui', ' sans-serif'] // Override default sans
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
      }
    }
  },
  plugins: []
}
