interface WordPressSpecial {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  acf?: { price?: string }
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
  }
}

export interface Special {
  id: number
  name: string
  description: string
  price: string | null
  image: string | null
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .trim()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const endpoint = config.wpSpecialsEndpoint as string

  setHeader(event, 'Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600')

  // If WordPress endpoint is not configured, return empty array (for local dev)
  if (!endpoint) {
    return [] as Special[]
  }

  try {
    const data = await $fetch<WordPressSpecial[]>(endpoint)

    // Handle empty or invalid response
    if (!data || !Array.isArray(data)) {
      return [] as Special[]
    }

    // Transform WordPress response to clean Special[] format
    const specials: Special[] = data.map((item) => ({
      id: item.id,
      name: stripHtml(item.title?.rendered || ''),
      description: stripHtml(item.excerpt?.rendered || ''),
      price: item.acf?.price || null,
      image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
    }))

    return specials
  } catch (error) {
    // Log error but return empty array to avoid breaking the page
    console.error('Failed to fetch specials:', error)
    return [] as Special[]
  }
})
