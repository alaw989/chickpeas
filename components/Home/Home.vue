<template>
  <div>
    <section class="flex justify-center w-full">
      <div
          class="restaurant-hero relative w-full bg-center bg-cover overflow-hidden"
          style="background-image: url('/img/banner.png')"
          role="img"
          aria-label="Chickpeas Restaurant"
      >
        <div class="relative z-0 overlay w-full h-full bg-black opacity-[.5]"></div>
        <div class="absolute inset-0 flex items-center justify-center z-10 flex-col max-w-[900px] mx-auto px-4 text-center banner-text">
          <h1 class="text-white font-grotesk  text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[5.62rem]">
            A symphony of flavors in every dish
          </h1>
          <p class="font-ptsans font-bold text-white max-w-[70%] sm:text-lg md:text-xl lg:text-2xl ">
            We take great pride in crafting unforgettable dishes, and look forward to creating a memorable moment for you.
          </p>
        </div>
      </div>
    </section>
    <section class="triangle"></section>
    <section class=" text-center">
      <Info></Info>
    </section>

    <section class="py-[100px] text-center flex justify-center bg-[#fff0de]">
      <Menu></Menu>
    </section>

    <section class="text-center">
      <Location></Location>
    </section>
  </div>
</template>

<script setup>
import Info from '~/components/Home/Info.vue'
import Gallery from '~/components/Home/Gallery.vue'
import Location from "~/components/Home/Location.vue";
</script>

<style scoped>

h1 {
  font-style: normal;
  font-weight:900;
  //line-height: 6.37rem;
  margin-bottom: 30px;
  color:#e6fccc;
}
.restaurant-hero {
  position: relative;
  height: calc(100vh - 200px);
}

.restaurant-hero::before,
.restaurant-hero::after {
  content: "";
  position: absolute;
  bottom: -50px;
  width: 100px;
  height: 100px;
  background: #e6fccc;
  z-index: 10;
}

.restaurant-hero::before {
  left: 0;
  border-top-right-radius: 50px;
  width: 50%;
}

.restaurant-hero::after {
  right: 0;
  border-top-left-radius: 50px;
  width: 50%;
}

</style>
