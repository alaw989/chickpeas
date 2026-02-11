<template>
  <section
    v-if="specials.length > 0"
    class="specials-section w-full bg-white py-16 md:py-20"
  >
    <div class="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
      <!-- Section Header -->
      <div
        class="text-center mb-10 md:mb-12"
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        <p class="font-grotesk font-bold text-primary-500 text-sm uppercase tracking-wider mb-2">
          Fresh & Limited
        </p>
        <h2 class="heading-lg">Today's Specials</h2>
      </div>

      <!-- Specials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <article
          v-for="(special, index) in specials"
          :key="special.id"
          class="special-card bg-cream-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 400, delay: 100 + (index * 50) } }"
        >
          <!-- Image -->
          <div class="aspect-[4/3] overflow-hidden bg-cream-100">
            <NuxtImg
              v-if="special.image"
              :src="special.image"
              :alt="special.name"
              class="w-full h-full object-cover"
              width="400"
              height="300"
              loading="lazy"
              format="webp"
              quality="70"
              placeholder
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-cream-100"
            >
              <Icon name="mdi:food" class="w-16 h-16 text-primary-300" />
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 md:p-6">
            <div class="flex items-start justify-between gap-3 mb-3">
              <h3 class="font-grotesk font-bold text-lg md:text-xl text-gray-900 leading-tight">
                {{ special.name }}
              </h3>
              <span
                v-if="special.price"
                class="flex-shrink-0 font-grotesk font-bold text-lg text-primary-600"
              >
                ${{ formatPrice(special.price) }}
              </span>
            </div>

            <p
              v-if="special.description"
              class="font-ptsans text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2"
            >
              {{ special.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Special {
  id: number
  name: string
  description: string
  price: string | null
  image: string | null
}

defineProps<{
  specials: Special[]
}>()

function formatPrice(price: string): string {
  // If price already has decimals, return as-is
  if (price.includes('.')) {
    return price
  }
  // Add .00 for whole numbers
  return `${price}.00`
}
</script>

<style scoped>
.specials-section {
  position: relative;
}

.special-card {
  background-color: #fff0de;
}

.bg-cream-50 {
  background-color: #fff0de;
}

.bg-cream-100 {
  background-color: #f5e6d3;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-primary-300 {
  color: #7fa88a;
}

.text-primary-600 {
  color: #3f6e4d;
}
</style>
