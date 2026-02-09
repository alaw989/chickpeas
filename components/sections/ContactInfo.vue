<template>
  <div class="contact-info">
    <h2 class="info-title">Contact Information</h2>
    <!-- Address -->
    <div class="info-item">
      <div class="info-icon">📍</div>
      <div class="info-content">
        <h3 class="info-label">Address</h3>
        <a
            :href="mapsSearchUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="info-link"
        >
          {{ formattedAddress }}
        </a>
      </div>
    </div>

    <!-- Phone -->
    <div class="info-item">
      <div class="info-icon">📞</div>
      <div class="info-content">
        <h3 class="info-label">Phone</h3>
        <a :href="`tel:${business.phone}`" class="info-link">
          {{ business.phone }}
        </a>
      </div>
    </div>

    <!-- Hours -->
    <div class="info-item">
      <div class="info-icon">🕐</div>
      <div class="info-content">
        <h3 class="info-label">Hours</h3>
        <ul class="hours-list">
          <li>Monday: Closed</li>
          <li>Tue – Thu: 6AM – 6PM</li>
          <li>Fri – Sat: 6AM – 8PM</li>
          <li>Sunday: 6AM – 4PM</li>
        </ul>
      </div>
    </div>

    <!-- Map -->
    <div class="contact-map">
      <MapDisplay />
    </div>
  </div>
</template>

<script setup lang="ts">
const MapDisplay = defineAsyncComponent(() => import('~/components/sections/MapDisplay.vue'))

const config = useRuntimeConfig()
const business = config.public.business

// Computed properties for dynamic links
const formattedAddress = computed(() => {
  return `${business.streetAddress}, ${business.addressLocality}, ${business.addressRegion} ${business.postalCode}`
})

const mapsSearchUrl = computed(() => {
  const query = encodeURIComponent(formattedAddress.value)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
})
</script>

<style scoped>
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.info-title {
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #3f6e4d;
  margin-bottom: 0.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-icon {
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
  width: 2rem;
  text-align: center;
}

.info-content {
  flex: 1;
}

.info-label {
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #3f6e4d;
  margin-bottom: 0.25rem;
}

.info-link {
  font-family: 'PT Sans', sans-serif;
  font-size: 1.125rem;
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s ease;
}

.info-link:hover {
  color: #3f6e4d;
  text-decoration: underline;
}

.hours-list {
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  color: #1a1a1a;
  list-style: none;
  padding: 0;
  margin: 0;
}

.hours-list li {
  padding: 0.25rem 0;
}

.contact-map {
  width: 100%;
  height: 300px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .contact-map {
    height: 100%;
    min-height: 300px;
  }
}
</style>
