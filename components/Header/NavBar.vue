<template>
  <div class="w-full justify-center flex">
    <header class="pt-[20px] mb-[20px] w-full max-w-[1440px] mx-auto flex justify-center">
      <div class="nav-container container flex items-center justify-between px-0 relative">

        <div class="flex flex-1 items-center logo">
          <img
              src="/img/chickpeas.png"
              alt="chickpeas logo"
              class=" cursor-pointer"
              @click="selectSection('home')"
              :class="{ 'opacity-80': currentSection !== 'home' }"
          />
        </div>

        <button
            @click="toggleNav"
            class="md:hidden hover:text-gray-300 focus:outline-none cursor-pointer flex-1 max-w-[60px] w-[60px] absolute hamburger right-0"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
               class="w-[40px] max-w-[40px] max-h-[40px]">
            <path d="M4 18L20 18" stroke="#000" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 12L20 12" stroke="#000" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 6L20 6" stroke="#000" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Mobile Menu -->
        <nav
            class="mobile-menu flex-col space-y-4 md:hidden fixed right-0 top-0 h-full w-[200px] p-4 transform transition-transform duration-300 ease-in-out bg-white z-50"
            :class="showMenu ? 'translate-x-0' : 'translate-x-full'"
        >
          <button @click="toggleNav" aria-label="Close menu" class="mb-6 self-end focus:outline-none cursor-pointer">
            <svg class="w-6 h-6 text-gray-700 " fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <li
              v-for="item in menuItems"
              :key="item.section"
              class="list-none cursor-pointer mb-[20px]"
              @click="selectSection(item.section)"
              :class="{ underline: currentSection === item.section }"
          >
            {{ item.prefix }} {{ item.label }}
          </li>
        </nav>

        <!-- Desktop Menu -->
        <nav class="menu hidden justify-end md:flex md:flex-1 md:space-x-8">
          <ul class="flex space-x-6">
            <li
                v-for="item in menuItems"
                :key="item.section"
                class="list-none cursor-pointer"
                :class="{ underline: currentSection === item.section }"
            >
              <template v-if="item.url">
                <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block"
                >
                  {{ item.label }}
                </a>
              </template>
              <template v-else>
                <span @click="selectSection(item.section)">
                  {{ item.label }}
                </span>
              </template>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>


<script>
export default {
  props: {
    currentSection: {
      type: String,
      default: 'menu',
    },
    jsonData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      showMenu: false,
      menuItems: [
        {section: 'menu', label: 'View Our Menu', prefix: '1'},
        {section: 'takeout', label: 'Order Takeout', prefix: '2', url: ''},
        {section: 'delivery', label: 'Order Delivery', prefix: '3', url: ''},
        {section: 'contact', label: 'Contact Us', prefix: '4'},
      ],
    }
  },
  watch: {
    jsonData(newVal) {
      if (newVal?.external_urls?.doordash?.url) {
        this.menuItems = this.menuItems.map(item => {
          if (item.section === 'takeout' || item.section === 'delivery') {
            return {...item, url: newVal.external_urls.doordash.url}
          }
          return item
        })
      }
    }
  },
  mounted() {

  },
  methods: {
    toggleNav() {
      this.showMenu = !this.showMenu
    },
    selectSection(section) {
      this.$emit('update:activeSection', section)
      this.showMenu = false
    },
  },
}
</script>

<style scoped>

.nav-container {
  flex-direction: row;
  @media (min-width: 768px) {
    flex-direction: column;
  }
  @media (min-width: 1280px) {
    flex-direction: row;
  }
}

.menu {
  margin-top: 20px;

  @media (min-width: 1280px) {
    margin-top: 0;
  }

  li {
    font-size: 1.20rem;
    letter-spacing: 0.04em;
    cursor: pointer;
    list-style-type: none;
    padding: 0;
    transition: background 0.2s;
  }

}

.logo {
  justify-content: center;

  @media (min-width: 1280px) {
    justify-content: start;
  }

  img {
    cursor: pointer;
    max-width: 250px;

    @media (min-width: 768px) {
      max-width: 300px;
    }
  }
}


.hamburger {
  border: 0;
  background: none;
  right: 0;
}

.mobile-menu {
  background-color: #fff;
  z-index: 999;
}

.menu {
  /* desktop menu handled by hidden/md:flex classes */
}

@media (min-width: 768px) {
  .hamburger,
  .mobile-menu {
    display: none !important;
  }

  .menu {
    display: flex !important;
  }
}
</style>
