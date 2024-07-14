import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserAuthStore = defineStore(
  'userstore',
  () => {
    const isUserLogin = ref(false)
    const loader = ref(false)
    const UserToken = ref('')
    const theme = ref('light')
    return {
      isUserLogin,
      loader,
      UserToken,
      theme
    }
  },
  {
    persist: true
  }
)
