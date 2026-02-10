<template>
  <div ref="mapRef" class="leaflet-map-container" aria-label="Map showing Chickpea's Restaurant location"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const mapRef = ref(null)
let mapInstance = null

onMounted(async () => {
  if (!mapRef.value || !import.meta.client) return

  try {
    // Dynamically import Leaflet CSS to avoid render-blocking
    await import('leaflet/dist/leaflet.css')
    const leafletModule = await import('leaflet')
    // Handle both dev (namespace) and prod (default export) modes
    const L = leafletModule.default || leafletModule

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

    // Custom SVG pin marker with chickpea logo
    const chickpeaPinIcon = L.divIcon({
      className: 'chickpea-pin-marker',
      html: `
        <div class="pin-wrapper">
          <svg class="pin-svg" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="pin-clip">
                <circle cx="20" cy="20" r="14"/>
              </clipPath>
            </defs>
            <path class="pin-shadow" d="M20 52C20 52 4 34 4 20C4 11.16 11.16 4 20 4C28.84 4 36 11.16 36 20C36 34 20 52 20 52Z" fill="#000" fill-opacity="0.15" transform="translate(1, 1)"/>
            <path class="pin-body" d="M20 48C20 48 4 32 4 20C4 11.16 11.16 4 20 4C28.84 4 36 11.16 36 20C36 32 20 48 20 48Z" fill="#3f6e4d"/>
            <circle class="pin-inner" cx="20" cy="20" r="14" fill="#e6fbcc"/>
            <image href="/img/chickpea-icon.webp" x="6" y="6" width="28" height="28" clip-path="url(#pin-clip)" preserveAspectRatio="xMidYMid slice"/>
          </svg>
        </div>
      `,
      iconSize: [40, 52],
      iconAnchor: [20, 52],
      popupAnchor: [0, -50]
    })

    L.marker([30.6723471, -88.2623823], { icon: chickpeaPinIcon })
      .addTo(mapInstance)
      .bindPopup("Chickpea's Mediterranean Kitchen")

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

/* Custom Pin Marker Styles */
:deep(.chickpea-pin-marker) {
  background: transparent;
  border: none;
}

:deep(.pin-wrapper) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.pin-svg) {
  width: 40px;
  height: 52px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: pin-bounce 0.5s ease-out;
}

:deep(.pin-body) {
  stroke: #2d4a37;
  stroke-width: 1;
}

:deep(.pin-inner) {
  stroke: #3f6e4d;
  stroke-width: 1;
}

@keyframes pin-bounce {
  0% {
    transform: translateY(-20px) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateY(5px) scale(1.05);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
