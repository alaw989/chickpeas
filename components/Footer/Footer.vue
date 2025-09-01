<template>
  <div class="bg-[#3f6e4d] pt-[95px] pb-[30px] flex justify-center flex-col items-center">
    <div class="w-full justify-center flex flex-col footer-wrapper">
      <ul class="footer">
        <li class="mx-0 attach-icon">Chickpeas</li>
        <li>
          <ul>
            <li class="mb-[30px] mx-0">
              <a
                  href="tel:6262642461"
                  class="flex items-center hover:underline"
              >
                <!-- Phone svg omitted for brevity -->
                (626) 264-2461
              </a>
            </li>
            <ul class="mb-[30px]">
              <li class="mb-2 text-left">Mon: Closed</li>
              <li class="mb-2 text-left">Tues - Thurs: 6AM-6PM</li>
              <li class="mb-2 text-left">Fri - Sat: 6AM-8PM</li>
              <li class="text-left">Sun: 6AM-4PM</li>
            </ul>
            <li class=" mt-10">
              <a
                  href="https://order.online/store/chickpeas-mediterranean-grill-mobile-30404428/?hideModal=true&pickup=true..."
                  target="_blank"
                  rel="noopener noreferrer"
                  class="button-light"
              >
                Order Now
              </a>
            </li>
          </ul>
        </li>

        <!-- Footer menu navigation mimicking NavBar -->
        <li>
          <ul>
            <li
                v-for="item in menuItems"
                :key="item.section"
                class="mb-[30px] cursor-pointer"
                :class="{ underline: currentSection === item.section }"
                @click="selectSection(item.section)"
            >
              {{ item.label }}
            </li>
          </ul>
        </li>

        <li class="mb-[20px] mx-0 text-center">
          Social Media
          <div class="mt-4 flex social-media-container space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <g fill="none">
                <path
                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                <path fill="currentColor"
                      d="M13.5 21.888C18.311 21.164 22 17.013 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.013 3.689 9.165 8.5 9.888V15H9a1.5 1.5 0 0 1 0-3h1.5v-2A3.5 3.5 0 0 1 14 6.5h.5a1.5 1.5 0 0 1 0 3H14a.5.5 0 0 0-.5.5v2H15a1.5 1.5 0 0 1 0 3h-1.5z"/>
              </g>
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex justify-center mt-[50px] copyright border-t w-full pt-[50px]">
      <div class="copyright-text w-full">
        <div> Copyright © Chickpeas. All rights reserved. Designed and built by Austin Law</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentSection: {
      type: String,
      default: 'home',
    },
    jsonData: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      menuItems: [
        { section: 'home', label: 'Home' },
        { section: 'menu', label: 'Menu' },
        { section: 'contact', label: 'Contact' }
      ],
    }
  },
  methods: {
    selectSection(section) {
      this.$emit('update:activeSection', section)
    }
  }
}
</script>

<style scoped>
/* Footer list */
.footer-wrapper {
  .button-light {
    margin-bottom: 30px;
  }

  ul.footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;

    li {
      list-style-type: none;
      letter-spacing: 1.8px;
      color: #e6fbcc;
      text-align: center;
      justify-content: center;
    }

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
      li {
        text-align: left;
        justify-content: flex-start;
      }
    }
  }
}

.copyright {
  font-weight: 100;
  color: #e6fbcc;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
}
</style>
