<template>
  <transition name="switch" appear>
    <div class="w-full mx-auto">
      <NuxtRouteAnnouncer/>
      <NavBar :currentSection="activeSection" @update:activeSection="handleSectionUpdate"/>
      <transition name="switch">
        <div :class="{ 'mb-[100px]': activeSection === 'menu' }">
          <component :is="activeComponent" :key="activeSection"/>
        </div>
      </transition>
      <Footer/>
    </div>
  </transition>

</template>

<script setup>
import {ref, computed} from 'vue'
import NavBar from '~/components/Header/NavBar.vue'
import Menu from '~/components/Menu/Menu.vue'
import Contact from '~/components/Contact.vue'
import Footer from '~/components/Footer/Footer.vue'
import Home from '~/components/Home/Home.vue'

const activeSection = ref('home')

const activeComponent = computed(() => {
  switch (activeSection.value) {
    case 'menu':
      return Menu
    case 'contact':
      return Contact
    case 'home':
      return Home
    default:
      return Home
  }
})

function handleSectionUpdate(newSection) {
  activeSection.value = newSection
}
</script>

<style scoped>
/* switch transitions */
.switch-enter-from  {
  opacity: 0;
}

.switch-leave-to {
  display:none;
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

.switch-appear-from  {
  opacity: 0;
}

.switch-appear-to {
  opacity: 1;
}

.switch-appear-active {
  transition: all 0.5s ease;
}
</style>
