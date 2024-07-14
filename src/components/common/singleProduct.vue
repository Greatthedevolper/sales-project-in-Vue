<script setup lang="ts">
import { ref } from 'vue'

// Define a ref for the active product
const activeProduct = ref('')

// Define props with TypeScript
const props = defineProps<{
  productData?: Record<string, any>
}>()
</script>

<template>
  <router-link
    :to="`/single-product?id=${props.productData.id}`"
    v-if="props.productData"
    class="border border-[var(--hover-color)] rounded hover:bg-[var(--hover-color)] text-[var(--hover-color)] hover:text-[var(--hover-text)] flex flex-col justify-center items-center"
  >
    <div class="w-full h-[300px] flex p-4 rounded">
      <img :src="props.productData.thumbnail" class="rounded w-full" />
    </div>
    <div>
      <strong class="line-clamp-1 my-2">{{ props.productData.title }}</strong>
    </div>
  </router-link>
</template>
