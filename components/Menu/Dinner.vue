<template>
  <ul class="dinner">
    <li v-for="(item, i) in dinnerItems" :key="i">
      <img
          :src="`/img/${item.image || 'basil.png'}`"
          :alt="item.name"
          class="app-img"
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
  name: 'Dinner',

  data() {
    return {
      dinnerItems: [] as MenuItem[]
    }
  },

  async mounted() {
    try {
      const res = await fetch('/data.json')
      const data = await res.json()

      // load entrees, add placeholder images
      this.dinnerItems = data.menu.entrees.map((item: any) => ({
        ...item,
      }))
    } catch (err) {
      console.error('Failed to load dinner menu:', err)
    }
  }
})
</script>

<style scoped>
.dinner {
  li {
    list-style: none;
    background: #fff;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;

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
        line-height: 1.5;
        margin: 0;
      }
    }
  }
}
</style>
