<template>
  <section>
    <Contact />
  </section>
</template>

<script setup lang="ts">
const Contact = defineAsyncComponent(() => import('~/components/sections/ContactForm.vue'))

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const business = config.public.business

const description = `Contact ${business.name} in ${business.addressLocality}, ${business.addressRegion} for reservations, catering, or menu questions.`

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
      name: 'Contact',
      item: `${siteUrl}/contact`
    }
  ]
}

useSeoMeta({
  title: 'Contact',
  description,
  ogTitle: `Contact | ${business.name}`,
  ogDescription: description,
  ogType: 'website',
  ogUrl: `${siteUrl}/contact`,
  ogImage: business.imageUrl ? toAbsolute(business.imageUrl) : '/img/banner.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: `Contact | ${business.name}`,
  twitterDescription: description,
  twitterImage: business.imageUrl ? toAbsolute(business.imageUrl) : '/img/banner.webp'
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/contact` }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(breadcrumbSchema)
    }
  ]
})
</script>
