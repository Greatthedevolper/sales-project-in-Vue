<script setup lang="ts">
import { ref, onBeforeMount, computed, onMounted } from 'vue'
import { auth } from '@/firebase-config'
import { signOut } from 'firebase/auth'
import { useUserAuthStore } from '@/stores/userAuth'
import { useToast } from 'vue-toastification'
import NotificationIcon from '@/components/icons/IconNotificationBell.vue'
import { Bars3CenterLeftIcon } from '@heroicons/vue/24/solid'
import { SunIcon } from '@heroicons/vue/24/solid'
import { MoonIcon } from '@heroicons/vue/24/solid'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
const userAuthStore = useUserAuthStore()
const toast = useToast()
const theme = computed(() => userAuthStore.theme)
import { useRouter } from 'vue-router'
const router = useRouter()
const profileMenuVisible = ref(false)
const profileMenu = ref<HTMLElement | null>(null)
function getNotification() {
  alert('notification')
}
function showMobileMenu() {
  userAuthStore.mobilemenu = true
}

async function logoutUser() {
  try {
    await signOut(auth)
    userAuthStore.isUserLogin = false
    userAuthStore.UserToken = ''
    userAuthStore.userDetails = null
    toast.success('Logout successfully!')
    router.push('/login')
  } catch (error) {
    toast.success(error)
  }
}

function changeTheme() {
  userAuthStore.theme = userAuthStore.theme === 'light' ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', userAuthStore.theme === 'dark')
  document.documentElement.classList.toggle('light', userAuthStore.theme === 'light')
}
function showOption() {
  profileMenuVisible.value = !profileMenuVisible.value
}
const handleClickOutside = (event: MouseEvent) => {
  if (profileMenu.value) {
    if (!profileMenu.value.contains(event.target as Node)) {
      profileMenuVisible.value = false
    }
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeMount(() => {
  document.documentElement.classList.add(userAuthStore.theme)
})
</script>
<template>
  <header
    class="bg-[var(--primary-color)] h-[60px] py-3 border-b border-[var(--hover-color)]"
    ref="profileMenu"
  >
    <div
      class="container-full px-4 flex items-center justify-between h-full border- border-white gap-3"
    >
      <div>
        <span
          role="button"
          class="md:hidden inline-flex w-[20px] h-[20px] text-[var(--hover-color)]"
          @click="showMobileMenu"
        >
          <Bars3CenterLeftIcon />
        </span>
      </div>
      <div class="flex items-center gap-4">
        <div
          class="flex items-center gap-1 border border-[var(--hover-color)] rounded-full px-2 py-1"
          role="button"
          @click="changeTheme()"
        >
          <span class="text-[var(--hover-color)] w-[16px] h-[16px] inline-flex">
            <MoonIcon v-if="theme === 'light'" />
            <SunIcon v-else />
          </span>
          <span class="text-sm text-[var(--primary-text)] md:block hidden">Theme</span>
        </div>
        <span
          role="button"
          class="text-[var(--hover-color)] w-4 h-4 inline-flex"
          @click="getNotification()"
        >
          <NotificationIcon />
        </span>
        <div v-if="userAuthStore.userDetails !== null">
          <div class="flex items-center gap-1 relative">
            <span class="primary-text flex flex-col items-end">
              <span>Welcome</span>
              <span>{{
                userAuthStore.userDetails?.displayName || userAuthStore.userDetails?.email
              }}</span>
            </span>
            <span class="profile-icon-wrapper" @click="showOption" role="button">
              <img
                v-if="userAuthStore.userDetails?.photoURL"
                class="w-full h-full rounded-[50%]"
                alt=""
                :src="userAuthStore.userDetails.photoURL"
              />
              <UserCircleIcon v-else class="text-[var(--hover-color)]" />
            </span>
            <div class="profile-menu-wrapper" v-if="profileMenuVisible">
              <span
                v-if="userAuthStore.isUserLogin"
                role="button"
                @click="logoutUser()"
                class="text-inherit inline-flex"
              >
                Logout</span
              >
            </div>
          </div>
        </div>

        <router-link v-else to="/login" class="text-[var(--hover-color)] inline-flex">
          Login</router-link
        >
      </div>
    </div>
  </header>
</template>
