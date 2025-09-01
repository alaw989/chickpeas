<template>
  <section class="relative bg-yellow-50 py-[100px]">
    <div class="container location-wrapper mx-auto px-4 md:px-0 grid md:grid-cols-2 gap-8 items-start">
      <!-- Map panel -->
      <div class="relative w-full">
        <!-- Backing card, offset up into the yellow band -->
        <div class="absolute inset-x-0  h-full bg-white rounded-xl "></div>
        <!-- Actual map -->
        <div
            ref="mapRef"
            class="relative w-full h-120 rounded-[1rem] overflow-hidden shadow-lg z-10"
        ></div>
      </div>

      <!-- Info card -->
      <div class="mx-auto z-10 pt-0 w-full">
        <h2 class="text-2xl font-bold mb-4 text-left">Come See Us!</h2>
        <ul class="space-y-4">
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="animate-bounce w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9zm0 2a7 7 0 0 0-7 7c0 2.322 1.272 4.36 2.871 5.996a18 18 0 0 0 2.222 1.91l.458.326q.222.155.427.288l.39.25l.343.209l.289.169l.455-.269l.367-.23q.293-.186.627-.417l.458-.326a18 18 0 0 0 2.222-1.91C17.728 15.361 19 13.322 19 11a7 7 0 0 0-7-7zm0 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4z"/>
            </svg>
            <a
                class="text-lg text-gray-800 hover:underline"
                href="https://www.google.com/maps/search/?api=1&query=850+Blackburn+Dr,+Mobile,+AL+36608"
                target="_blank"
            >
              850 Blackburn Dr, Mobile, AL 36608
            </a>
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="direction-arrow w-6 h-6 text-green-600 mr-3 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <a
                class="text-lg text-gray-800 hover:underline"
                href="https://www.google.com/maps/dir/?api=1&destination=850+Blackburn+Dr,+Mobile,+AL+36608"
                target="_blank"
            >
              Get Directions
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'

const mapRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!mapRef.value || typeof window === 'undefined') return

  const { default: L } = await import('leaflet')

  const map = L.map(mapRef.value, {
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    zoomControl: false,
  }).setView([30.6723471, -88.2623823], 16)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OSM',
  }).addTo(map)

  L.marker([30.6723471, -88.2623823])
      .addTo(map)
      .bindPopup("Hello from Chickpea's!")

  // Let Leaflet recalculate its size now that it's visible
  setTimeout(() => map.invalidateSize(), 0)
})
</script>

<style scoped>
h2 {
  /* if you need any custom overrides */
}

.direction-arrow {
  animation: bounce-horizontal 1s infinite ease-in-out;
}

@keyframes bounce-horizontal {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
}
</style>
