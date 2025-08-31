<template>
  <div class="bg-[#3f6e4d] footer pt-[95px] pb-[30px] flex justify-center flex-col items-center">
    <div class="w-full justify-center flex flex-col max-w-[1440px]">
      <ul class="footer flex justify-between">
        <li class="mx-0">Chickpeas</li>
        <li>
          <ul>
            <li class="mb-[30px] mx-0">
              <a
                  href="tel:6262642461"
                  class="flex items-center hover:underline"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/>
                    <path fill="#e6fbcc"
                          d="M8.172 15.829c3.845 3.845 7.408 4.266 8.454 4.305c1.264.046 2.554-.986 3.112-2.043c-.89-1.044-2.049-1.854-3.318-2.732c-.749.748-1.672 2.138-2.901 1.64c-.699-.281-2.425-1.076-3.933-2.585S7.283 11.18 7 10.482c-.498-1.231.896-2.156 1.645-2.905c-.878-1.29-1.674-2.479-2.716-3.324c-1.072.56-2.11 1.84-2.063 3.121c.039 1.046.46 4.609 4.306 8.455m8.38 6.304c-1.44-.053-5.521-.617-9.795-4.89c-4.273-4.274-4.836-8.354-4.89-9.795c-.08-2.196 1.602-4.329 3.545-5.162a1.47 1.47 0 0 1 1.445.159c1.608 1.173 2.717 2.95 3.67 4.342A1.504 1.504 0 0 1 10.35 8.7l-1.356 1.357C9.309 10.752 9.95 11.95 11 13s2.248 1.691 2.944 2.006l1.355-1.356a1.5 1.5 0 0 1 1.918-.171c1.42.984 3.088 2.077 4.304 3.634a1.47 1.47 0 0 1 .189 1.485c-.837 1.953-2.955 3.616-5.158 3.535"/>
                  </g>
                </svg>
                (626) 264-2461
              </a>
            </li>
            <ul class="mb-[30px]">
              <li class="mb-2 text-left ">Mon: Closed</li>
              <li class="mb-2 text-left ">Tues - Thurs: 6AM-6PM</li>
              <li class="mb-2 text-left ">Fri - Sat: 6AM-8PM</li>
              <li class="text-left ">Sun: 6AM-4PM</li>
            </ul>
            <li>
              <button class="button-light"> Order Now</button>
            </li>
          </ul>
        </li>

        <li>
          <ul>
            <li class="mb-[30px] mx-0">Home</li>
            <li class="mb-[30px] mx-0">Menu</li>
            <li>Contact</li>
          </ul>
        </li>

        <!-- Updated Social Media li -->
        <li class="mb-[20px] mx-0 text-center">
          Social Media
          <!-- icon container -->
          <div class="mt-4 flex justify-start space-x-4">
            <!-- Paste as many SVGs here as you like -->
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <!-- Icon from MingCute Icon by MingCute Design -->
              <g fill="none">
                <path
                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                <path fill="currentColor"
                      d="M13.5 21.888C18.311 21.164 22 17.013 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.013 3.689 9.165 8.5 9.888V15H9a1.5 1.5 0 0 1 0-3h1.5v-2A3.5 3.5 0 0 1 14 6.5h.5a1.5 1.5 0 0 1 0 3H14a.5.5 0 0 0-.5.5v2H15a1.5 1.5 0 0 1 0 3h-1.5z"/>
              </g>
            </svg>
            <!-- add more icons as needed -->
          </div>
        </li>

      </ul>
    </div>
    <div class="flex justify-center mt-[50px] copyright border-t w-full pt-[50px]">
      <div class="max-w-[1440px] w-full">
        <div> Copyright © Chickpeas. All rights reserved. Designed and built by Austin Law</div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

</script>

<style scoped>
ul li {
  list-style-type: none;
  letter-spacing: 1.8px;
  color: #e6fbcc;
}

.copyright {
  font-weight: 100;
  color: #e6fbcc;
}
</style>
