<template>
  <ul class="flex flex-wrap appetizers">
    <li v-for="(item, i) in items" :key="i">
      <img
          :src="`/img/${item.image || 'placeholder.jpg'}`"
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
  name: 'Appetizers',

  data() {
    return {
      items: [] as MenuItem[]
    }
  },

  async mounted() {
    try {
      const res = await fetch('/data.json')
      const data = await res.json()

      // pull only appetizers (with images from JSON)
      this.items = data.menu.appetizers
    } catch (err) {
      console.error('Failed to load menu:', err)
    }
  }
})
</script>

<style scoped>
.appetizers {
  li {
    list-style: none;
    background: #fff;
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .app-img {
      width: 180px;
      height: 180px;
      object-fit: cover;
      flex-shrink: 0;
      margin-right: 1rem;
    }

    .app-text {
      text-align: left;

      h3 {
        margin: 0 0 0.5rem;
        font-weight: 700;
        font-size: 1.25rem;
      }

      p {
        font-weight: 100;
        line-height: 1.875;
        margin: 0;
        font-size: 1.125rem;
        color: #474a45;
      }
    }
  }
}
</style>
