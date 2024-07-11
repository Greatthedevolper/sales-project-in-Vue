<script setup lang="ts">
defineProps<{
  link?: string
  likes?: number
}>()
</script>
<template>
  <router-link :to="link" class="side-bar-link">
    <slot name="icon"></slot>
    <slot name="title"></slot>
    <!-- <slot name="arrowIcon"></slot> -->
  </router-link>
</template>

<style scoped></style>
