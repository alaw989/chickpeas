<template>
  <footer class="bg-[#3f6e4d] flex justify-center flex-col items-center py-12 md:py-16 px-4">
    <div class="w-full justify-center flex flex-col max-w-[1200px]">
      <ul class="footer">
        <li class="mx-0 flex items-center justify-center md:justify-start gap-2">
          <NuxtImg src="/img/chickpea-icon.webp" alt="" width="24" height="24" class="chickpea-icon" loading="lazy" format="webp" quality="70" />
          <span class="font-semibold text-lg">Chickpeas</span>
        </li>
        <li>
          <ul>
            <li class="mb-4">
              <a
                  :href="`tel:${business.phone.replace(/\D/g, '')}`"
                  class="flex items-center justify-center md:justify-start hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"/>
                </svg>
                {{ business.phone }}
              </a>
            </li>
            <li class="mb-6">
              <ul class="space-y-1">
                <li class="text-center md:text-left text-sm !text-white">Mon: Closed</li>
                <li class="text-center md:text-left text-sm !text-white">Tues - Thurs: 6AM-6PM</li>
                <li class="text-center md:text-left text-sm !text-white">Fri - Sat: 6AM-8PM</li>
                <li class="text-center md:text-left text-sm !text-white">Sun: 6AM-4PM</li>
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
          <span class="text-sm font-semibold" style="color: #ffffff;">Follow Us</span>
          <ul class="mt-2 flex justify-center md:justify-start space-x-3" aria-label="Social media links">
            <li v-if="business.socialUrls?.facebook">
              <a
                :href="business.socialUrls.facebook"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                  <g fill="none">
                    <path
                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                    <path fill="currentColor"
                          d="M13.5 21.888C18.311 21.164 22 17.013 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.013 3.689 9.165 8.5 9.888V15H9a1.5 1.5 0 0 1 0-3h1.5v-2A3.5 3.5 0 0 1 14 6.5h.5a1.5 1.5 0 0 1 0 3H14a.5.5 0 0 0-.5.5v2H15a1.5 1.5 0 0 1 0 3h-1.5z"/>
                  </g>
                </svg>
              </a>
            </li>
            <li v-if="business.socialUrls?.instagram">
              <a
                :href="business.socialUrls.instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                  <g fill="none">
                    <path fill="currentColor" d="M12 2c2.717 0 3.056.01 4.122.06c1.065.05 1.79.217 2.428.465c.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772a4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465c-1.066.047-1.405.06-4.122.06c-2.717 0-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153a4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2m0-2C9.242 0 8.879.01 7.802.058C6.726.106 5.997.256 5.356.475a4.907 4.907 0 0 0-1.771 1.153A4.896 4.896 0 0 0 2.43 3.401C2.213 4.043 2.063 4.773 2.015 5.848C1.967 6.926 1.956 7.29 1.956 10.047c0 2.757.01 3.12.058 4.197c.048 1.075.198 1.805.415 2.447a4.907 4.907 0 0 0 1.154 1.773a4.915 4.915 0 0 0 1.773 1.153c.642.217 1.372.367 2.447.415c1.077.048 1.44.058 4.197.058s3.12-.01 4.197-.058c1.075-.048 1.805-.198 2.447-.415a4.907 4.907 0 0 0 1.773-1.153a4.915 4.915 0 0 0 1.153-1.773c.217-.642.367-1.372.415-2.447c.048-1.077.058-1.44.058-4.197c0-2.757-.01-3.12-.058-4.197c-.048-1.075-.198-1.805-.415-2.447a4.907 4.907 0 0 0-1.153-1.773a4.896 4.896 0 0 0-1.774-1.153c-.642-.217-1.371-.367-2.447-.415C15.12.01 14.757 0 12 0"/>
                    <path fill="currentColor" d="M12 4.878a5.122 5.122 0 1 0 0 10.244a5.122 5.122 0 0 0 0-10.244M12 14a4 4 0 1 1 0-8a4 4 0 0 1 0 8"/>
                    <path fill="currentColor" d="M16.5 3.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/>
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="flex justify-center mt-10 copyright border-t w-full pt-8 px-4">
      <div class="copyright-text w-full max-w-[1200px]">
        <p class="text-xs font-medium" style="color: #ffffff;">© Chickpeas Mediterranean Kitchen. All rights reserved. Designed and built by Austin Law</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig()
const business = config.public.business

const menuItems = [
  { key: 'home', label: 'Home', to: '/' },
  { key: 'menu', label: 'Menu', to: '/menu' },
  { key: 'contact', label: 'Contact', to: '/contact' }
]

const route = useRoute()
const routePath = computed(() => route?.path || '/')
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
  color: #ffffff;
  text-align: center;
}

ul.footer > li > ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul.footer a {
  color: #ffffff;
  text-decoration: none;
}

/* Button styling - override for footer context */
ul.footer a.button-light {
  color: #3f6e4d;
  text-decoration: none;
  background: #ffffff;
  border-color: #ffffff;
}

ul.footer a.button-light:hover {
  color: #ffffff;
  text-decoration: none;
  background: transparent;
  border-color: #ffffff;
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
  color: #ffffff;
  text-align: center;
  border-color: rgba(255, 255, 255, 0.15);
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
