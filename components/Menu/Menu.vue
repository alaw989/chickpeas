<template>
  <div class="w-full mx-auto flex justify-center ">
    <div class="w-full mx-auto menu-wrapper px-4 md:px-0">
      <div class="mb-6">
        <h2 class="font-grotesk text-center">Our delicious dishes </h2>
        <ul class="flex justify-center menu-header mb-2 flex-wrap">
          <li v-for="category in menuCategories" :key="category.key" :class="{ active: selectedTab === category.key }"
            @click="selectedTab = category.key">
            {{ category.label }}
          </li>
        </ul>
      </div>

      <div v-if="isLoading" class="py-10 text-center font-grotesk text-xl">
        Loading menu…
      </div>
      <p v-else-if="loadError" class="py-6 text-center text-red-600">
        {{ loadError }}
      </p>
      <div v-else class="menu-items-wrapper" :style="{ minHeight: menuItemsHeight ? `${menuItemsHeight}px` : null }">
        <transition name="switch" mode="out-in">
          <template v-if="currentMenuItems.length">
            <ul :key="selectedTab" ref="menuContent" class="flex flex-wrap menu-items">
              <li v-for="(item, i) in currentMenuItems" :key="item.id || i">

                <img :src="item.image?.guid || '/img/med-plate-photo-coming-soon.png'" :alt="item.name"
                  class="app-img rounded-2xl">
                <div class="app-text">
                  <h3>
                    {{ item.name }} —
                    <span v-if="item.price">${{ item.price }}</span>
                    <span v-else-if="item.price_small && item.price_large">
                      Small ${{ item.price_small }} / Large ${{ item.price_large }}
                    </span>
                    <span v-else-if="item.price_large">${{ item.price_large }}</span>
                  </h3>
                  <p v-if="item.description">{{ item.description }}</p>
                </div>
              </li>
            </ul>
          </template>
          <p v-else :key="`empty-${selectedTab}`" ref="menuContent" class="menu-empty">
            No items available for this category right now.
          </p>
        </transition>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      selectedTab: 'Entrees',
      menuData: null,
      menuItemTypes: null,
      menuItemsHeight: 0,
      isLoading: false,
      loadError: null,
      menuRequestController: null
    }
  },
  computed: {
    menuCategories() {
      if (!this.menuItemTypes) return []

      return Object.entries(this.menuItemTypes).map(([slug, label]) => ({
        key: label,
        label,
        dataKey: slug
      }))
    },
    currentWpCategory() {
      if (!this.menuData) return null

      return (this.menuData || []).find(
        item => Array.isArray(item.menu_item_type) && item.menu_item_type[0] === this.selectedTab
      ) || null
    },
    currentMenuItems() {
      if (!this.menuData) return []

      return (this.menuData || [])
        .filter(item => {
          const types = Array.isArray(item.menu_item_type)
            ? item.menu_item_type
            : [item.menu_item_type]
          return types.includes(this.selectedTab)
        })
        .map(item => ({
          id: item.id,
          name: item.menu_item_title || item.title?.rendered || '',
          description: item.description || item.content?.rendered || '',
          price: item.price || null,
          price_small: item.price_small || null,
          price_large: item.price_large || null,
          image: item.image || null
        }))
    }
  },
  mounted() {
    this.loadMenuData()
  },
  beforeDestroy() {
    this.cancelMenuRequest()
  },
  watch: {
    currentMenuItems: {
      handler() {
        this.updateMenuHeight()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    updateMenuHeight() {
      this.$nextTick(() => {
        const content = this.$refs.menuContent
        this.menuItemsHeight = content ? content.offsetHeight : this.menuItemsHeight
      })
    },
    cancelMenuRequest() {
      if (this.menuRequestController) {
        this.menuRequestController.abort()
        this.menuRequestController = null
      }
    },
    async loadMenuData() {
      this.cancelMenuRequest()
      const controller = new AbortController()
      this.menuRequestController = controller

      try {
        this.isLoading = true
        this.loadError = null

        const res = await fetch('https://wp.chickpeas-mobile.com/wp-json/wp/v2/menu_item?per_page=100&order=asc', {
          signal: controller.signal
        })

        if (!res.ok) {
          throw new Error(`Menu request failed with status ${res.status}`)
        }

        const items = await res.json()
        if (controller.signal.aborted) return

        this.menuData = items

        const toSlug = str =>
          str
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '_');

        this.menuItemTypes = (items || []).reduce((map, item) => {
          const types = Array.isArray(item.menu_item_type)
            ? item.menu_item_type
            : [item.menu_item_type];

          types.forEach(label => {
            if (label) {
              map[toSlug(label)] = label; // slug matches the keys in data.json
            }
          });

          return map;
        }, {});

      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to load menu data:', err)
          this.loadError = 'Unable to load menu right now. Please try again shortly.'
        }
      } finally {
        if (!controller.signal.aborted) {
          this.isLoading = false
        }
        if (this.menuRequestController === controller) {
          this.menuRequestController = null
        }
      }
    }
  }
}
</script>


<style scoped>
/* Typography */
h2 {
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 700;
  font-size: 3.5rem;
  line-height: 4.37rem;
  margin-bottom: 30px;
}

/* Responsive h2 font sizes */
@media (max-width: 1024px) {
  h2 {
    font-size: 2.25rem;
    line-height: 3rem;
  }
}

@media (max-width: 768px) {
  h2 {
    font-size: 2rem;
    line-height: 3rem;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

.menu-header li {
  list-style-type: none;
  margin: 0 10px;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 1.25rem;
  line-height: 1.875rem;
  font-family: 'PT Sans', sans-serif;
}

.menu-header li {
  color: #333;
}

.menu-header li.active {
  color: black;
}

/* Menu Lists styling */
.menu-items-wrapper {
  width: 100%;
  transition: min-height 0.2s ease;
}

.menu-items {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

.menu-items li {
  list-style: none;
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.menu-empty {
  width: 100%;
  text-align: center;
  font-family: 'PT Sans', sans-serif;
  font-size: 1.25rem;
  padding: 3rem 1rem;
  color: #555;
}

.app-img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 1rem;
}

.app-text {
  text-align: left;
}

.app-text h3 {
  margin: 0 0 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  font-family: 'Cabinet Grotesk', sans-serif;
}

.app-text p {
  font-weight: 400;
  font-style: normal;
  font-size: 1.3125rem;
  letter-spacing: 0;
  text-transform: none;
  line-height: 2.375;
  margin: 0;
  color: #474a45;
  font-family: 'PT Sans', sans-serif;
}

/* Responsive paragraph font sizes */
@media (max-width: 1024px) {
  .app-text p {
    font-size: 1.25rem;
    line-height: 2.25;
  }
}

@media (max-width: 768px) {
  .app-text p {
    font-size: 1.125rem;
    line-height: 2;
  }
}

@media (max-width: 480px) {
  .app-text p {
    font-size: 1rem;
    line-height: 1.75;
  }
}

/* Responsive grid columns for menu lists */
@media (min-width: 1024px) {
  .menu-items {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* switch transitions */
.switch-enter-from {
  opacity: 0;
}

.switch-leave-to {
  display: none;
}

.switch-enter-to {
  opacity: 1;
}

.switch-enter-active {
  transition: all 0.2s ease;
}

.switch-leave-active {
  transition: all 0.2s ease;
}
</style>
