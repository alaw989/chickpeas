<template>
  <div class="w-full mx-auto">
    <NuxtRouteAnnouncer />
    <!-- Skip navigation link for keyboard users -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-green-800 focus:shadow-lg focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
    >
      Skip to main content
    </a>
    <NavBar />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/features/navigation/NavBar.vue'
import Footer from '~/components/features/footer/Footer.vue'
</script>
