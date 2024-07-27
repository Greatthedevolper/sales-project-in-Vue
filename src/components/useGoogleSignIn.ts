// src/composables/useGoogleSignIn.ts
import { ref } from 'vue'
import { auth, googleProvider, signInWithPopup } from '@/firebase-config'
import { useUserAuthStore } from '@/stores/userAuth'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
export function useGoogleSignIn() {
  const user = ref<any>(null)
  const error = ref<string>('')
  const userAuthStore = useUserAuthStore()
  const toast = useToast()
  const router = useRouter()

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()
      userAuthStore.isUserLogin = true
      userAuthStore.UserToken = idToken
      userAuthStore.userDetails = result.user.providerData[0]
      router.push('/')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return { user, error, googleSignIn }
}
