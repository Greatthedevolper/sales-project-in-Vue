import { ref } from 'vue'
import { defineStore } from 'pinia'

interface UserDetails {
  displayName: string | null
  email: string | null
  photoURL: string | null
  uid: string
}

export const useUserAuthStore = defineStore(
  'userstore',
  () => {
    const isUserLogin = ref(false)
    const loader = ref(false)
    const UserToken = ref('')
    const theme = ref('light')
    const userDetails = ref<UserDetails | null>(null)
    const mobilemenu = ref(false)
    const profileMenuVisible = ref(false)

    return {
      isUserLogin,
      loader,
      UserToken,
      theme,
      userDetails,
      mobilemenu,
      profileMenuVisible
    }
  },
  {
    persist: {
      paths: ['isUserLogin', 'loader', 'UserToken', 'theme', 'userDetails']
    }
  }
)
