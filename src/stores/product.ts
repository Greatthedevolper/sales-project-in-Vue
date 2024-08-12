import { ref, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
const toast = useToast()
const smallLoading = ref(false)
const categaryLoader = ref(false)
const activeCategory = ref<Number | null>(null)

const loading = ref(true)
const currentPage = ref(1)
const limit = 10
const totalProducts = ref(0)

const products = ref<any[]>([])
const categories = ref<string[] | null>(null)
export const useProductStore = defineStore(
  'productStore',
  () => {
    function singleCategory(category: any, id: number) {
      smallLoading.value = true
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
            smallLoading.value = false
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

    function fetchAllProducts(page = currentPage.value, checkScroll?: () => void) {
      activeCategory.value = 999
      smallLoading.value = true
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
            if (checkScroll) checkScroll()
          })
        })
        .catch((error) => {
          toast.error('Network error', error)
        })
        .finally(() => {
          loading.value = false
          setTimeout(() => {
            smallLoading.value = false
          }, 1000)
        })
    }
    return {
      products,
      categories,
      singleCategory,
      fetchAllCategories,
      smallLoading,
      activeCategory,
      fetchAllProducts,
      currentPage,
      totalProducts,
      loading
    }
  },
  {
    persist: {
      paths: ['products', 'categories']
    }
  }
)
