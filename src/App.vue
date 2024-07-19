<template>
  <Sidebar />
  <div class="main-content-wrapper">
    <TopHeader />
    <main class="main-inner-wrapper">
      <RouterView class="z-[20] relative" />
    </main>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/SideBar.vue'
import TopHeader from '@/components/TopHeader.vue'
</script>
<style scoped></style>
