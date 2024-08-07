<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue'
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
const emit = defineEmits(['scrollTheProducts'])
const filteredProducts = computed(() => {
  if (!props.gridData) {
    return []
  }
  return props.gridData.filter((product: Product) =>
    product.title.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})
function scrollProducts(event: Event) {
  const target = event.target as HTMLElement
  const { scrollTop, clientHeight, scrollHeight } = target
  const buffer = 50
  if (scrollTop + clientHeight >= scrollHeight - buffer) {
    console.log('hello')
    emit('scrollTheProducts')
  }
}

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

const debouncedScrollProducts = debounce(scrollProducts, 200)
</script>
<template>
  <div class="flex item-center justify-start gap-1 mb-2">
    <Search v-model:searchValue="searchValue" />
  </div>
  <ul class="grid-product-list" @scroll="debouncedScrollProducts">
    <li v-for="(product, index) in filteredProducts" :key="`product-${index}`">
      <productSingle :productData="product"></productSingle>
    </li>
  </ul>
</template>
