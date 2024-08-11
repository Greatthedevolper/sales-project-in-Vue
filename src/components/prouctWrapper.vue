<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import TableView from '@/components/VueTable.vue'
import GridView from '@/components/GridView.vue'
import LoaderCircle from '@/components/common/CircleLoader.vue'
const toast = useToast()
const loding = ref(true)
const smallLoding = ref(false)
const categaryLoader = ref(false)
const products = ref<any>([])
const categories = ref(null)
const isTableView = ref(true)
const currentPage = ref(1)
const limit = 10
const totalProducts = ref(0)
const activeCategory = ref<number | null>(null)

function ChangeView(view: 'table' | 'grid') {
  isTableView.value = view === 'table'
}
function fetchProducts(page = currentPage.value) {
  activeCategory.value = 999
  smallLoding.value = true
  fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`)
    .then((res) => res.json())
    .then((json) => {
      if (page == 1) {
        products.value = json.products
      } else {
        products.value = [...products.value, ...json.products]
      }
      totalProducts.value = json.total

      nextTick(() => {
        checkScroll()
      })
    })
    .catch((error) => {
      toast.error('Network error', error)
    })
    .finally(() => {
      loding.value = false
      setTimeout(() => {
        smallLoding.value = false
      }, 1000)
    })
}
function fetchAllCategories() {
  categaryLoader.value = true
  fetch('https://dummyjson.com/products/category-list')
    .then((res) => res.json())
    .then((json) => {
      categories.value = json
    })
    .catch((error) => {
      toast.error('Network error', error)
    })
    .finally(() => {
      categaryLoader.value = false
    })
}
function fetchCategoryProduct(category: any, id: number) {
  smallLoding.value = true
  activeCategory.value = id
  fetch(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json())
    .then((json) => {
      products.value = json.products
    })
    .catch((error) => {
      toast.error('Network error', error)
    })
    .finally(() => {
      setTimeout(() => {
        smallLoding.value = false
      }, 1000)
    })
}
onMounted(() => {
  fetchProducts()
  fetchAllCategories()
})

function checkScroll() {
  const gridContainer = document.querySelector('.grid-product-list-wrapper')
  if (gridContainer && gridContainer.scrollHeight <= gridContainer.clientHeight) {
    getMoreData()
  }
}
function getMoreData() {
  if (products.value.length < totalProducts.value) {
    currentPage.value++
    fetchProducts()
  }
}
</script>

<template>
  <div
    v-if="loding"
    class="absolute w-full h-full flex items-center justify-center bg-[var(--primary-color)] z-[50]"
  >
    <span class="h-12 w-12 text-[var(--hover-color)]">
      <LoaderCircle />
    </span>
  </div>
  <div class="w-full h-full">
    <div class="px-4">
      <ul class="flex items-center gap-1 flex-wrap">
        <li class="w-max">
          <button
            role="button"
            @click="fetchProducts(currentPage)"
            class="inline-flex items-center gap-1 px-2 py-1 w-max border border-[var(--hover-color)] text-[var(--hover-color)] rounded hover:bg-[var(--hover-color)] hover:text-[var(--hover-text)]"
            :class="{
              'bg-[var(--hover-color)] text-[var(--hover-text)]': activeCategory === 999
            }"
          >
            <span>All Categories</span>
            <span class="w-[15px] h-[15px]" v-if="smallLoding && activeCategory === 999">
              <LoaderCircle />
            </span>
          </button>
        </li>
        <li v-for="(category, index) in categories" :key="index" class="w-max">
          <span
            role="button"
            @click="fetchCategoryProduct(category, index)"
            class="inline-flex items-center gap-1 px-2 py-1 w-max border border-[var(--hover-color)] text-[var(--hover-color)] rounded hover:bg-[var(--hover-color)] hover:text-[var(--hover-text)]"
            :class="{
              'bg-[var(--hover-color)] text-[var(--hover-text)]': activeCategory === index
            }"
          >
            <span class="capitalize">{{ category }}</span>
            <span class="w-[15px] h-[15px]" v-if="smallLoding && activeCategory === index">
              <LoaderCircle />
            </span>
          </span>
        </li>
      </ul>
    </div>
    <div class="flex items-center gap-2 mb-2 justify-end md:absolute right-4 top-0">
      <button
        class="border-0 rounded px-2 py-1 transition-all"
        :class="{
          'bg-[var(--hover-color)] text-[var(--hover-text)]': isTableView,
          'text-[var(--primary-text)]': !isTableView
        }"
        @click="ChangeView('table')"
      >
        Grid View
      </button>
      <button
        class="border-0 rounded px-2 py-1 transition-all"
        :class="{
          'bg-[var(--hover-color)] text-[var(--hover-text)]': !isTableView,
          'text-[var(--primary-text)]': isTableView
        }"
        @click="ChangeView('grid')"
      >
        Table View
      </button>
    </div>
    <GridView v-if="isTableView" :gridData="products" @scrollTheProducts="getMoreData"></GridView>

    <TableView v-if="!isTableView" :productData="products" />
  </div>
</template>
