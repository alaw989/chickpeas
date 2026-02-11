// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

runtimeConfig: {
    // Server-only config
    wpMenuEndpoint: process.env.WP_MENU_ENDPOINT || 'https://wp.chickpeas-mobile.com/wp-json/wp/v2/menu_item?per_page=100&order=asc',
    wpSpecialsEndpoint: process.env.WP_SPECIALS_ENDPOINT || 'https://wp.chickpeas-mobile.com/wp-json/wp/v2/specials?per_page=10&_embed',
    public: {
      siteUrl: 'https://chickpeas-mobile.com',
      business: {
        name: 'Chickpeas Mediterranean Kitchen',
        phone: '(251) 301-0770',
        email: 'info@chickpeas-mobile.com',
        streetAddress: '850 Blackburn Dr',
        addressLocality: 'Mobile',
        addressRegion: 'AL',
        postalCode: '36608',
        addressCountry: 'US',
        cuisine: 'Mediterranean, Lebanese',
        priceRange: '$$',
        imageUrl: '/img/banner.webp',
        logoUrl: '/img/chickpea-icon.webp',
        socialUrls: {
          facebook: 'https://www.facebook.com/chickpeasmediterranean',
        },
      },
      // Restaurant hours: Tue-Thu 6AM-6PM, Fri-Sat 6AM-8PM, Sun 6AM-4PM, Mon Closed
      openingHours: [
        'Tu 06:00-18:00',
        'We 06:00-18:00',
        'Th 06:00-18:00',
        'Fr 06:00-20:00',
        'Sa 06:00-20:00',
        'Su 06:00-16:00'
      ],
      formSpreeEndpoint: 'https://formspree.io/f/xrblrpla',
    },
  },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/tailwind.css',
    '~/assets/css/fonts.css',
  ],

  app: {
    head: {
      titleTemplate: '%s | Chickpeas Mediterranean Kitchen',
      meta: [
        { name: 'theme-color', content: '#3f6e4d' },
        { name: 'description', content: 'Fresh Mediterranean and Lebanese dishes in Mobile, AL. Breakfast, lunch, dinner, takeout, and delivery.' }
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/img/chickpea-icon.webp' },
        // Preload LCP image for faster discovery
        { rel: 'preload', as: 'image', href: '/img/banner.webp', fetchpriority: 'high', type: 'image/webp' },
        // Preload critical fonts
        { rel: 'preload', as: 'font', href: '/fonts/CabinetGrotesk-Black.woff2', type: 'font/woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', href: '/fonts/PTSans-Regular.ttf', type: 'font/ttf', crossorigin: '' },
        // DNS prefetch and preconnect for external resources
        { rel: 'dns-prefetch', href: 'https://plausible.io' },
        { rel: 'preconnect', href: 'https://plausible.io', crossorigin: '' },
      ],
      script: [
        {
          tagPosition: 'bodyClose',
          src: 'https://plausible.io/js/script.js',
          'data-domain': 'chickpeas-mobile.com',
          defer: true
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  // @nuxt/image configuration
  image: {
    quality: 70, // Reduced for smaller file sizes
    format: ['webp', 'avif'], // Add AVIF for better compression
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    }
  },

  // Nitro server configuration for performance
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      // Static pages - aggressive caching
      '/': { prerender: true },
      '/menu': { isr: 300 },  // Revalidates every 5 minutes
      '/contact': { prerender: true },
      // Static assets - long cache (1 year immutable)
      '/img/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@vueuse/motion/nuxt',
  ],

  // Build optimizations to reduce unused JavaScript
  vite: {
    build: {
      // Improve CSS handling
      cssCodeSplit: true,
      // Optimize chunk size
      chunkSizeWarningLimit: 500,
      // Manual chunks to separate vendor code
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate leaflet into its own chunk (lazy loaded)
            'leaflet': ['leaflet'],
            // Separate Vue core
            'vue-vendor': ['vue', 'vue-router', '@vue/runtime-core'],
          }
        }
      }
    },
    // Optimize dependencies - include leaflet for consistent dev/prod behavior
    optimizeDeps: {
      include: ['vue', 'vue-router', 'leaflet']
    }
  },

  // Enable lazy loading of components
  components: {
    global: true,
    lazy: true
  },

  // Lazy load modules where possible
  _experimental: {
    asyncNuxtComponents: true
  },

  // Enable experimental features for better performance
  experimental: {
    payloadExtraction: true, // Reduce client bundle size
    renderJsonPayloads: true, // Faster initial render
  }
})
