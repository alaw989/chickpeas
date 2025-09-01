<template>
  <div class="w-full mx-auto flex justify-center ">
    <div class="w-full mx-auto menu-wrapper px-4 md:px-0">
      <div class="mb-6">
        <h2 class="font-grotesk text-center">Our delicious dishes </h2>
        <ul class="flex justify-center menu-header mb-2">
          <li @click="selectedTab = 'Appetizers'" :class="{ active: selectedTab === 'Appetizers' }">
            Appetizers
          </li>
          <li @click="selectedTab = 'Breakfast'" :class="{ active: selectedTab === 'Breakfast' }">
            Breakfast
          </li>
          <li @click="selectedTab = 'Dinner'" :class="{ active: selectedTab === 'Dinner' }">
            Dinner
          </li>
        </ul>
      </div>

      <transition name="switch">
        <Breakfast v-if="selectedTab === 'Breakfast'"/>
      </transition>
      <transition name="switch">
        <Dinner v-if="selectedTab === 'Dinner'"/>
      </transition>
      <transition name="switch">
        <Appetizers v-if="selectedTab === 'Appetizers'"/>
      </transition>
    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import Breakfast from '~/components/Menu/Breakfast.vue';
import Dinner from '~/components/Menu/Dinner.vue';
import Appetizers from "~/components/Menu/Appetizers.vue";

// Reactive variable to track the selected tab
const selectedTab = ref('Breakfast');
</script>


<style scoped>

h2 {
  margin-bottom: 30px;
}

.menu-header li {
  list-style-type: none;
  margin: 0 10px;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 1.25rem;
  line-height: 1.875rem;
}

li {
  color: #333;
}

li.active {
  color: black;
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

