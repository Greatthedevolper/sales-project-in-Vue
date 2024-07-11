<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  link?: string
  likes?: number
}>()

const link = props.link ?? ''
</script>

<template>
  <router-link :to="link" class="side-bar-link">
    <slot name="icon"></slot>
    <slot name="title"></slot>
    <!-- <slot name="arrowIcon"></slot> -->
  </router-link>
</template>

<style scoped></style>
