<template>
  <div class="w-full mx-auto flex justify-center ">
    <div class="w-full mx-auto menu-wrapper section-wrap px-4 md:px-0">
      <div class="text-center mb-10">
        <p class="eyebrow mb-2">Menu</p>
        <component :is="headingTag" class="heading-lg mb-3">Crafted with care, served with love</component>
        <p class="font-ptsans text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-6">
          Fresh Mediterranean flavors made from scratch daily
        </p>
        <ul class="flex justify-center menu-header flex-wrap" role="tablist" aria-label="Menu categories">
          <li v-for="category in menuCategories" :key="category.key" role="presentation">
            <button
              role="tab"
              :id="`tab-${category.dataKey}`"
              :aria-selected="selectedTab === category.key"
              :aria-controls="`panel-${category.dataKey}`"
              :tabindex="selectedTab === category.key ? 0 : -1"
              :class="{ active: selectedTab === category.key }"
              @click="selectedTab = category.key"
              @keydown="handleTabKeydown($event, category)"
            >
              {{ category.label }}
            </button>
          </li>
        </ul>
      </div>

      <div v-if="isLoading" class="menu-skeleton">
        <div v-for="i in 4" :key="`skeleton-${i}`" class="skeleton-card">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-line title"></div>
            <div class="skeleton-line description"></div>
            <div class="skeleton-line price"></div>
          </div>
        </div>
      </div>
      <p v-else-if="loadError" class="py-6 text-center text-red-600">
        {{ loadError }}
      </p>
      <div v-else class="menu-items-wrapper" :style="{ minHeight: menuItemsHeight ? `${menuItemsHeight}px` : null }">
        <div
          v-for="category in menuCategories"
          :key="`panel-${category.dataKey}`"
          :id="`panel-${category.dataKey}`"
          role="tabpanel"
          :aria-labelledby="`tab-${category.dataKey}`"
          :hidden="selectedTab !== category.key"
        >
          <transition name="switch" mode="out-in">
            <template v-if="selectedTab === category.key">
              <template v-if="getItemsForCategory(category.key).length">
                <ul ref="menuContent" class="flex flex-wrap menu-items">
                  <li v-for="(item, i) in getItemsForCategory(category.key)" :key="item.id || i">
                    <NuxtImg
                        :src="item.image?.guid || '/img/med-plate-photo-coming-soon.webp'"
                        :alt="item.name ? `${item.name} menu item` : 'Menu item'"
                        class="app-img rounded-2xl"
                        loading="lazy"
                        width="400"
                        height="300"
                        sizes="(max-width: 768px) 100vw, 400px"
                    />
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
              <p v-else ref="menuContent" class="menu-empty">
                No items available for this category right now.
              </p>
            </template>
          </transition>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    headingLevel: {
      type: String,
      default: 'h2',
      validator: (value) => ['h1', 'h2', 'h3'].includes(value)
    },
    menuData: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    loadError: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      selectedTab: '',
      menuItemsHeight: 0
    }
  },
  computed: {
    headingTag() {
      return this.headingLevel || 'h2'
    },
    menuItemTypes() {
      if (!this.menuData?.length) return {}

      const toSlug = str =>
        str
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '_')

      return (this.menuData || []).reduce((map, item) => {
        const types = Array.isArray(item.menu_item_type)
          ? item.menu_item_type
          : [item.menu_item_type]

        types.forEach(label => {
          if (label) {
            map[toSlug(label)] = label
          }
        })

        return map
      }, {})
    },
    menuCategories() {
      return Object.entries(this.menuItemTypes).map(([slug, label]) => ({
        key: label,
        label,
        dataKey: slug
      }))
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
          description: (item.description || item.content?.rendered || '').replace(/<[^>]*>/g, '').trim(),
          price: item.price || null,
          price_small: item.price_small || null,
          price_large: item.price_large || null,
          image: item.image || null
        }))
    }
  },
  watch: {
    currentMenuItems: {
      handler() {
        this.updateMenuHeight()
      },
      deep: true,
      immediate: true
    },
    menuCategories: {
      handler(categories) {
        if (!categories.length) return
        const matches = categories.some(category => category.key === this.selectedTab)
        if (!this.selectedTab || !matches) {
          this.selectedTab = categories[0].key
        }
      },
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
    getItemsForCategory(categoryKey) {
      if (!this.menuData) return []

      return (this.menuData || [])
        .filter(item => {
          const types = Array.isArray(item.menu_item_type)
            ? item.menu_item_type
            : [item.menu_item_type]
          return types.includes(categoryKey)
        })
        .map(item => ({
          id: item.id,
          name: item.menu_item_title || item.title?.rendered || '',
          description: (item.description || item.content?.rendered || '').replace(/<[^>]*>/g, '').trim(),
          price: item.price || null,
          price_small: item.price_small || null,
          price_large: item.price_large || null,
          image: item.image || null
        }))
    },
    handleTabKeydown(event, currentCategory) {
      const categories = this.menuCategories
      const currentIndex = categories.findIndex(c => c.key === currentCategory.key)
      let newIndex = currentIndex

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        newIndex = (currentIndex + 1) % categories.length
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        newIndex = (currentIndex - 1 + categories.length) % categories.length
      } else if (event.key === 'Home') {
        event.preventDefault()
        newIndex = 0
      } else if (event.key === 'End') {
        event.preventDefault()
        newIndex = categories.length - 1
      }

      if (newIndex !== currentIndex) {
        this.selectedTab = categories[newIndex].key
        this.$nextTick(() => {
          const newTabButton = document.getElementById(`tab-${categories[newIndex].dataKey}`)
          newTabButton?.focus()
        })
      }
    }
  }
}
</script>


