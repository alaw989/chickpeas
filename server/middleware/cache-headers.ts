// Nitro middleware to add cache headers for static assets
// This ensures fonts, images, and JS/CSS have proper cache headers

export default defineEventHandler((event) => {
  const url = event.node.req.url || ''

  // Add aggressive caching for fonts (1 year immutable)
  if (url.startsWith('/fonts/')) {
    setHeader(event, 'cache-control', 'public, max-age=31536000, immutable')
    setHeader(event, 'vary', 'Accept-Encoding')
  }

  // Add aggressive caching for images (1 year immutable)
  if (url.startsWith('/img/') || url.startsWith('/images/')) {
    setHeader(event, 'cache-control', 'public, max-age=31536000, immutable')
  }

  // Add aggressive caching for Nuxt build assets (1 year immutable)
  if (url.startsWith('/_nuxt/')) {
    setHeader(event, 'cache-control', 'public, max-age=31536000, immutable')
  }
})
