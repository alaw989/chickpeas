<template>
  <transition name="switch" appear>
    <div class="w-full mx-auto">
      <NuxtRouteAnnouncer/>
      <NavBar :currentSection="activeSection"
              :jsonData="jsonData"
              @update:activeSection="handleSectionUpdate"
      />
      <transition name="switch">
        <div :class="{ 'mb-[100px]': activeSection === 'menu' }">
          <!-- Pass props dynamically -->
          <component
              :is="activeComponent"
              :key="activeSection"
              v-bind="activeComponentProps"
          />
        </div>
      </transition>
      <Footer :currentSection="activeSection" @update:activeSection="handleSectionUpdate" />
    </div>
  </transition>
</template>

<script>
import NavBar from '~/components/Header/NavBar.vue'
import Menu from '~/components/Menu/Menu.vue'
import Contact from '~/components/Contact.vue'
import Footer from '~/components/Footer/Footer.vue'
import Home from '~/components/Home/Home.vue'
import axios from 'axios';

export default {
  components: {
    NavBar,
    Menu,
    Contact,
    Footer,
    Home,
  },
  data() {
    return {
      activeSection: 'home',
      jsonData: null,
      loading: true,
      error: null,
    }
  },
  mounted() {
    axios.get('/data.json')
        .then(response => {
          this.jsonData = response.data;
          console.log('jsonData', this.jsonData);
        })
        .catch(error => {
          this.error = error.message || 'Failed to load data';
        })
        .finally(() => {
          this.loading = false;
        });
  },
  computed: {
    activeComponent() {
      switch (this.activeSection) {
        case 'menu':
          return Menu
        case 'contact':
          return Contact
        case 'home':
          return Home
        default:
          return Home
      }
    },
    // Provide props for the active component here
    activeComponentProps() {
      // Customize the props based on which component is active
      switch (this.activeSection) {
        case 'menu':
          return {jsonData: this.jsonData, loading: this.loading, error: this.error}
        case 'contact':
          return {somePropForContact: 'value'} // example, replace as needed
        case 'home':
          return {somePropForHome: 123}       // example, replace as needed
        default:
          return {}
      }
    }
  },
  methods: {
    handleSectionUpdate(newSection) {
      this.activeSection = newSection
    }
  }
}
</script>
