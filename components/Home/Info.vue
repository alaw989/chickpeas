

<template>
  <section class="container mx-auto py-12 px-4">
    <div class="flex flex-row justify-between text-center">
      <!-- LOCATION -->
      <div class="flex flex-1 flex-col">
        <h2 class="uppercase mb-3">Location</h2>
        <p class="">850 Blackburn Dr.</p>
        <p> Mobile, AL 36608</p>
      </div>


      <div class="flex flex-1 flex-col">
        <h2 class="uppercase  mb-3">Hours</h2>
        <p class=" leading-relaxed">
          Brunch: Thursday, Friday &amp; Monday, 9am to 2:00pm<br />
          Saturday &amp; Sunday, 9am to 2:30pm<br />
          Dinner: Thursday &amp; Sunday, 5pm to 9pm<br />
          Friday &amp; Saturday, 5pm to 10pm<br />
          Closed Tuesdays &amp; Wednesdays<br />
          Burger Nights on the 1st &amp; 3rd Monday of each month<br />
          from 5pm to 9pm
        </p>
      </div>

      <div class="flex flex-1 flex-col">
        <h2 class="uppercase  mb-3">Contact</h2>
        <p class=" mb-1">
          <a href="tel:2512642461" class="hover:underline">(626) 264‑2461</a>
        </p>
        <p class="">
          <a href="mailto:" class="underline">
            user@email.com
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// no props or state required here
</script>

<style scoped>
/* if you want to tweak the heading color/weight beyond Tailwind’s defaults */
h2 {
  font-weight: 600;
}

p {
  font-weight: 100;
  margin: 0 0 10px 0;
}
</style>
