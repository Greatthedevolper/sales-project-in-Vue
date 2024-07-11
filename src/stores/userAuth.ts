import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserAuthStore = defineStore(
  'userstore',
  () => {
    const isUserLogin = ref(false)
    const loader = ref(false)
    const UserToken = ref(null)
    const bgColor = ref('#581c87')
    return {
      isUserLogin,
      loader,
      UserToken,
      bgColor
    }
  },
  {
    persist: true
  }
)
