<template>
  <section class="py-10">
    <Menu :headingLevel="'h1'" :menuData="menuData || []" :isLoading="pending" :loadError="errorMessage" />
  </section>
</template>

<script setup lang="ts">
import Menu from '~/components/features/menu/Menu.vue'

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const business = config.public.business

const { data: menuData, pending, error } = await useMenuData()

const description = computed(() =>
  `Explore the full menu at ${business.name} with Mediterranean classics, fresh salads, and hearty entrees in ${business.addressLocality}, ${business.addressRegion}.`
)

const errorMessage = computed(() => (error.value ? 'Unable to load menu right now. Please try again shortly.' : null))

const toAbsolute = (url: string) => {
  if (!url) return undefined
  return url.startsWith('http') ? url : `${siteUrl}${url}`
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Menu',
      item: `${siteUrl}/menu`
    }
  ]
}

const menuSchema = computed(() => {
  if (!menuData.value?.length) return null

  const menuItems = menuData.value.map((item: any) => {
    const menuItem: Record<string, any> = {
      '@type': 'MenuItem',
      name: item.menu_item_title || item.title?.rendered || ''
    }

    const desc = (item.description || item.content?.rendered || '').replace(/<[^>]*>/g, '').trim()
    if (desc) menuItem.description = desc

    if (item.price) {
      menuItem.offers = {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: 'USD'
      }
    } else if (item.price_small || item.price_large) {
      menuItem.offers = {
        '@type': 'AggregateOffer',
        lowPrice: item.price_small || item.price_large,
        highPrice: item.price_large || item.price_small,
        priceCurrency: 'USD'
      }
    }

    if (item.image?.guid) {
      menuItem.image = toAbsolute(item.image.guid)
    }

    return menuItem
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${business.name} Menu`,
    description: description.value,
    hasMenuSection: menuItems
  }
})

useSeoMeta({
  title: `Menu`,
  description: description.value,
  ogTitle: `Menu | ${business.name}`,
  ogDescription: description.value,
  ogType: 'website',
  ogUrl: `${siteUrl}/menu`,
  ogImage: business.imageUrl ? toAbsolute(business.imageUrl) : '/img/banner.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: `Menu | ${business.name}`,
  twitterDescription: description.value,
  twitterImage: business.imageUrl ? toAbsolute(business.imageUrl) : '/img/banner.webp'
})

const headScripts = computed(() => {
  const scripts = [
    {
      type: 'application/ld+json',
      children: JSON.stringify(breadcrumbSchema)
    }
  ]

  if (menuSchema.value) {
    scripts.push({
      type: 'application/ld+json',
      children: JSON.stringify(menuSchema.value)
    })
  }

  return scripts
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/menu` }
  ],
  script: headScripts
})
</script>
