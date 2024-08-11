import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Review {
  reviewerName: string
  comment: string
  rating: number
  date: string
}

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
  availabilityStatus: string
  reviews: Review[]
  isFavourite?: boolean
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
    function removeProduct(productId: number) {
      addedCartItems.value = addedCartItems.value.filter((item) => item.id !== productId)
    }
    function clearCart() {
      addedCartItems.value = []
    }
    function addToCart(product: Product) {
      const existingProduct = addedCartItems.value.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += product.quantity
      } else {
        addedCartItems.value.push({ ...product, quantity: product.quantity || 1 })
      }
    }
    function favouriteProduct(productId: number) {
      const product = addedCartItems.value.find((item) => item.id === productId)
      if (product) {
        product.isFavourite = !product.isFavourite
      }
    }

    return {
      addedCartItems,
      incrementQuantity,
      decrementQuantity,
      removeProduct,
      clearCart,
      addToCart,
      favouriteProduct
    }
  },
  {
    persist: true
  }
)
