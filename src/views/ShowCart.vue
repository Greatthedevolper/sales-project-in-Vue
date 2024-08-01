<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function increment(productId: number) {
  cartStore.incrementQuantity(productId)
}

function decrement(productId: number) {
  cartStore.decrementQuantity(productId)
}
</script>

<template>
  <div>
    <ul>
      <li
        v-for="(product, index) in cartStore.addedCartItems"
        :key="index"
        class="text-[var(--hover-color)] flex items-center gap-2 flex-wrap"
      >
        <img :src="product.thumbnail" alt="Product Image" class="w-[120px] h-[120px]" />
        <span>{{ product.title }}</span>
        <span>{{ product.price }}$</span>
        <div class="inline-flex items-center border border-[var(--hover-color)] rounded w-[100px]">
          <span
            @click="increment(product.id)"
            class="w-1/3 border border-[var(--hover-color)] inline-flex items-center justify-center text-[20px]"
            >+</span
          >
          <span
            class="w-1/3 border border-[var(--hover-color)] inline-flex items-center justify-center text-[20px]"
            >{{ product.quantity }}</span
          >
          <span
            @click="decrement(product.id)"
            class="w-1/3 border border-[var(--hover-color)] inline-flex items-center justify-center text-[20px]"
            >-</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
