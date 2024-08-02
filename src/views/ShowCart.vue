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
  <div class="p-3">
    <h1 class="main-heading">Product in your Cart</h1>
    <ul class="">
      <li class="grid grid-cols-5 text-[var(--hover-color)] my-3">
        <span class="text-center inline-block">Image</span>
        <span class="text-center inline-block">Name</span>
        <span class="text-center inline-block">Price</span>
        <span class="text-center inline-block">Add More</span>
        <span class="text-center inline-block">Payment</span>
      </li>
      <teemplate v-if="cartStore.addedCartItems.length > 0">
        <li
          v-for="(product, index) in cartStore.addedCartItems"
          :key="index"
          class="text-[var(--hover-color)] grid grid-cols-5 items-center mb-4"
        >
          <template v-if="product.id">
            <div class="w-full flex items-center justify-center">
              <div
                class="w-[80px] h-[80px] border border-[var(--hover-color)] rounded-full p-1 mx-uato"
              >
                <img :src="product.thumbnail" alt="Product Image" class="w-full h-full" />
              </div>
            </div>
            <router-link
              :to="`/single-product?id=${product.id}`"
              class="text-center inline-block"
              >{{ product.title }}</router-link
            >
            <span class="text-center inline-block">{{ product.price }}$</span>
            <div class="flex items-center justify-center">
              <div
                class="inline-flex items-center border border-[var(--hover-color)] rounded w-[100px]"
              >
                <span
                  role="button"
                  @click="increment(product.id)"
                  class="inline-flex items-center justify-center text-[20px] w-[33px] h-[33px]"
                  >+</span
                >
                <span
                  class="border border-x-[var(--hover-color)] border-y-0 inline-flex items-center justify-center text-[20px] w-[33px] h-[33px]"
                  >{{ product.quantity }}</span
                >
                <span
                  role="button"
                  @click="decrement(product.id)"
                  class="inline-flex items-center justify-center text-[20px] w-[33px] h-[33px]"
                  >-</span
                >
              </div>
            </div>
            <span class="text-center inline-block">{{ product.price * product.quantity }}$</span>
          </template>
        </li>
      </teemplate>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
