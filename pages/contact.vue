<template>
  <section class="contact section-padding bg-yellow-50">
    <div class="section-wrap">
      <h1 class="heading-lg text-center mb-6">Contact Us</h1>
      <p class="text-center mb-8">For any inquiries, please complete the form below or reach us directly.</p>

      <div class="contact-grid">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const ContactForm = defineAsyncComponent(() => import('~/components/sections/ContactForm.vue'))
const ContactInfo = defineAsyncComponent(() => import('~/components/sections/ContactInfo.vue'))

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

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
