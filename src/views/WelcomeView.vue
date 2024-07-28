<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import SearchImage from '@/components/images/SearchProductImage.svg'
import OrderImage from '@/components/images/orderYourProduct.svg'
import DeliverImage from '@/components/images/getDelivered.svg'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

interface CarouselInstance {
  next: () => void
  prev: () => void
}

const carousel = ref<CarouselInstance | null>(null)
const currentSlide = ref(0)
const router = useRouter()

function next() {
  if (carousel.value) {
    if (currentSlide.value == 2) {
      router.push('/login')
    } else {
      carousel.value.next()
    }
  }
}

function prev() {
  if (carousel.value) {
    carousel.value.prev()
  }
}

const welcomeArray = ref([
  {
    image: SearchImage,
    title: 'Search Your Products',
    description:
      'Lorem ipsum dolor sit amet. Et asperiores neque rem quisquam voluptatum eos quia omnis ex reiciendis voluptates'
  },
  {
    image: OrderImage,
    title: 'Order Your Products',
    description:
      'Lorem ipsum dolor sit amet. Et asperiores neque rem quisquam voluptatum eos quia omnis ex reiciendis voluptates'
  },
  {
    image: DeliverImage,
    title: 'Get Delivered',
    description:
      'Lorem ipsum dolor sit amet. Et asperiores neque rem quisquam voluptatum eos quia omnis ex reiciendis voluptates'
  }
])
</script>

<template>
  <div class="h-full">
    <div class="h-[calc(100%-140px)]">
      <Carousel ref="carousel" v-model="currentSlide">
        <Slide v-for="slide in welcomeArray" :key="slide.title">
          <div class="carousel__item w-full max-w-[320px] flex item-center justify-center flex-col">
            <div>
              <img :src="slide.image" />
            </div>
            <div class="flex flex-col mt-4 items-center justify-center">
              <span class="text-[var(--hover-color)] text-[20px] font-semibold">
                {{ slide.title }}
              </span>
              <span class="text-[8px]">{{ slide.description }}</span>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>

    <div class="mt-[40px] flex items-center justify-center gap-2">
      <button
        @click="prev"
        v-if="currentSlide !== 0"
        class="w-[50px] h-[50px] bg-[var(--hover-color)] flex items-center justify-center text-[var(--hover-text)] p-2 rounded-l-[20px] rounded-r-[5px]"
      >
        <ArrowLeftIcon class="size-6" />
      </button>
      <button
        @click="next"
        class="w-[50px] h-[50px] bg-[var(--hover-color)] flex items-center justify-center text-[var(--hover-text)] p-2 rounded-r-[20px] rounded-l-[5px]"
      >
        <ArrowRightIcon class="size-6" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.carousel {
  height: 100%;
  .carousel__viewport {
    height: 100%;
    .carousel__track {
      height: 100%;
      .carousel__slide {
        height: 100%;
        .carousel__item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
      }
    }
  }
  .carousel__pagination {
    .carousel__pagination-item {
      border: 1px solid var(--hover-color);
      &:not(:last-of-type) {
        border-right: unset;
      }
      &:not(:first-of-type) {
        border-left: unset;
      }
      .carousel__pagination-button {
        background: transparent;
        width: 50px;
        height: 7px;
        position: relative;
        &:after {
          background: transparent;
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        &.carousel__pagination-button--active {
          &:after {
            background: var(--hover-color);
          }
        }
      }
    }
  }
}
</style>
