
<template>
  <div>

    <section class="flex justify-center w-full mb-[100px]">
      <div
          class="w-full h-[800px] bg-center bg-cover bg-no-repeat"
          style="background-image: url('/img/chickpeas-restaurant.jpg');"
          role="img"
          aria-label="Chickpeas Restaurant"
      ></div>
    </section>

    <section class="mb-[100px] text-center">
      <Info></Info>

      <p class="mt-2">Dine-in, takeout, and delivery (via DoorDash &amp; UberEats) available</p>

      <a href="#"
         class="order-online block mt-6 text-center bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600">
        Order Online
      </a>

    </section>


  </div>
</template>

<script setup >
import Info from '~/components/Info.vue'
</script>

<style scoped>

.order-online {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.25rem;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

.order-online:hover {
  background-color: #555;
}

section p {
  font-weight: 100;
}
</style>
