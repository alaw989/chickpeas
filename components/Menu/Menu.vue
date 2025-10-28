<template>
  <div class="w-full mx-auto flex justify-center ">
    <div class="w-full mx-auto menu-wrapper px-4 md:px-0">
      <div class="mb-6">
        <h2 class="font-grotesk text-center">Our delicious dishes </h2>
        <ul class="flex justify-center menu-header mb-2 flex-wrap">
          <li
              v-for="category in menuCategories"
              :key="category.key"
              :class="{ active: selectedTab === category.key }"
              @click="selectedTab = category.key"
          >
            {{ category.label }}
          </li>
        </ul>
      </div>

      <transition name="switch">
        <ul v-if="currentMenuItems.length" class="flex flex-wrap menu-items">
          <li v-for="(item, i) in currentMenuItems" :key="i">

            <img 
                :src="`/img/${item.image || 'med-plate-photo-coming-soon.png'}`"
                :alt="item.name"
                class="app-img rounded-2xl"
            >
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
      </transition>
    </div>
  </div>

</template>

<script setup>
import {ref, computed, onMounted} from 'vue';

const selectedTab = ref('Breakfast');
const menuData = ref(null);

const menuCategories = computed(() => {
  if (!menuData.value) return [];

  const categoryMap = {
    appetizers: 'Appetizers',
    salads: 'Salads',
    sandwiches: 'Sandwiches',
    entrees: 'Entrees',
    kids_menu: 'Kids Menu',
    sides: 'Sides',
    drinks: 'Drinks',
    breakfast: 'Breakfast'
  };

  return Object.keys(menuData.value.menu)
      .filter(key => key !== 'featured_items' && key !== 'protein_choices' && Array.isArray(menuData.value.menu[key]) && menuData.value.menu[key].length > 0)
      .map(key => ({
        key: categoryMap[key] || key.charAt(0).toUpperCase() + key.slice(1),
        label: categoryMap[key] || key.charAt(0).toUpperCase() + key.slice(1),
        dataKey: key
      }));
});

const currentMenuItems = computed(() => {
  if (!menuData.value) return [];

  const currentCategory = menuCategories.value.find(cat => cat.key === selectedTab.value);
  return currentCategory ? menuData.value.menu[currentCategory.dataKey] || [] : [];
});

onMounted(async () => {
  try {
    const res = await fetch('/data.json');
    menuData.value = await res.json();

    console.log(menuData.value)
  } catch (err) {
    console.error('Failed to load menu data:', err);
  }
});
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
  transition: all 0.5s ease;
}

.switch-leave-active {
  transition: all 0.5s ease;
}
</style>

