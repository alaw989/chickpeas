<template>
  <div class="w-full mx-auto">
    <NuxtRouteAnnouncer />
    <NavBar :jsonData="siteData" />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/features/navigation/NavBar.vue'
import Footer from '~/components/features/footer/Footer.vue'

const { data: siteData } = await useSiteData()
</script>
