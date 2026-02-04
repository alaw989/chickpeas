<template>
  <div class="w-full justify-center flex bg-[#e6fccc] relative">
    <div class="inner-container w-full h-full absolute overflow-hidden pointer-events-none">
      <div
          class="w-full max-w-[400px] pointer-events-none svg-container absolute image2 left-[35%] transform -translate-x-1/2">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="absolute fork left-1/2 transform -translate-x-1/2 pointer-events-none" width="62" height="62"
             viewBox="0 0 24 24">
          <g fill="#e6fbcc" fill-rule="evenodd">
            <path
                d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/>
            <path fill="#3f6e4d"
                  d="M21.1 17.032a1 1 0 0 1-1.404-.176l-2.494-3.206a2.53 2.53 0 0 0-2.84-.834l.507.639l4.202 4.202a1 1 0 0 1-1.414 1.414l-4.202-4.202l-.64-.507a2.53 2.53 0 0 0 .835 2.84l3.207 2.494a1 1 0 0 1-1.228 1.578l-3.207-2.494a4.534 4.534 0 0 1-1.223-5.7L4.422 7.705a2.337 2.337 0 1 1 3.283-3.283l5.375 6.777a4.534 4.534 0 0 1 5.7 1.223l2.495 3.207a1 1 0 0 1-.176 1.403Z"/>
          </g>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg"
             class="absolute bubble left-1/2 transform -translate-x-1/2 pointer-events-none" width="40" height="40"
             viewBox="0 0 24 24">
          <g fill="none" fill-rule="evenodd">
            <path
                d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/>
            <path fill="#3f6e4d"
                  d="M16 15a3 3 0 1 1 0 6a3 3 0 0 1 0-6m-9-4a4 4 0 1 1 0 8a4 4 0 0 1 0-8m9 6a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-9-4a2 2 0 1 0 0 4a2 2 0 0 0 0-4m9-10a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6"/>
          </g>
        </svg>
      </div>

      <NuxtImg
          src="/img/basil.webp"
          class="absolute image left-[35%] transform -translate-x-1/2 pointer-events-none"
          alt="chickpeas-plate"
          width="800"
          height="800"
          loading="lazy"
          format="webp"
          quality="70"
      />
    </div>
    <NuxtImg
        src="/img/mediterranean-plate.webp"
        alt="mediterranean-plate"
        class="absolute image2 left-[35%] transform -translate-x-1/2 chickpeas-plate"
        width="400"
        height="400"
        loading="lazy"
        format="webp"
        quality="70"
    />
    <section class="info-wrapper w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
      <div class="info-container flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-12">
        <div class="bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full lg:w-1/2 text-left">
          <p class="font-grotesk font-bold text-primary-500 text-sm uppercase tracking-wider mb-2">Our Story</p>
          <h2 class="heading-lg mb-6">The recipe behind our success</h2>

          <div class="space-y-4 mb-8">
            <p class="font-ptsans text-base md:text-lg leading-relaxed">
              At Chickpeas Mediterranean Grill, Chef Ramona Murr brings her Lebanese heritage and Mobile's
              warm Southern hospitality together in every dish. From scratch‑made breakfasts of manoushe and eggs
              shawarma to evening platters of beef and chicken shawarma, we use locally sourced, fresh ingredients
              whenever possible—and prepare everything with care and respect for tradition.
            </p>
            <p class="font-ptsans text-base md:text-lg leading-relaxed">
              You'll notice these commitments in every bite—and though it means our prices reflect real quality,
              we hope you feel the value, comfort, and genuine love we pour into Chickpeas every day.
            </p>
          </div>

          <a
              href="https://order.online/store/chickpeas-mediterranean-grill-mobile-30404428/?hideModal=true&pickup=true&rwg_token=ACgRB3dN8qHKgMH9oThcl2AJv1VTojTeVKP_OTvx8kLhU7WNqsV0DrYSCzHWsDB1f1zTjFr66KbFvSuY_MIxjz2h4v6MoJ1pEw==&utm_source=gfo"
              target="_blank"
              rel="noopener noreferrer"
              class="button-dark"
          >
            Order Online
          </a>
        </div>

        <div class="flex flex-col right-container w-full lg:w-1/2">
          <div class="w-full max-h-[400px] chickpeas-bg rounded-2xl mb-14 shadow-lg overflow-hidden">
            <NuxtImg
              src="/img/chickpeas-restaurant.webp"
              alt="Delicious plate 1"
              class="w-full h-full object-cover"
              width="800"
              height="400"
              loading="lazy"
              format="webp"
              quality="70"
            />
          </div>

          <div class="bg-white rounded-2xl w-full shadow-lg p-8 md:p-10">
            <h3 class="font-grotesk font-bold text-xl md:text-2xl text-center mb-8 leading-tight">
              Visit Us For The Ultimate Mediterranean Dining Experience
            </h3>

            <!-- Location -->
            <div class="mb-6">
              <p class="font-grotesk font-bold text-primary-500 text-sm uppercase tracking-wider mb-2">Location</p>
              <a
                  href="https://www.google.com/maps/search/?api=1&query=850+Blackburn+Dr,+Mobile,+AL+36608"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-ptsans text-lg hover:underline"
              >
                850 Blackburn Dr, Mobile, AL 36608
              </a>
            </div>

            <!-- Hours -->
            <div class="mb-8">
              <p class="font-grotesk font-bold text-primary-500 text-sm uppercase tracking-wider mb-2">Hours</p>
              <ul class="font-ptsans text-base space-y-1">
                <li class="flex justify-between"><span>Monday</span><span>Closed</span></li>
                <li class="flex justify-between"><span>Tue – Thu</span><span>6AM – 6PM</span></li>
                <li class="flex justify-between"><span>Fri – Sat</span><span>6AM – 8PM</span></li>
                <li class="flex justify-between"><span>Sunday</span><span>6AM – 4PM</span></li>
              </ul>
            </div>

            <!-- CTA -->
            <a
                href="https://www.google.com/maps/dir/?api=1&destination=850+Blackburn+Dr,+Mobile,+AL+36608"
                target="_blank"
                rel="noopener noreferrer"
                class="button-light w-full text-center"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Image Styling */
.image,
.image2 {
  opacity: 1;
}

.image {
  width: 800px;
  bottom: -300px;
}

.image2 {
  width: 400px;
  bottom: -115px;
}

/* Positioned Elements */
.fork,
.bubble {
  position: relative;
}

.fork {
  left: 365px;
  bottom: 405px;
  transform: rotate(85deg);
}

.bubble {
  left: -40px;
  bottom: 145px;
}

/* Containers */
.inner-container,
.chickpeas-plate {
  display: none;
}

@media (min-width: 1536px) {
  .inner-container,
  .chickpeas-plate {
    display: block;
  }
}


.chickpeas-bg {
  display: block;
}

@media (min-width: 1024px) {
  .chickpeas-bg {
    height: 400px;
  }
}

.info-wrapper {
  padding-top: 100px;
  padding-bottom: 150px;
  width: 100%;
}

@media (min-width: 1536px) {
  .info-wrapper {
    padding-bottom: 215px;
  }
}

</style>
