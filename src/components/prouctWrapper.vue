<script setup lang="ts">
import { onMounted, ref } from 'vue'
import productSingle from '@/components/common/singleProduct.vue'
import TableView from '@/components/VueTable.vue'
import LoaderCircle from '@/components/common/CircleLoader.vue'

const products = ref([])

onMounted(() => {
  fetch('https://dummyjson.com/products?limit=0')
    .then((res) => res.json())
    .then((json) => {
      products.value = json.products
      console.log(products.value[0])
    })
})
</script>

<template>
  <template v-if="products.length === 0">
    <LoaderCircle />
  </template>
  <template v-else>
    <ul
      v-if="$route.name == 'products'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5"
    >
      <li v-for="(product, index) in products" :key="`product-${index}`">
        <productSingle :productData="product"></productSingle>
      </li>
    </ul>
    <TableView v-if="$route.name == 'about'" :productData="products" />
  </template>
</template>
