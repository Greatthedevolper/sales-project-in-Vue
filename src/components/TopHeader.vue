<script setup lang="ts">
import { ref, onMounted, watch, onBeforeMount } from 'vue'
import { auth } from '@/fireBase.config'
import { signOut } from 'firebase/auth'
import { useUserAuthStore } from '@/stores/userAuth'
import { useToast } from 'vue-toastification'
import SearchIcon from '@/components/icons/IconSearch.vue'
import NotificationIcon from '@/components/icons/IconNotificationBell.vue'
import ColorIcon from '@/components/icons/IconColor.vue'
import palleteColor from '@/components/ColorPallete.vue'
const openSearch = ref(true)
const userAuthStore = useUserAuthStore()
const toast = useToast()
const IsColored = ref(false)
import { useRouter } from 'vue-router'
const router = useRouter()

function searchVisible() {
  openSearch.value = true
}
function changeTheme() {
  IsColored.value = true
}
function userLogin() {
  alert('Coming Soon')
}
function getNotification() {
  alert('notification')
}
function searchProducts() {
  alert('dskafhlsdkhfkj')
}
function searchOnScreenSize() {
  if (window.innerWidth < 550) {
    openSearch.value = false
  } else {
    openSearch.value = true
  }
}
async function logoutUser() {
  try {
    const userIsSignouted = await signOut(auth)
    userAuthStore.isUserLogin = false
    userAuthStore.UserToken = null
    toast.success('Logout successfully!')
    router.push('/login')
  } catch (error) {
    toast.success(error)
  }
}
function ClosePallete() {
  IsColored.value = false
}

function changeColor(color: string) {
  userAuthStore.bgColor = color
  document.documentElement.style.setProperty('--chngeable-color', userAuthStore.bgColor)
}
onMounted(() => {
  window.addEventListener('load', () => {
    searchOnScreenSize()
    // changeColor(userAuthStore.bgColor)
  })
  window.addEventListener('orientationchange', searchOnScreenSize)
})
onBeforeMount(() => {
  changeColor(userAuthStore.bgColor)
})
watch(
  () => userAuthStore.bgColor,
  (newValue) => {
    document.documentElement.style.setProperty('--chngeable-color', newValue)
  }
)
</script>
<template>
  <header class="bg-[var(--primary-color)] h-[60px] py-3">
    <div
      class="container-full px-4 flex items-center justify-between h-full border- border-white gap-3"
    >
      <form
        action="#"
        class="max-w-[304px] transition-all"
        :class="{ 'w-[40px]': !openSearch, 'w-full': openSearch }"
      >
        <div
          class="relative flex items-center rounded border border-[var(--primary-text)] focus-within:border-purple-700"
        >
          <span
            role="button"
            @click="searchVisible()"
            class="text-[var(--primary-text)] h-full inline-flex px-2"
          >
            <SearchIcon class="w-[18px]" />
          </span>
          <input
            type="text"
            name=""
            id=""
            class="transition-all h-[32px] bg-transparent text-sm text-[var(--primary-text)] pe-2 focus:outline-0 w-full"
            @input="searchProducts()"
          />
        </div>
      </form>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1" role="button" @click="changeTheme()">
          <span class="text-[var(--primary-text)] w-6 h-6 inline-flex">
            <ColorIcon />
          </span>
          <span class="text-sm text-[var(--primary-text)]">Theme</span>
        </div>
        <span
          role="button"
          class="text-[var(--primary-text)] w-4 h-4 inline-flex"
          @click="getNotification()"
        >
          <NotificationIcon />
        </span>
        <span
          v-if="userAuthStore.isUserLogin"
          role="button"
          @click="logoutUser()"
          class="text-[var(--primary-text)] inline-flex"
        >
          Logout</span
        >
        <router-link v-else to="/login" class="text-[var(--primary-text)] inline-flex">
          Login</router-link
        >
      </div>
    </div>
    <palleteColor v-if="IsColored" @colorSelected="changeColor" @modalClose="ClosePallete" />
  </header>
</template>
