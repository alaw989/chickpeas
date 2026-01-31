<template>
  <ul class="breakfast">
    <li v-for="(item, i) in breakfastItems" :key="i" class="shadow-lg">
      <img
          :src="`/img/${item.image}`"
          :alt="item.name"
          class="app-img rounded-2xl"
      />
      <div class="app-text">
        <h3>{{ item.name }} — ${{ item.price }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface MenuItem {
  name: string
  description: string
  price: number
  image?: string
}

export default defineComponent({
  name: 'Breakfast',

  data() {
    return {
      breakfastItems: [] as MenuItem[]
    }
  },

  async mounted() {
    try {
      const res = await fetch('/data.json')
      const data = await res.json()

      // Load breakfast array, add placeholder images if needed
      this.breakfastItems = data.menu.breakfast.map((item: any) => ({
        ...item,

      }))
    } catch (err) {
      console.error('Failed to load breakfast menu:', err)
    }
  }
})
</script>

<style scoped>
.breakfast {
}

.breakfast li {
  list-style: none;
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
}

.breakfast li .app-img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 1rem;
}

.breakfast li .app-text {
  text-align: left;
}

.breakfast li .app-text h3 {
  margin: 0 0 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
}

.breakfast li .app-text p {
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
}
</style>
