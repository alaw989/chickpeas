// tailwind.config.cjs
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // A “sans” override, so all “font-sans” uses Cabinet Grotesk first
        sans: ['"Cabinet Grotesk"', 'ui-sans-serif', 'system-ui'],
        // Or a dedicated key
        grotesk: ['"Cabinet Grotesk"', 'ui-sans-serif', 'system-ui'],
        ptsans: ['"PT Sans"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
