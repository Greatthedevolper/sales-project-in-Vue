<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useProductStore } from '@/stores/product'
import TableView from '@/components/VueTable.vue'
import GridView from '@/components/GridView.vue'
import LoaderCircle from '@/components/common/CircleLoader.vue'
import ModalFilter from '@/components/FilterModal.vue'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'
const toast = useToast()

const productStore = useProductStore()
const products = ref<any>([])
const isTableView = ref(true)

const isFilterOpened = ref(false)

function ChangeView(view: 'table' | 'grid') {
  isTableView.value = view === 'table'
}

onMounted(() => {
  productStore.fetchAllProducts(productStore.currentPage, checkScroll)
})

function checkScroll() {
  const gridContainer = document.querySelector('.grid-product-list-wrapper')
  if (gridContainer && gridContainer.scrollHeight <= gridContainer.clientHeight) {
    getMoreData()
  }
}

function getMoreData() {
  if (productStore.products.length < productStore.totalProducts) {
    productStore.currentPage++
    productStore.fetchAllProducts(productStore.currentPage, checkScroll)
  } else {
    productStore.currentPage = 1
  }
}

function showFilterModal() {
  isFilterOpened.value = !isFilterOpened.value
}
</script>

<template>
  <div
    v-if="productStore.loading"
    class="absolute w-full h-full flex items-center justify-center bg-[var(--primary-color)] z-[50]"
  >
    <span class="h-12 w-12 text-[var(--hover-color)]">
      <LoaderCircle />
    </span>
  </div>
  <ModalFilter
    v-if="isFilterOpened"
    @closeFilterModal="showFilterModal"
    @fetchAgainAllproducts="productStore.fetchAllProducts(productStore.currentPage, checkScroll)"
  />
  <div class="w-full h-full">
    <div class="flex items-center gap-2 mb-2 justify-end md:absolute right-4 top-0">
      <button
        type="button"
        @click="showFilterModal"
        class="border-0 rounded transition-all h-[25px] w-[25px] text-[var(--hover-color)] me-2"
      >
        <AdjustmentsHorizontalIcon />
      </button>
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
    <GridView
      v-if="isTableView"
      :gridData="productStore.products"
      @scrollTheProducts="getMoreData"
    ></GridView>

    <TableView v-if="!isTableView" :productData="productStore.products" />
  </div>
</template>
