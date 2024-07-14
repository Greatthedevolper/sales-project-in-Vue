<script setup lang="ts">
import { ref, markRaw, onBeforeMount, onUnmounted } from 'vue'
import customLink from '@/components/common/sidebarLinks.vue'
import HomeIcon from '@/components/icons/IconHome.vue'
import AboutIcon from '@/components/icons/IconAbout.vue'
import MainLogo from '@/components/logos/mainLogo.png'
import MobileLogo from '@/components/logos/mobileLogo.png'
import ToggleIcon from '@/components/icons/IconMenu.vue'

const openSidebar = ref(false)
function toggleSideBar() {
  openSidebar.value = !openSidebar.value
}

function sidebarOnScreenSize() {
  if (window.innerWidth < 1024) {
    openSidebar.value = true
  } else {
    openSidebar.value = false
  }
}
onBeforeMount(() => {
  window.addEventListener('load', sidebarOnScreenSize)
  window.addEventListener('resize', sidebarOnScreenSize)
})
onUnmounted(() => {
  window.removeEventListener('load', sidebarOnScreenSize)
  window.removeEventListener('resize', sidebarOnScreenSize)
})

const mainMenu = ref([
  {
    label: 'Home',
    link: '/',
    icon: markRaw(HomeIcon)
  },
  {
    label: 'About',
    link: '/about',
    icon: markRaw(AboutIcon)
  },
  {
    label: 'Products',
    link: '/product',
    icon: markRaw(AboutIcon)
  },
  {
    label: 'Map',
    link: '/map',
    icon: markRaw(AboutIcon)
  }
])
</script>

<template>
  <aside class="side-bar" :class="{ active: openSidebar }">
    <router-link to="/" class="flex justify-center gap-2 py-2 w-full mb-4">
      <div v-if="!openSidebar" class="image-container">
        <img :src="MainLogo" />
      </div>
      <div v-else class="min-w-[40px] min-h-[40px] rounded-full backdrop-invert">
        <img :src="MobileLogo" />
      </div>
    </router-link>
    <div class="py-2 flex flex-col gap-3">
      <customLink :link="menu.link" v-for="(menu, index) in mainMenu" :key="index" class="p-2">
        <template #icon>
          <component
            :is="menu.icon"
            :class="{ 'w-[20px] h-[20px]': openSidebar, 'w-4 h-4': !openSidebar }"
          />
        </template>

        <template #title v-if="!openSidebar">
          <span class="grow">
            {{ menu.label }}
          </span>
        </template>
      </customLink>
    </div>
    <span
      class="toggle-button hidden md:block"
      type="button"
      @click="toggleSideBar()"
      :class="{ 'rotate-0': openSidebar, 'rotate-180': !openSidebar }"
    >
      <ToggleIcon />
    </span>
  </aside>
</template>

<style scoped></style>
