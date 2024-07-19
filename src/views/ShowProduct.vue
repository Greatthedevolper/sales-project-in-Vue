<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useRouter } from 'vue-router'
import LoaderCircle from '@/components/common/CircleLoader.vue'
import ArrowIcon from '@/components/icons/IconArrow.vue'
import { useCartStore } from '@/stores/cart'
import { format } from 'date-fns'

interface Review {
  reviewerName: string
  comment: string
  rating: number
  date: string
}

interface Product {
  id: number
  title: string
  images: string[]
  description: string
  category: string
  brand: string
  price: string
  stock: string
  rating: string
  availabilityStatus: string
  reviews: Review[]
}

interface CartItem extends Product {
  quantity: number
}

const cartStore = useCartStore()
const StoreItems = ref<CartItem[]>(cartStore.addedCartItems)

const route = useRoute()
const router = useRouter()
const alreadyAdded = ref(false)
const reviewModal = ref(false)
const product = ref<Product | null>(null)
const carouselBreakpoints = {
  700: {
    itemsToShow: 2
  },
  1024: {
    itemsToShow: 4
  },
  1399: {
    itemsToShow: 6
  }
}
const settings = {
  wrapAround: true,
  autoplay: 3000,
  transition: 500
}

function goBack() {
  router.go(-1)
}

function showReviewModal() {
  reviewModal.value = true
}

function closeReviewModal() {
  reviewModal.value = false
}

function addToCart(product: Product) {
  const existingProduct = StoreItems.value.find((item) => item.id === product.id)
  if (existingProduct) {
    alreadyAdded.value = true
    existingProduct.quantity += 1
  } else {
    StoreItems.value.push({ ...product, quantity: 1 })
    alert(' added')
  }
}

onMounted(() => {
  const productId = route.query.id

  fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((json) => {
      product.value = json
      console.log(product.value)
    })
})
</script>

<template>
  <div class="container-full px-2 pb-4 pt-5 max-w-[96%] mx-auto h-full overflow-y-auto">
    <div v-if="product">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center lg:gap-3 gap-2">
          <span role="button" class="text-[var(--hover-color)] w-[20px]" @click="goBack()">
            <ArrowIcon />
          </span>
          <h3 class="text-center span-badge-text">
            {{ product.title }}
          </h3>
        </div>
        <div class="flex gap-1 items-center">
          <span class="span-badge-text">Brand Name:</span>
          <span class="span-badge">{{ product.brand }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[var(--hover-color)] text-lg font-semibold"
            >See More In this Category:</span
          >
          <router-link :to="`/single-category?category=${product.category}`" class="span-badge"
            >{{ product.category }}
          </router-link>
        </div>
      </div>
      <carousel v-bind="settings" :breakpoints="carouselBreakpoints" class="cursor-pointer">
        <slide v-for="(image, index) in product.images" v-bind:key="index">
          <img :src="image" class="h-[300px]" />
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
      <div class="py-4">
        <p class="text-lg text-[var(--primary-text)]">{{ product.description }}</p>
      </div>
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <div class="flex items-center gap-2">
            <span class="span-badge-text">Price:</span>
            <span class="span-badge">{{ product.price }}$ </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="span-badge-text">Stock:</span>
            <span class="span-badge">{{ product.stock }} </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="span-badge-text">Rating:</span>
            <span class="span-badge">{{ product.rating }} </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="span-badge-text">Availability:</span>
            <span class="span-badge">{{ product.availabilityStatus }} </span>
          </div>
        </div>
        <button @click="addToCart(product)" class="span-badge" :disabled="alreadyAdded">
          <span v-if="!alreadyAdded">Add To Cart</span>
          <span v-else>Added</span>
        </button>
        <span role="button" @click="showReviewModal">Show Reviews</span>
      </div>
      <div v-if="reviewModal" class="small-modal">
        <div class="inner-layer" @click="closeReviewModal"></div>
        <div class="small-inner-modal">
          <strong>Product Review</strong>
          <ul>
            <li v-for="(review, index) in product.reviews" :key="index">
              <strong>{{ review.reviewerName }}</strong>
              <span>{{ review.comment }}</span>
              <span>
                <span v-for="i in 5" :key="`${index}-rating-${i}`">
                  <span v-if="i <= review.rating">★</span>
                  <span v-else>☆</span>
                </span>
              </span>
              <span>{{ format(new Date(review.date), 'yyyy-MM-dd HH:mm:ss') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template v-else>
      <LoaderCircle />
    </template>
  </div>
</template>
<style>
.carousel__prev,
.carousel__next {
  border-radius: 50% !important;
  background: var(--hover-color) !important;
  .carousel__icon {
    fill: var(--hover-text);
  }
}
ol {
  &.carousel__pagination {
    .carousel__pagination-item {
      .carousel__pagination-button {
        &:after {
          width: 10px;
          height: 5px;
          border-radius: 5px;
          transition: all 0.2s ease-in-out;
        }
        &.carousel__pagination-button--active {
          &:after {
            width: 15px;
            background-color: var(--hover-color);
          }
        }
      }
    }
  }
}
</style>
