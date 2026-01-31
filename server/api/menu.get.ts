import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const endpoint = config.wpMenuEndpoint as string

  setHeader(event, 'Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600')

  // If WordPress endpoint is configured, fetch from it
  if (endpoint) {
    const data = await $fetch(endpoint)
    return data
  }

  // Fallback to static data.json
  try {
    const dataPath = resolve(process.cwd(), 'public/data.json')
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf-8'))

    // Transform static menu data to match expected format
    const menuItems: any[] = []
    const menu = jsonData.menu || {}

    // Map category keys to display labels (matching WordPress format)
    const categoryLabels: Record<string, string> = {
      breakfast: 'Breakfast',
      appetizers: 'Appetizers',
      salads: 'Salads',
      sandwiches: 'Sandwiches',
      entrees: 'Entrees',
      sides: 'Sides',
      kids_menu: 'Kids Menu',
      drinks: 'Drinks'
    }

    for (const [category, label] of Object.entries(categoryLabels)) {
      if (menu[category]) {
        for (const item of menu[category]) {
          menuItems.push({
            menu_item_title: item.name,
            description: item.description || '',
            price: item.price,
            price_small: item.price_small,
            price_large: item.price_large,
            menu_item_type: [label],
            image: item.image ? { guid: `/img/${item.image}` } : null
          })
        }
      }
    }

    return menuItems
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load menu data'
    })
  }
})
