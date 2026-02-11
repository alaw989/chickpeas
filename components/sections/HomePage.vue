<template>
  <div>
    <section class="flex justify-center w-full">
      <div class="restaurant-hero relative w-full overflow-hidden">
        <NuxtImg
          src="/img/banner.webp"
          alt="Chickpeas Restaurant"
          class="absolute inset-0 w-full h-full object-cover parallax-image"
          width="1920"
          height="1080"
          loading="eager"
          fetchpriority="high"
          placeholder
          format="webp"
          quality="65"
          sizes="sm:100vw md:100vw lg:100vw"
        />
        <!-- Gradient overlay -->
        <div class="hero-overlay"></div>

        <!-- Content -->
        <div class="absolute inset-0 flex items-center justify-center z-10 flex-col max-w-[1000px] mx-auto px-6 text-center">
          <!-- Eyebrow -->
          <span class="hero-eyebrow">
            Mediterranean Kitchen • Mobile, AL
          </span>

          <!-- Main heading -->
          <h1 class="hero-heading">
            A symphony of flavors in every dish
          </h1>

          <!-- Subheading -->
          <p class="hero-subheading">
            Fresh, authentic Mediterranean cuisine crafted with love and the finest ingredients
          </p>

          <!-- CTA Buttons -->
          <div class="hero-cta">
            <a
                href="https://order.online/store/chickpeas-mediterranean-grill-mobile-30404428/?hideModal=true&pickup=true"
                target="_blank"
                rel="noopener noreferrer"
                class="hero-btn-primary"
            >
              Order Online
            </a>
            <NuxtLink to="/menu" class="hero-btn-secondary">
              View Menu
            </NuxtLink>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Specials section - only renders when specials exist -->
    <Specials v-if="specialsData.length > 0" :specials="specialsData" />

    <section class="triangle"></section>
    <section class="text-center">
      <Info />
    </section>

    <section class="py-[100px] text-center flex justify-center bg-[#fff0de]">
      <Menu :menuData="menuData" :isLoading="isLoading" :loadError="loadError" />
    </section>

    <section class="text-center">
      <Location />
    </section>
  </div>
</template>

<script setup>
const Info = defineAsyncComponent(() => import('~/components/sections/HomeInfo.vue'))
const Location = defineAsyncComponent(() => import('~/components/sections/HomeLocation.vue'))
const Menu = defineAsyncComponent(() => import('~/components/features/menu/Menu.vue'))
const Specials = defineAsyncComponent(() => import('~/components/sections/HomeSpecials.vue'))

defineProps({
  menuData: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  loadError: {
    type: String,
    default: null
  },
  specialsData: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.restaurant-hero {
  position: relative;
  height: calc(100vh - 120px);
  min-height: 600px;
  /* Contain layout shifts */
  contain: layout style paint;
  /* Use content-visibility for better performance */
  content-visibility: auto;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(63, 110, 77, 0.7) 100%
  );
  z-index: 1;
}

.hero-eyebrow {
  display: inline-block;
  font-family: 'PT Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #e6fbcc;
  background: rgba(63, 110, 77, 0.6);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(4px);
}

.hero-heading {
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 8vw, 5rem);
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.hero-subheading {
  font-family: 'PT Sans', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.375rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.hero-btn-primary {
  display: inline-block;
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem 2rem;
  background: #e6fbcc;
  color: #3f6e4d;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.hero-btn-primary:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
}

.hero-btn-secondary {
  display: inline-block;
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem 2rem;
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.hero-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
  transform: translateY(-2px);
}

.scroll-indicator {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: rgba(255, 255, 255, 0.7);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
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

/* Parallax effect - desktop only, CSS scroll-driven animation */
@media (min-width: 1024px) {
  @supports (animation-timeline: scroll()) {
    .parallax-image {
      animation: parallax-scroll linear;
      animation-timeline: scroll();
      animation-range: 0vh 100vh;
    }
  }
}

@keyframes parallax-scroll {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(30%);
  }
}
</style>
