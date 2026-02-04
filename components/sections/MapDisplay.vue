<template>
  <div ref="mapRef" class="leaflet-map-container" aria-label="Map showing Chickpea's Restaurant location"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const mapRef = ref(null)
let mapInstance = null

onMounted(async () => {
  if (!mapRef.value || !process.client) return

  try {
    // Dynamically import Leaflet CSS to avoid render-blocking
    await import('leaflet/dist/leaflet.css')
    const L = (await import('leaflet')).default

    mapInstance = L.map(mapRef.value, {
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
    }).addTo(mapInstance)

    const chickpeaMarker = L.divIcon({
      className: 'chickpea-marker',
      html: `
        <div class="chickpea-marker__wrap">
          <div class="chickpea-marker__label">Fresh flavors live here!</div>
          <img class="chickpea-marker__icon" src="/img/chickpea-icon.webp" alt="" width="48" height="48" />
        </div>
      `,
      iconSize: [140, 90],
      iconAnchor: [70, 84],
      popupAnchor: [0, -90]
    })

    L.marker([30.6723471, -88.2623823], { icon: chickpeaMarker })
      .addTo(mapInstance)
      .bindPopup("Hello from Chickpea's!")

    setTimeout(() => {
      if (mapInstance) mapInstance.invalidateSize()
    }, 200)
  } catch (e) {
    console.error('Failed to load map:', e)
  }
})

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})
</script>

<style>
.leaflet-map-container {
  width: 100%;
  height: 300px;
}
</style>
