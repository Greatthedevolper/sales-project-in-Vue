import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
  images: string[]
  description: string
  category: string
  brand: string
  stock: number
  rating: number
}

export const useCartStore = defineStore(
  'cartstore',
  () => {
    const addedCartItems = ref<Product[]>([])

    function incrementQuantity(productId: number) {
      const product = addedCartItems.value.find((item) => item.id === productId)
      if (product) {
        product.quantity++
      }
    }

    function decrementQuantity(productId: number) {
      const product = addedCartItems.value.find((item) => item.id === productId)
      if (product && product.quantity > 1) {
        product.quantity--
      }
    }

    return {
      addedCartItems,
      incrementQuantity,
      decrementQuantity
    }
  },
  {
    persist: true
  }
)
