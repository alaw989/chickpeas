<template>
  <section class="location-section">
    <div class="location-wrap">
      <div class="location-header text-center mx-auto">
        <p class="eyebrow">Visit Us</p>
        <h2 class="heading-lg">Visit Us For The Ultimate Mediterranean Dining Experience</h2>
        <p class="lead">850 Blackburn Dr, Mobile, AL 36608</p>
      </div>

      <div class="location-grid">
        <div class="location-card info-card">
          <div class="hours-section">
            <div class="hours-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3f6e4d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span class="info-label">Hours</span>
            </div>
            <ul class="hours-list">
              <li>
                <span class="day">Monday</span>
                <span class="time closed">Closed</span>
              </li>
              <li>
                <span class="day">Tue – Thu</span>
                <span class="time">6AM – 6PM</span>
              </li>
              <li>
                <span class="day">Fri – Sat</span>
                <span class="time">6AM – 8PM</span>
              </li>
              <li>
                <span class="day">Sunday</span>
                <span class="time">6AM – 4PM</span>
              </li>
            </ul>
          </div>

          <div class="cta-row">
            <a
              class="button-dark"
              href="https://order.online/store/chickpeas-mediterranean-grill-mobile-30404428/?hideModal=true&pickup=true&rwg_token=ACgRB3dN8qHKgMH9oThcl2AJv1VTojTeVKP_OTvx8kLhU7WNqsV0DrYSCzHWsDB1f1zTjFr66KbFvSuY_MIxjz2h4v6MoJ1pEw==&utm_source=gfo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Online
            </a>
            <a
              class="button-light"
              href="https://www.google.com/maps/dir/?api=1&destination=850+Blackburn+Dr,+Mobile,+AL+36608"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div class="location-card map-card">
          <div class="map-shell">
            <div
              ref="mapRef"
              class="map-canvas"
              aria-label="Map showing Chickpea's Restaurant location"
            ></div>
            <div class="map-badge">
              <span>Open today</span>
              <span class="badge-hours">6AM-6PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import 'leaflet/dist/leaflet.css'

const mapRef = ref<HTMLElement | null>(null)
const mapInitialized = ref(false)
let observer: IntersectionObserver | null = null

async function initMap() {
  if (!mapRef.value || typeof window === 'undefined' || mapInitialized.value) return

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

  const chickpeaMarker = L.divIcon({
    className: 'chickpea-marker',
    html: `
      <div class="chickpea-marker__wrap">
        <div class="chickpea-marker__label">Fresh flavors live here!</div>
        <img class="chickpea-marker__icon" src="/img/chickpea-icon.webp" alt="" />
      </div>
    `,
    iconSize: [140, 90],
    iconAnchor: [70, 84],
    popupAnchor: [0, -90]
  })

  L.marker([30.6723471, -88.2623823], { icon: chickpeaMarker })
    .addTo(map)
    .bindPopup("Hello from Chickpea's!")

  setTimeout(() => map.invalidateSize(), 0)
  mapInitialized.value = true
}

onMounted(() => {
  if (!mapRef.value || typeof window === 'undefined') return

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !mapInitialized.value) {
        initMap()
        observer?.disconnect()
      }
    },
    { rootMargin: '100px' }
  )

  observer.observe(mapRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.location-section {
  position: relative;
  padding: 3rem 1rem;
  background: linear-gradient(180deg, #fff6e9 0%, #fffdfa 70%);
  overflow: hidden;
}

@media (min-width: 640px) {
  .location-section {
    padding: 4rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .location-section {
    padding: 5rem 2rem;
  }
}

.location-section::before {
  content: "";
  position: absolute;
  width: 520px;
  height: 520px;
  right: -220px;
  top: -160px;
  border-radius: 50%;
  background: rgba(63, 110, 77, 0.08);
}

.location-wrap {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.location-header {
  max-width: 760px;
}

/* Using .eyebrow from main.css */

.lead {
  margin-top: 8px;
  font-size: 1rem;
  color: #2d2926;
}

.location-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;
}

.location-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 16px 40px rgba(33, 32, 28, 0.08);
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hours-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hours-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-label {
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: #3f6e4d;
}

.hours-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hours-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #f9faf8;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.hours-list li:hover {
  background: #f0f5ee;
}

.hours-list .day {
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #2d2926;
}

.hours-list .time {
  font-family: 'PT Sans', sans-serif;
  font-size: 0.95rem;
  color: #3f6e4d;
  font-weight: 600;
}

.hours-list .time.closed {
  color: #991b1b;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

.map-card {
  padding: 14px;
  display: flex;
}

.map-shell {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  min-height: 300px;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 1px rgba(63, 110, 77, 0.08);
}

.map-canvas {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.map-badge {
  position: absolute;
  left: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  background: rgba(63, 110, 77, 0.92);
  color: #e6fbcc;
  border-radius: 14px;
  font-size: 0.85rem;
}

.badge-hours {
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1rem;
}

@media (max-width: 1024px) {
  .location-grid {
    grid-template-columns: 1fr;
  }

  .map-shell,
  .map-canvas {
    min-height: 260px;
  }
}

@media (max-width: 640px) {
  .location-card {
    padding: 1rem;
  }

  .cta-row {
    flex-direction: column;
  }

  .cta-row a {
    width: 100%;
    text-align: center;
  }
}

:deep(.chickpea-marker) {
  background: transparent;
  border: none;
}

:deep(.chickpea-marker__wrap) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transform: translateY(-6px);
}

:deep(.chickpea-marker__label) {
  background: #3f6e4d;
  color: #e6fbcc;
  border-radius: 999px;
  padding: 6px 12px;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  white-space: nowrap;
  box-shadow: 0 10px 25px rgba(33, 32, 28, 0.2);
  animation: tooltip-float 2.2s ease-in-out infinite;
}

:deep(.chickpea-marker__icon) {
  width: 48px;
  height: 48px;
}

@keyframes tooltip-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
</style>
