<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

interface Product {
  id: number
  title: string
  images: string[]
  description: string
  category: string
}
const route = useRoute()
const product = ref<Product | null>(null)
const carouselBreakpoints = {
  700: {
    itemsToShow: 2
  },
  1024: {
    itemsToShow: 4
  }
}
const settings = {
  wrapAround: true,
  autoplay: 3000,
  transition: 500
}

onMounted(() => {
  const productId = route.query.id

  fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((json) => {
      product.value = json
      console.log(product.value)
    })
})
</script>

<template>
  <div class="container-full px-6 pb-4 pt-5 max-w-[96%] mx-auto h-full">
    <div v-if="product">
      <div class="flex items-center justify-between">
        <h3 class="text-center text-lg font-semibold text-[var(--primary-color)]">
          {{ product.title }}
        </h3>
        <div>
          <span
            class="rounded-full text-[var(--hover-text)] bg-[var(--hover-color)] py-2 px-3 capitalize"
            >{{ product.category }}</span
          >
        </div>
      </div>
      <carousel v-bind="settings" :breakpoints="carouselBreakpoints" class="cursor-pointer">
        <slide v-for="(image, index) in product.images" v-bind:key="index">
          <img :src="image" class="h-[300px]" />
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
      <div class="py-4">
        <p class="text-lg text-[var(--primary-text)]">{{ product.description }}</p>
      </div>
    </div>
    <div v-else>loading...</div>
  </div>
</template>
