<template>
  <div class="w-full justify-center flex bg-[#e6fccc] relative">
    <div class="inner-container w-full h-full absolute overflow-hidden pointer-events-none">
      <div
          class="w-full max-w-[400px]  pointer-events-none svg-container absolute image2 left-1/2 transform -translate-x-1/2">
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

      <img
          src="/img/basil.png"
          class="absolute image left-1/2 transform -translate-x-1/2 pointer-events-none"
          alt="chickpeas-plate"/>
    </div>
    <img
        src="/img/mediterranean-plate.png"
        alt="mediterranean-plate"
        class="absolute image2 left-1/2 transform -translate-x-1/2 chickpeas-plate"
    />
    <section class="info-wrapper container mx-auto px-4 md:px-0">
      <div class=" justify-between text-center  info-container">
        <div class="flex flex-2 flex-col text-left text-container lg:max-w-[700px]">
          <div>
            <h2 class="font-grotesk mb-3">The recipe behind our success</h2>
            <p class="">At Chickpeas Mediterranean Grill, Chef Ramona Murr brings her Lebanese heritage and Mobile’s
              warm Southern hospitality together in every dish. From scratch‑made breakfasts of manoushe and eggs
              shawarma to evening platters of beef and chicken shawarma, we use locally sourced, fresh ingredients
              whenever possible—and prepare everything with care and respect for tradition.

            </p><br>
            <p>
               You’ll notice these
              commitments in every bite—and though it means our prices reflect real quality, we hope you feel the value,
              comfort, and genuine love we pour into Chickpeas every day.
            </p>
          </div>

          <a
              href="https://order.online/store/chickpeas-mediterranean-grill-mobile-30404428/?hideModal=true&pickup=true&rwg_token=ACgRB3dN8qHKgMH9oThcl2AJv1VTojTeVKP_OTvx8kLhU7WNqsV0DrYSCzHWsDB1f1zTjFr66KbFvSuY_MIxjz2h4v6MoJ1pEw==&utm_source=gfo"
              target="_blank"
              rel="noopener noreferrer"
              class="button-dark mt-10"
          >
            Order Online
          </a>

        </div>

        <div class="flex flex-col right-container w-full lg:max-w-[500px]">
          <div class=" w-full h-full bg-cover bg-center max-h-[400px] chickpeas-bg rounded-2xl mb-14 shadow-lg"
               style="background-image: url('/img/chickpeas-restaurant.png')"
               role="img"
               aria-label="Delicious plate 1">
          </div>

          <div class="bg-[#fff] rounded-2xl inline-flex flex-col items-center lg:max-w-[500px] shadow-lg">
            <div class="flex flex-col p-14">
              <h6 class="mb-6 text-left leading-9">Visit Us For The Ultimate Mediterranean Dining
                Experience</h6>
              <div class="flex items-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="32" height="32" viewBox="0 0 24 24">
                  <g fill="#e6fbcc" fill-rule="evenodd">
                    <path
                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                    <path fill="#3f6e4d"
                          d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 2a7 7 0 0 0-7 7c0 2.322 1.272 4.36 2.871 5.996a18 18 0 0 0 2.222 1.91l.458.326q.222.155.427.288l.39.25l.343.209l.289.169l.455-.269l.367-.23q.293-.186.627-.417l.458-.326a18 18 0 0 0 2.222-1.91C17.728 15.361 19 13.322 19 11a7 7 0 0 0-7-7m0 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4"/>
                  </g>
                </svg>
                <a
                    href="https://www.google.com/maps/search/?api=1&query=850+Blackburn+Dr,+Mobile,+AL+36608"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline text-left text-xl"
                >
                  850 Blackburn Dr, Mobile, AL 36608
                </a>
              </div>
              <div class="flex items-start">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <g fill="none">
                    <path
                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                    <path fill="#3f6e4d"
                          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1"/>
                  </g>
                </svg>
                <ul>
                  <li class="text-left text-xl sm:mb-2">Mon: Closed</li>
                  <li class="text-left text-xl sm:mb-2">Tues - Thurs: 6AM-6PM</li>
                  <li class="text-left text-xl sm:mb-2">Fri - Sat: 6AM-8PM</li>
                  <li class="text-left text-xl">Sun: 6AM-4PM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <a href="#"></a>
      </div>
    </section>

  </div>

</template>

<script setup lang="ts">

</script>

<style scoped>
/* Section Styling */
section {
  @media (min-width: 768px) {

  }

  @media (min-width: 1400px) {

  }
}

/* Headings */
h2 {
  font-weight: 700;
  margin-bottom: 30px;
}

h6 {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.25rem;
}

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
  position: relative; /* ensure positioning takes effect */
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
  @media (min-width: 1536px) {
    display: block
  }
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: start;
  }
}


.chickpeas-bg {
  display: none;
  @media (min-width: 1024px) {
    height: 400px;
    display: block;
  }
}

.info-wrapper {
  padding-top: 100px;
  padding-bottom: 150px;
  width: 100%;

  @media (min-width: 1536px) {
    padding-bottom: 215px;
  }

  .right-container {

    @media (min-width: 1280px) {


    }

  }

}

.text-container {
  margin-bottom: 50px;
}

.info-container .text-container {
  align-items: center;
  text-align: center;

  @media (min-width: 1024px) {
    text-align: left;
    align-items: start;

  }
}
</style>
