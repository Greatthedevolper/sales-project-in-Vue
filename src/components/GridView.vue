<script setup lang="ts">
import { ref, computed } from 'vue'
import productSingle from '@/components/common/singleProduct.vue'
import Search from '@/components/SearchComponent.vue'

interface Product {
  id: number
  title: string
  images: string[]
  description: string
  category: string
}
const props = defineProps<{
  gridData?: Product[]
}>()
const searchValue = ref('')

const filteredProducts = computed(() => {
  if (!props.gridData) {
    return []
  }
  return props.gridData.filter((product: Product) =>
    product.title.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})
</script>
<template>
  <div class="flex item-center justify-start gap-1 mb-2">
    <Search v-model:searchValue="searchValue" />
  </div>
  <ul
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5"
  >
    <li v-for="(product, index) in filteredProducts" :key="`product-${index}`">
      <productSingle :productData="product"></productSingle>
    </li>
  </ul>
</template>
