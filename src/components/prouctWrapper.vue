<script setup lang="ts">
import { onMounted, ref } from 'vue'

import TableView from '@/components/VueTable.vue'
import GridView from '@/components/GridView.vue'
import LoaderCircle from '@/components/common/CircleLoader.vue'

const products = ref<any>([])
const isTableView = ref(true)
const currentPage = ref(1)
const limit = 10
const totalProducts = ref(0)
function ChangeView(view: 'table' | 'grid') {
  isTableView.value = view === 'table'
}
function fetchProducts(page = currentPage.value) {
  fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`)
    .then((res) => res.json())
    .then((json) => {
      if (page == 1) {
        products.value = json.products
      } else {
        products.value = [...products.value, ...json.products]
      }
      totalProducts.value = json.total
    })
}
onMounted(() => {
  fetchProducts()
})
function getMoreData() {
  if (products.value.length < totalProducts.value) {
    currentPage.value++
    fetchProducts()
  }
}
</script>

<template>
  <template v-if="products.length === 0">
    <LoaderCircle />
  </template>
  <template v-else>
    <div class="flex items-center gap-2 mb-2 justify-end md:absolute right-4 top-0">
      <button
        class="border-0 rounded px-2 py-1 transition-all"
        :class="{
          'bg-[var(--hover-color)] text-[var(--hover-text)]': isTableView,
          'text-[var(--primary-text)]': !isTableView
        }"
        @click="ChangeView('table')"
      >
        Table View
      </button>
      <button
        class="border-0 rounded px-2 py-1 transition-all"
        :class="{
          'bg-[var(--hover-color)] text-[var(--hover-text)]': !isTableView,
          'text-[var(--primary-text)]': isTableView
        }"
        @click="ChangeView('grid')"
      >
        Grid View
      </button>
    </div>
    <GridView v-if="isTableView" :gridData="products" @scrollTheProducts="getMoreData"></GridView>

    <TableView v-if="!isTableView" :productData="products" />
  </template>
</template>
