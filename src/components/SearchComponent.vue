<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchIcon from '@/components/icons/IconSearch.vue'

const props = defineProps<{
  initialSearchValue?: string
}>()

const emit = defineEmits(['update:searchValue'])

const searchValue = ref(props.initialSearchValue || '')

function updateSearch() {
  emit('update:searchValue', searchValue.value)
}

const openSearch = ref(true)
function searchVisible() {
  openSearch.value = true
}
function searchOnScreenSize() {
  if (window.innerWidth < 550) {
    openSearch.value = false
  } else {
    openSearch.value = true
  }
}
onMounted(() => {
  window.addEventListener('load', () => {
    searchOnScreenSize()
  })
  window.addEventListener('orientationchange', searchOnScreenSize)
})
</script>

<template>
  <div
    class="max-w-[300px] w-full relative flex items-center rounded border border-[var(--primary-text)] text-[var(--primary-text)] focus-within:border-[var(--hover-color)] focus-within:text-[var(--hover-color)]"
  >
    <span role="button" @click="searchVisible()" class="h-full inline-flex px-2 text-inherit">
      <SearchIcon class="w-[18px]" />
    </span>
    <input
      type="text"
      v-model="searchValue"
      @input="updateSearch"
      class="transition-all h-[32px] bg-transparent text-sm text-[var(--primary-text)] pe-2 focus:outline-0 w-full"
    />
  </div>
</template>
