<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import LoaderCircle from '@/components/common/CircleLoader.vue'

const productStore = useProductStore()

const emit = defineEmits(['closeFilterModal', 'fetchAgainAllproducts'])

function closeModal() {
  emit('closeFilterModal')
}
function fetchCategoryProduct(category: string, id: number) {
  productStore.singleCategory(category, id)
  emit('closeFilterModal')
}
function fetchProducts() {
  emit('fetchAgainAllproducts')
}
onMounted(() => {
  productStore.fetchAllCategories()
})
</script>
<template>
  <div
    class="rounded absolute top-0 start-1/2 -translate-x-1/2 bg-[var(--primary-color)] w-[300px] border border-[var(--hover-color)] z-50"
  >
    <div class="w-full bg-[var(--hover-color)] text-[var(--hover-text)] px-2 py-1">
      Select category
    </div>
    <span
      @click="closeModal"
      role="button"
      class="absolute top-[6px] end-2 w-[20px] h-[20px] inline-flex items-center justify-center bg-[var(--hover-text)] border border-[var(--hover-text)] rounded-full"
    >
      <XMarkIcon />
    </span>
    <ul class="grid grid-cols-2 gap-1 p-2">
      <li class="w-full flex-grow">
        <button
          role="button"
          @click="fetchProducts()"
          class="inline-flex items-center gap-1 px-2 py-1 w-full border border-[var(--hover-color)] text-[var(--hover-color)] rounded hover:bg-[var(--hover-color)] hover:text-[var(--hover-text)]"
          :class="{
            'bg-[var(--hover-color)] text-[var(--hover-text)]': productStore.activeCategory === 999
          }"
        >
          <span>All Categories</span>
          <span
            class="w-[15px] h-[15px]"
            v-if="productStore.smallLoading && productStore.activeCategory === 999"
          >
            <LoaderCircle />
          </span>
        </button>
      </li>
      <li v-for="(category, index) in productStore.categories" :key="index" class="w-full">
        <span
          role="button"
          @click="fetchCategoryProduct(category, index)"
          class="inline-flex items-center gap-1 px-2 py-1 w-full border border-[var(--hover-color)] text-[var(--hover-color)] rounded hover:bg-[var(--hover-color)] hover:text-[var(--hover-text)] text-[13px]"
          :class="{
            'bg-[var(--hover-color)] text-[var(--hover-text)]':
              productStore.activeCategory === index
          }"
        >
          <span class="capitalize">{{ category }}</span>
          <span
            class="w-[18px] h-[18px]"
            v-if="productStore.smallLoading && productStore.activeCategory === index"
          >
            <LoaderCircle />
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>
