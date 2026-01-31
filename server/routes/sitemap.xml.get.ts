export default defineEventHandler((event) => {
  const siteUrl = 'https://chickpeas-mobile.com'
  const lastmod = new Date().toISOString().split('T')[0]

  const pages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/menu', changefreq: 'weekly', priority: '0.9' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.6' }
  ]

  const urlEntries = pages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400')

  return sitemap
})
