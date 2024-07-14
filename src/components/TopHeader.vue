<script setup lang="ts">
import { onBeforeMount, computed } from 'vue'
import { auth } from '@/firebase-config'
import { signOut } from 'firebase/auth'
import { useUserAuthStore } from '@/stores/userAuth'
import { useToast } from 'vue-toastification'
import NotificationIcon from '@/components/icons/IconNotificationBell.vue'
import MoonIcon from '@/components/icons/IconMoon.vue'
import SunIcon from '@/components/icons/IconSun.vue'
const userAuthStore = useUserAuthStore()
const toast = useToast()
const theme = computed(() => userAuthStore.theme)
import { useRouter } from 'vue-router'
const router = useRouter()

function getNotification() {
  alert('notification')
}

async function logoutUser() {
  try {
    await signOut(auth)
    userAuthStore.isUserLogin = false
    userAuthStore.UserToken = ''
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

onBeforeMount(() => {
  document.documentElement.classList.add(userAuthStore.theme)
})
</script>
<template>
  <header class="bg-[var(--primary-color)] h-[60px] py-3 border-b border-[var(--hover-color)]">
    <div
      class="container-full px-4 flex items-center justify-between h-full border- border-white gap-3"
    >
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1" role="button" @click="changeTheme()">
          <span class="text-[var(--primary-text)] w-6 h-6 inline-flex">
            <MoonIcon v-if="theme === 'light'" />
            <SunIcon v-else />
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
  </header>
</template>
