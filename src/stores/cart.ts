import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore(
  'cartstore',
  () => {
    const addedCartItems = ref([])
    return {
      addedCartItems
    }
  },
  {
    persist: true
  }
)
