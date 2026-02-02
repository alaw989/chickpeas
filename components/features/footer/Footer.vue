<template>
  <footer class="bg-[#3f6e4d] flex justify-center flex-col items-center py-12 md:py-16 px-4">
    <div class="w-full justify-center flex flex-col max-w-[1200px]">
      <ul class="footer">
        <li class="mx-0 flex items-center justify-center md:justify-start gap-2">
          <img src="/img/chickpea-icon.webp" alt="" width="24" height="24" class="chickpea-icon" />
          <span class="font-semibold text-lg">Chickpeas</span>
        </li>
        <li>
          <ul>
            <li class="mb-4">
              <a
                  href="tel:6262642461"
                  class="flex items-center justify-center md:justify-start hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"/>
                </svg>
                (626) 264-2461
              </a>
            </li>
            <li class="mb-6">
              <ul class="space-y-1">
                <li class="text-center md:text-left text-sm">Mon: Closed</li>
                <li class="text-center md:text-left text-sm">Tues - Thurs: 6AM-6PM</li>
                <li class="text-center md:text-left text-sm">Fri - Sat: 6AM-8PM</li>
                <li class="text-center md:text-left text-sm">Sun: 6AM-4PM</li>
              </ul>
            </li>
            <li class="flex justify-center md:justify-start">
              <a
                  href="https://order.online/store/chickpeas-mediterranean-grill-mobile-30404428/?hideModal=true&pickup=true&rwg_token=ACgRB3dN8qHKgMH9oThcl2AJv1VTojTeVKP_OTvx8kLhU7WNqsV0DrYSCzHWsDB1f1zTjFr66KbFvSuY_MIxjz2h4v6MoJ1pEw==&utm_source=gfo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="button-light"
              >
                Order Now
              </a>
            </li>
          </ul>
        </li>

        <!-- Footer menu navigation -->
        <li>
          <span class="sr-only">Footer navigation</span>
          <ul class="space-y-3">
            <li
                v-for="item in menuItems"
                :key="item.key"
                class="cursor-pointer"
            >
              <NuxtLink
                  :to="item.to"
                  class="block hover:underline"
                  :class="{ 'font-semibold': routePath === item.to }"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </li>

        <li class="text-center">
          <span class="text-sm opacity-80">Follow Us</span>
          <ul class="mt-2 flex justify-center md:justify-start space-x-3" aria-label="Social media links">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" role="img" aria-label="Facebook">
                <g fill="none">
                  <path
                      d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                  <path fill="currentColor"
                        d="M13.5 21.888C18.311 21.164 22 17.013 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.013 3.689 9.165 8.5 9.888V15H9a1.5 1.5 0 0 1 0-3h1.5v-2A3.5 3.5 0 0 1 14 6.5h.5a1.5 1.5 0 0 1 0 3H14a.5.5 0 0 0-.5.5v2H15a1.5 1.5 0 0 1 0 3h-1.5z"/>
                </g>
              </svg>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="flex justify-center mt-10 copyright border-t w-full pt-8 px-4">
      <div class="copyright-text w-full max-w-[1200px]">
        <p class="text-xs opacity-70">© Chickpeas Mediterranean Kitchen. All rights reserved. Designed and built by Austin Law</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { key: 'home', label: 'Home', to: '/' },
        { key: 'menu', label: 'Menu', to: '/menu' },
        { key: 'contact', label: 'Contact', to: '/contact' }
      ],
    }
  },
  computed: {
    routePath() {
      return this.$route?.path || '/'
    }
  }
}
</script>

<style scoped>

/* Footer list */
ul.footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
  padding: 0;
  margin: 0;
}

ul.footer li {
  list-style-type: none;
  letter-spacing: 0.02em;
  color: #e6fbcc;
  text-align: center;
}

ul.footer > li > ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul.footer a {
  color: #e6fbcc;
  text-decoration: none;
}

/* Button styling - override for footer context */
ul.footer a.button-light {
  color: #3f6e4d;
  text-decoration: none;
  background: #e6fbcc;
  border-color: #e6fbcc;
}

ul.footer a.button-light:hover {
  color: #e6fbcc;
  text-decoration: none;
  background: transparent;
  border-color: #e6fbcc;
}

@media (min-width: 768px) {
  ul.footer {
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
  }

  ul.footer li {
    text-align: left;
  }

  ul.footer > li > ul {
    align-items: flex-start;
  }
}

.copyright {
  color: #e6fbcc;
  text-align: center;
  border-color: rgba(230, 251, 204, 0.15);
}

.copyright p {
  margin: 0;
  line-height: 1.5;
}

@media (min-width: 768px) {
  .copyright {
    text-align: left;
  }
}
</style>
