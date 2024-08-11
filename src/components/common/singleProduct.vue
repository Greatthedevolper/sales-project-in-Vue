<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { StarIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconOutline } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'

const cartStore = useCartStore()
const props = defineProps<{
  productData?: Record<string, any>
}>()

const alreadyAdded = computed(() => {
  return cartStore.addedCartItems.some((item) => item.id === props.productData?.id)
})
const isFavourite = computed(() => {
  const product = cartStore.addedCartItems.find((item) => item.id === props.productData?.id)
  return product?.isFavourite ?? false
})
function isAddToCart(product: any) {
  cartStore.addToCart(product)
}
function toggleFavourite(id: number) {
  cartStore.favouriteProduct(id)
}
</script>

<template>
  <div class="relative">
    <router-link
      :to="`/single-product?id=${props.productData.id}`"
      v-if="props.productData"
      class="product-box"
    >
      <div class="w-[80px] h-[80px] flex rounded border border-[var(--hover-color)] flex-shrink-0">
        <img :src="props.productData.thumbnail" class="rounded w-full mix-blend-difference" />
      </div>
      <div class="flex flex-col flex-grow">
        <div class="flex items-center justify-between">
          <strong class="line-clamp-1 w-[calc(100%-24px)] text-[14px]">{{
            props.productData.title
          }}</strong>
        </div>
        <span class="line-clamp-1">{{ props.productData.price }}$</span>
        <div class="flex items-center justify-between">
          <span
            class="w-fit border border-[var(--hover-color)] bg-[var(--hover-color)] text-[var(--hover-text)] rounded px-2 flex items-center gap-1"
          >
            <span class="w-[15px] h-[15px] inline-block"><StarIcon /></span>
            {{ props.productData.rating }}
          </span>
        </div>
      </div>
    </router-link>
    <div
      class="absolute right-0 flex flex-col items-end justify-between top-0 h-full pt-[13px] pr-[5px] pb-[13px] pl-[0px]"
    >
      <span
        class="w-[20px] h-[20px] inline-block text-[var(--hover-color)]"
        @click="toggleFavourite(props.productData?.id)"
        role="button"
      >
        <HeartIconOutline v-if="!isFavourite" />
        <HeartIconSolid v-else />
      </span>
      <span
        role="button"
        @click="isAddToCart(props.productData)"
        class="w-max border border-[var(--hover-color)] bg-[var(--hover-color)] text-[var(--hover-text)] rounded px-2 flex items-center gap-1"
      >
        <span v-if="alreadyAdded"> Added </span>
        <span v-else> Add to cart </span>
      </span>
    </div>
  </div>
</template>
