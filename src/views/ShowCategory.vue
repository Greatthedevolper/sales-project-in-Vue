<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LoaderCircle from '@/components/common/CircleLoader.vue'
import ProductSingle from '@/components/common/singleProduct.vue'

interface Category {
  id: number
  title: string
  images: string[]
  description: string
  category: string
  products: Array<Record<string, any>>
}

const route = useRoute()
const category = ref<Category | null>(null)

onMounted(() => {
  const categoryName = route.query.category

  fetch(`https://dummyjson.com/products/category/${categoryName}`)
    .then((res) => res.json())
    .then((json) => {
      category.value = json
      console.log(category.value)
    })
})
</script>

<template>
  <div v-bind="$attrs">
    <template v-if="category">
      <h3>{{ route.query.category }}</h3>
      <ul
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5"
      >
        <li v-for="(item, index) in category.products" :key="`category-${index}`">
          <ProductSingle :productData="item"></ProductSingle>
        </li>
      </ul>
    </template>
    <template v-else>
      <LoaderCircle />
    </template>
  </div>
</template>
