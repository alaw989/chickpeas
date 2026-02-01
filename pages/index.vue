<template>
  <Home :menuData="menuData || []" :isLoading="pending" :loadError="errorMessage" />
</template>

<script setup lang="ts">
import Home from '~/components/sections/HomePage.vue'

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const business = config.public.business

const { data: siteData } = await useSiteData()
const { data: menuData, pending, error } = await useMenuData()

const businessName = computed(() => siteData.value?.restaurant?.name || business.name)
const description = computed(() =>
  `Fresh Mediterranean and Lebanese dishes in ${business.addressLocality}, ${business.addressRegion}. Breakfast, lunch, dinner, takeout, and delivery.`
)

const errorMessage = computed(() => (error.value ? 'Unable to load menu right now. Please try again shortly.' : null))

const toAbsolute = (url: string) => {
  if (!url) return undefined
  return url.startsWith('http') ? url : `${siteUrl}${url}`
}

const normalizePhone = (phone: string) => {
  if (!phone) return undefined
  const digits = phone.replace(/\D/g, '')
  if (!digits) return undefined
  return phone.startsWith('+') ? phone : `+1${digits}`
}

const restaurantSchema = computed(() => {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: businessName.value,
    url: siteUrl,
    telephone: normalizePhone(business.phone),
    servesCuisine: business.cuisine,
    priceRange: business.priceRange,
    menu: `${siteUrl}/menu`,
    image: toAbsolute(business.imageUrl),
    logo: toAbsolute(business.logoUrl),
    openingHours: config.public.openingHours,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      postalCode: business.postalCode,
      addressCountry: business.addressCountry
    }
  }

  if (!schema.telephone) delete schema.telephone
  if (!schema.servesCuisine) delete schema.servesCuisine
  if (!schema.priceRange) delete schema.priceRange
  if (!schema.image) delete schema.image
  if (!schema.logo) delete schema.logo
  if (!schema.openingHours?.length) delete schema.openingHours
  if (!schema.address?.streetAddress) delete schema.address

  return schema
})

useSeoMeta({
  title: 'Mediterranean Grill in Mobile, AL',
  description: description.value,
  ogTitle: businessName.value,
  ogDescription: description.value,
  ogType: 'website',
  ogUrl: siteUrl,
  ogImage: business.imageUrl ? toAbsolute(business.imageUrl) : undefined,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/webp',
  twitterCard: 'summary_large_image',
  twitterTitle: businessName.value,
  twitterDescription: description.value,
  twitterImage: business.imageUrl ? toAbsolute(business.imageUrl) : undefined
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/` },
    { rel: 'preload', as: 'image', href: business.imageUrl || '/img/banner.webp' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(restaurantSchema.value)
    }
  ]
})
</script>
