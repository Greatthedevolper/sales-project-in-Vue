<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import type { Header, Item, ClickRowArgument } from 'vue3-easy-data-table'
import Search from '@/components/SearchComponent.vue'
const props = defineProps<{
  productData?: Record<string, any>[]
}>()
const showRow = (item: ClickRowArgument) => {
  console.log(JSON.stringify(item))
}

const itemsSelected = ref<Item[]>([])
const searchField = ['title']
const searchValue = ref()
const headers: Header[] = [
  // { text: 'Id', value: 'id' },
  { text: 'Title', value: 'title', width: 200 },
  { text: 'Category', value: 'category', sortable: true },
  { text: 'Price', value: 'price' },
  { text: 'Rating', value: 'rating' },
  { text: 'Stock', value: 'stock' },
  { text: 'Picture', value: 'thumbnail' }
]

const items = ref<Item[]>([])

watch(
  () => props.productData,
  (newVal) => {
    if (newVal && Array.isArray(newVal)) {
      items.value = newVal.map((product) => ({
        id: product.id,
        title: product.title,
        category: product.category,
        price: `${product.price}$`,
        rating: product.rating,
        stock: product.stock,
        thumbnail: product.thumbnail
      }))
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex item-center justify-start gap-1 mb-2">
    <Search v-model:searchValue="searchValue" />
  </div>
  <EasyDataTable
    v-model:items-selected="itemsSelected"
    fixed-checkbox
    :checkbox-column-width="40"
    show-index
    fixed-index
    @click-row="showRow"
    :headers="headers"
    :items="items"
    theme-color="#000"
    table-class-name="customize-table"
    header-text-direction="start"
    body-text-direction="start"
    :search-field="searchField"
    :search-value="searchValue"
    :rows-per-page="10"
  >
    <template #item-title="{ title, id }">
      <router-link :to="`/single-product?id=${id}`" class="text-nowrap">{{ title }}</router-link>
    </template>
    <template #item-thumbnail="{ thumbnail }">
      <img
        :src="thumbnail"
        class="border border-[var(--hover-color)] w-[50px] h-[50px] rounded-full"
        alt="Product Image"
      />
    </template>
  </EasyDataTable>
</template>

<style>
.customize-table {
  --easy-table-border: 1px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: var(--hover-color);
  --easy-table-header-background-color: var(--primary-color);

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: var(--primary-text);
  --easy-table-body-row-background-color: var(--primary-color);
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: var(--hover-text);
  --easy-table-body-row-hover-background-color: var(--hover-color);

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: var(--primary-color);
  --easy-table-footer-font-color: var(--primary-text);
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: var(--primary-color);
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: var(--hover-color);
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}

.table-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.vue3-easy-data-table__main {
  max-height: calc(100dvh - 180px);
  height: 100%;

  @media (max-width: 767px) {
    & {
      max-height: calc(100dvh - 215px);
    }
  }
}
</style>
