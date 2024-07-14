<template>
  <Sidebar />
  <div class="main-content-wrapper">
    <TopHeader />
    <main class="main-inner-wrapper">
      <RouterView class="z-[20] relative" />
      <!-- <span class="absolute top-0 start-0 w-full h-full z-[1]">
        <ImageBg />
      </span> -->
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(var(--primary-color),0.7)" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.2)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="var(--primary-color)" />
        </g>
      </svg>
    </main>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/SideBar.vue'
import TopHeader from '@/components/TopHeader.vue'

import ImageBg from '@/components/icons/BgImage.vue'
</script>
<style scoped>
.main-inner-wrapper {
  position: relative;
  /* background: linear-gradient(60deg, var(--primary-color) 0%, var(--hover-color) 100%); */

  .waves {
    position: absolute;
    width: 100%;
    height: 100dvh;
    margin-bottom: -7px;
    min-height: 100px;
    max-height: 250px;
    bottom: 0;

    @media (max-width: 768px) {
      & {
        height: 40px;
        min-height: 40px;
      }
    }
  }
}
.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>
