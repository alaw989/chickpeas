<template>
  <div class="w-full mx-auto">
    <NuxtRouteAnnouncer />
    <NavBar />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/features/navigation/NavBar.vue'
import Footer from '~/components/features/footer/Footer.vue'
</script>
