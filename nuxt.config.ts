// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true, // SSR is default, but be explicit
  compatibilityDate: '2024-05-07', // unlock Netlify Functions v2 features in Nitro
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },
  // Nitro will auto-detect Netlify, no preset required for serverless
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      meta: [
        {
          name: 'color-scheme',
          content: 'only light'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  build: {
    transpile: ['@googlemaps/js-api-loader']
  },
  devtools: { enabled: true },
  //----------------------for modules----------------------
  modules: [
    '~/modules/api',
    '~/modules/custom-form',
    // '~/modules/lib-form',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    '@nuxtjs/i18n',
    'vue-sonner/nuxt'
  ],
  //  image: {
  //   dir: '~/assets',  // Point to where your images are
  // },
  vueSonner: { css: true },
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.ts', name: 'English' },
      { code: 'ar', iso: 'ar-AR', file: 'ar.ts', name: 'العربية', dir: 'rtl' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    restructureDir: 'app',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/tailwind.config.js'
  },
  svgo: {
    autoImportPath: './assets/icons/', // Path to your SVG folder
    componentPrefix: 'Svgo', // Matches our component name
    dts: true // Enable TypeScript support
  },
  //----------------------for auto imports----------------------
  imports: {
    autoImport: true,
    dirs: [
      'services' // Auto-import .js/.ts files from the 'services' directory
    ]
    // dirs: [
    //   // only auto-import from these directories
    //   "composables",
    //   "utils",
    //   "stores",
    // ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false, // Important for section imports
      extensions: ['.vue']
    }
  ],
  // ignore: ["pages/**/_*"],
  pages: {
    pattern: ['**/*.vue', '!**/_*']
  },

  //----------------------others----------------------
  experimental: {
    componentIslands: true
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-')
    }
  },

  // Add this typescript configuration
  typescript: {
    shim: false,
    typeCheck: false, // Disable if you don't need runtime type checking
    tsConfig: {
      compilerOptions: {
        // types: ['nuxt', 'vite/client']
        include: ['types/**/*.d.ts'],
        // you can also tuck vueCompilerOptions here if you prefer:
        vueCompilerOptions: { strictTemplates: true }
      }
    }
  }
})
