<template>
  <div class="w-full justify-center flex px-4 md:px-6 lg:px-8">
    <header class="py-4 md:py-5 w-full max-w-[1200px] mx-auto flex justify-center">
      <div class="nav-container w-full flex items-center justify-between relative">

        <div class="flex flex-1 items-center logo">
          <NuxtLink to="/" class="block">
            <NuxtImg
                src="/img/chickpeas.webp"
                alt="Chickpea's Restaurant logo"
                width="300"
                height="100"
                class="cursor-pointer"
                :class="{ 'opacity-80': routePath !== '/' }"
                loading="eager"
                format="webp"
                quality="70"
                :sizes="'250px md:300px'"
            />
          </NuxtLink>
        </div>

        <button
            ref="hamburgerButton"
            @click="toggleNav"
            :aria-label="showMenu ? 'Close menu' : 'Open menu'"
            :aria-expanded="showMenu"
            class="md:hidden hover:text-gray-300 focus:outline-none cursor-pointer flex-1 max-w-[60px] w-[60px] absolute hamburger right-0"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
               class="w-[40px] max-w-[40px] max-h-[40px]">
            <path d="M4 18L20 18" stroke="#000" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 12L20 12" stroke="#000" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 6L20 6" stroke="#000" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Mobile Menu Backdrop -->
        <div
            v-if="showMenu"
            @click="closeMenu"
            class="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            aria-hidden="true"
        ></div>

        <!-- Mobile Menu -->
        <nav
            class="mobile-menu flex-col md:hidden fixed right-0 top-0 h-full w-[280px] p-6 transform transition-transform duration-300 ease-in-out bg-white z-50 shadow-xl"
            :class="showMenu ? 'translate-x-0' : 'translate-x-full'"
        >
          <button @click="toggleNav" aria-label="Close menu" class="mb-8 self-end focus:outline-none cursor-pointer">
            <svg class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <ul class="space-y-2">
            <li
                v-for="item in menuItems"
                :key="item.key"
                class="list-none"
            >
              <!-- External link (has url property with actual value) -->
              <template v-if="item.url && item.url.length > 0">
                <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mobile-nav-link"
                    :class="{ 'mobile-nav-cta': item.key === 'contact' }"
                    @click="closeMenu"
                >
                  {{ item.label }}
                </a>
              </template>
              <!-- Internal link (has to property) -->
              <template v-else-if="item.to">
                <NuxtLink
                    :to="item.to"
                    class="mobile-nav-link"
                    :class="{
                      'mobile-nav-active': routePath === item.to,
                      'mobile-nav-cta': item.key === 'contact'
                    }"
                    @click="closeMenu"
                >
                  {{ item.label }}
                </NuxtLink>
              </template>
              <!-- Pending external link (url property exists but empty - waiting for API) -->
              <template v-else>
                <span
                    class="mobile-nav-link mobile-nav-disabled"
                    aria-disabled="true"
                >
                  {{ item.label }}
                </span>
              </template>
            </li>
          </ul>
        </nav>

        <!-- Desktop Menu -->
        <nav class="menu hidden justify-end md:flex md:flex-1">
          <ul class="flex items-center gap-2">
            <li
                v-for="item in menuItems"
                :key="item.key"
                class="list-none"
            >
              <!-- External link (has url property with actual value) -->
              <template v-if="item.url && item.url.length > 0">
                <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="nav-link"
                    :class="{ 'nav-link-cta': item.key === 'contact' }"
                >
                  {{ item.label }}
                </a>
              </template>
              <!-- Internal link (has to property) -->
              <template v-else-if="item.to">
                <NuxtLink
                    :to="item.to"
                    class="nav-link"
                    :class="{
                      'nav-link-active': routePath === item.to,
                      'nav-link-cta': item.key === 'contact'
                    }"
                >
                  {{ item.label }}
                </NuxtLink>
              </template>
              <!-- Pending external link (url property exists but empty - waiting for API) -->
              <template v-else>
                <span
                    class="nav-link nav-link-disabled"
                    aria-disabled="true"
                >
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


<script setup>
import siteDataJson from '~/public/data.json'

const route = useRoute()

const showMenu = ref(false)
const hamburgerButton = shallowRef(null)

const routePath = computed(() => route?.path || '/')

const doordashUrl = siteDataJson?.external_urls?.doordash?.url || ''

const menuItems = [
  { key: 'menu', label: 'View Our Menu', prefix: '1', to: '/menu' },
  { key: 'takeout', label: 'Order Takeout', prefix: '2', url: doordashUrl },
  { key: 'delivery', label: 'Order Delivery', prefix: '3', url: doordashUrl },
  { key: 'contact', label: 'Contact Us', prefix: '4', to: '/contact' }
]

function toggleNav() {
  showMenu.value = !showMenu.value
}

function closeMenu() {
  showMenu.value = false
  // Return focus to hamburger button when menu closes
  nextTick(() => {
    hamburgerButton.value?.focus()
  })
}

// Scroll lock when mobile menu is open
watch(showMenu, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Clean up on unmount
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>

.nav-container {
  flex-direction: row;
}

.menu {
  margin-top: 20px;
}

.nav-link {
  display: block;
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: #2d2926;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #3f6e4d;
  background: rgba(63, 110, 77, 0.08);
}

.nav-link-active {
  color: #3f6e4d;
  font-weight: 600;
  background: rgba(63, 110, 77, 0.1);
}

.nav-link-cta {
  background: #3f6e4d;
  color: #e6fbcc;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
}

.nav-link-cta:hover {
  background: #365f42;
  color: #e6fbcc;
}

.logo {
  justify-content: center;
}

.logo img {
  cursor: pointer;
  max-width: 250px;
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

.mobile-nav-link {
  display: block;
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  color: #2d2926;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  color: #3f6e4d;
  background: rgba(63, 110, 77, 0.08);
}

.mobile-nav-active {
  color: #3f6e4d;
  font-weight: 600;
  background: rgba(63, 110, 77, 0.1);
}

.mobile-nav-cta {
  background: #3f6e4d;
  color: #e6fbcc;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
}

.mobile-nav-cta:hover {
  background: #365f42;
  color: #e6fbcc;
}

.mobile-nav-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-link-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.menu {
  /* desktop menu handled by hidden/md:flex classes */
}

@media (min-width: 768px) {
  .nav-container {
    flex-direction: column;
  }

  .logo img {
    max-width: 300px;
  }

  .hamburger,
  .mobile-menu {
    display: none !important;
  }

  .menu {
    display: flex !important;
  }
}

@media (min-width: 1280px) {
  .nav-container {
    flex-direction: row;
  }

  .menu {
    margin-top: 0;
  }

  .logo {
    justify-content: flex-start;
  }
}
</style>