<style scoped>
/* Menu wrapper - use global section-wrap */
.menu-wrapper {
  max-width: 1200px;
}

/* Menu header tabs */
.menu-header {
  gap: 0.25rem;
}

.menu-header li {
  list-style-type: none;
}

.menu-header button {
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  line-height: 1.4;
  font-family: 'PT Sans', sans-serif;
  color: #666;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
}

@media (min-width: 640px) {
  .menu-header button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .menu-header button {
    font-size: 1.125rem;
  }
}

.menu-header button:hover {
  color: #3f6e4d;
  background: rgba(63, 110, 77, 0.08);
}

.menu-header button.active {
  color: #3f6e4d;
  font-weight: 700;
  background: rgba(63, 110, 77, 0.1);
}

.menu-header button:focus-visible {
  outline: 2px solid #3f6e4d;
  outline-offset: 2px;
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
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .menu-items {
    gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .menu-items {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

.menu-items li {
  list-style: none;
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  width: 100%;
}

@media (min-width: 640px) {
  .menu-items li {
    flex-direction: row;
    align-items: flex-start;
    padding: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .menu-items li {
    padding: 1.5rem;
  }
}

.menu-empty {
  width: 100%;
  text-align: center;
  font-family: 'PT Sans', sans-serif;
  font-size: 1.125rem;
  padding: 2rem 1rem;
  color: #666;
}

/* Menu item image */
.app-img {
  width: 100%;
  max-width: 200px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
}

@media (min-width: 640px) {
  .app-img {
    width: 140px;
    height: 140px;
    margin-bottom: 0;
    margin-right: 1rem;
  }
}

@media (min-width: 1024px) {
  .app-img {
    width: 160px;
    height: 160px;
  }
}

/* Menu item text */
.app-text {
  text-align: center;
  flex: 1;
}

@media (min-width: 640px) {
  .app-text {
    text-align: left;
  }
}

.app-text h3 {
  margin: 0 0 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  font-family: 'Cabinet Grotesk', sans-serif;
}

@media (min-width: 1024px) {
  .app-text h3 {
    font-size: 1.25rem;
  }
}

.app-text p {
  font-weight: 400;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  color: #555;
  font-family: 'PT Sans', sans-serif;
}

@media (min-width: 640px) {
  .app-text p {
    font-size: 1rem;
    line-height: 1.7;
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

/* Skeleton Loading States */
.menu-skeleton {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .menu-skeleton {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

@media (min-width: 640px) {
  .skeleton-card {
    flex-direction: row;
    align-items: flex-start;
    padding: 1.25rem;
  }
}

.skeleton-image {
  width: 100%;
  max-width: 200px;
  height: 150px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.75rem;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .skeleton-image {
    width: 140px;
    height: 140px;
  }
}

.skeleton-content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-line {
  height: 1rem;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-line.title {
  width: 60%;
  height: 1.25rem;
}

.skeleton-line.description {
  width: 80%;
}

.skeleton-line.price {
  width: 30%;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
