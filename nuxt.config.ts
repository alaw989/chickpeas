// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    // Server-only config
    wpMenuEndpoint: process.env.WP_MENU_ENDPOINT || 'https://wp.chickpeas-mobile.com/wp-json/wp/v2/menu_item?per_page=100&order=asc',
    public: {
      siteUrl: 'https://chickpeas-mobile.com',
      business: {
        name: 'Chickpeas Mediterranean Kitchen',
        phone: '(251) 301-0770',
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
    'leaflet/dist/leaflet.css',
  ],

  app: {
    head: {
      titleTemplate: '%s | Chickpeas Mediterranean Kitchen',
      meta: [
        { name: 'theme-color', content: '#3f6e4d' }
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/img/chickpea-icon.webp' },
        // DNS prefetch for external resources
        { rel: 'dns-prefetch', href: 'https://basemaps.cartocdn.com' },
        { rel: 'preconnect', href: 'https://basemaps.cartocdn.com', crossorigin: '' },
        // Font preloading handled by @nuxt/fonts module
      ],
      script: [
        {
          defer: true,
          src: 'https://plausible.io/js/script.js',
          'data-domain': 'chickpeas-mobile.com'
        }
      ]
    }
  },

  // @nuxt/image configuration
  image: {
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Nitro server configuration for performance
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      // Static pages - aggressive caching
      '/': { prerender: true },
      '/menu': { prerender: true },
      '/contact': { prerender: true },
      // Static assets - long cache
      '/img/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
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
  ]
})
