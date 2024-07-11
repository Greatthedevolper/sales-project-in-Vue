<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserAuthStore } from '@/stores/userAuth'
import LoaderCircle from '@/components/CircleLoader.vue'
import { useToast } from 'vue-toastification'
import { auth } from '@/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const toast = useToast()
const userAuthStore = useUserAuthStore()
const router = useRouter()
const userInfo = ref({
  email: '',
  password: ''
})

async function UserLogin() {
  userAuthStore.loader = true
  if (userInfo.value.email === '' || userInfo.value.password === '') {
    userAuthStore.loader = false
    toast.error('Fill all the fields')
  } else {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userInfo.value.email,
        userInfo.value.password
      )
      toast.success('User logged in successfully')
      const idToken = await userCredential.user.getIdToken() // Get the ID token
      console.log(idToken)
      userAuthStore.isUserLogin = true
      userAuthStore.UserToken = idToken // Use the ID token
      router.push('/')
    } catch (error) {
      const errorMessage = (error as Error).message
      toast.error(errorMessage)
    } finally {
      userAuthStore.loader = false
    }
  }
}
</script>

<template>
  <div class="h-full login-wrapper relative flex items-center justify-center">
    <div
      class="relative z-20 flex flex-col gap-2 bg-[var(--hover-color)] p-4 rounded max-w-[340px] w-full"
    >
      <h1 class="main-heading">Login Here</h1>
      <form action="#" class="w-full" @submit.prevent="UserLogin()">
        <div class="form-input-wrapper">
          <label for="" class="form-custom-label">Email</label>
          <input
            type="text"
            class="form-custom-input"
            placeholder="Enter your Email"
            v-model="userInfo.email"
          />
        </div>
        <div class="form-input-wrapper">
          <label for="" class="form-custom-label">password</label>
          <input
            type="password"
            class="form-custom-input"
            placeholder="Enter your Password"
            v-model="userInfo.password"
          />
        </div>
        <div class="flex items-center justify-between flex-wrap gap-2">
          <button type="submit" class="primary-button" :disabled="userAuthStore.loader">
            <span class="button-text">Login</span>
            <span class="h-[20px] w-[20px]" v-if="userAuthStore.loader">
              <LoaderCircle />
            </span>
          </button>
          <div class="flex items-center">
            <p class="me-1 text-[var(--primary-text)]">Have no account?</p>
            <router-link to="/signup" class="underline text-[var(--primary-text)]"
              >Signup</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.login-wrapper {
  /* background-image: url('../components/icons/BgImage.vue'); */
}
</style>
