// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  build: {
    transpile: ['@googlemaps/js-api-loader']
  },
  devtools: { enabled: true },
  //----------------------for modules----------------------
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', 'nuxt-svgo', '@nuxtjs/i18n'],
  //  image: {
  //   dir: '~/assets',  // Point to where your images are
  // },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js', name: 'English' },
      { code: 'ar', iso: 'ar-AR', file: 'ar.js', name: 'العربية', dir: 'rtl' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    restructureDir: 'app',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
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
    autoImport: true
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

  //----------------------others----------------------
  experimental: {
    componentIslands: true
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-')
    }
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL
    }
  },
  // Add this typescript configuration
  typescript: {
    shim: false,
    typeCheck: false, // Disable if you don't need runtime type checking
    tsConfig: {
      compilerOptions: {
        types: ['@nuxt/types', '@nuxtjs/tailwindcss']
      }
    }
  }
})
