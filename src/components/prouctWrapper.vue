<script setup lang="ts">
import { onMounted, ref } from 'vue'
import productSingle from '@/components/common/singleProduct.vue'

const products = ref([])

onMounted(() => {
  fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((json) => {
      products.value = json.products
      console.log(products.value)
    })
})
</script>

<template>
  <ul
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5"
  >
    <li v-for="(product, index) in products" :key="`product-${index}`">
      <productSingle :productData="product"></productSingle>
    </li>
  </ul>
</template>
