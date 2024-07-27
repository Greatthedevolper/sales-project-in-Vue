<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserAuthStore } from '@/stores/userAuth'
import LoaderCircle from '@/components/CircleLoader.vue'
import { useToast } from 'vue-toastification'
import { auth } from '@/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useGoogleSignIn } from '@/components/useGoogleSignIn'
import GloogleIcon from '@/components/icons/IconGoogle.vue'
import FacebookIcon from '@/components/icons/IconFacebook.vue'
import GithubIcon from '@/components/icons/IconGithub.vue'
const toast = useToast()
const userAuthStore = useUserAuthStore()
const router = useRouter()
const userInfo = ref({
  email: '',
  password: ''
})
const { googleSignIn } = useGoogleSignIn()
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
      const idToken = await userCredential.user.getIdToken()
      userAuthStore.isUserLogin = true
      userAuthStore.UserToken = idToken
      userAuthStore.userDetails = userCredential.user.providerData[0]
      router.push('/')
    } catch (error) {
      const errorMessage = (error as Error).message
      toast.error(errorMessage)
    } finally {
      userAuthStore.loader = false
    }
  }
}
function facebookSignIn() {
  alert('Coming Soon')
}
function githubSignIn() {
  alert('Coming Soon')
}
</script>

<template>
  <div class="h-full login-wrapper relative flex items-center justify-center">
    <div class="relative z-20 flex flex-col gap-2 p-4 rounded max-w-[340px] w-full">
      <h1 class="main-heading">Hello Again!</h1>
      <p class="heading-text">Welcome Back You've Been Missed</p>
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
            <p class="me-1 primary-text">Have no account?</p>
            <router-link to="/signup" class="underline primary-text">Signup</router-link>
          </div>
        </div>
      </form>

      <div class="mt-5">
        <div class="relative border border-[var(--hover-color)] border-b-0">
          <span
            class="absolute start-1/2 top-[-3px] -translate-x-1/2 -translate-y-1/2 inline-block bg-[var(--primary-color)] p-1 text-[var(--hover-color)]"
            >Continue With</span
          >
        </div>
        <div class="flex items-center justify-center gap-4 mt-5">
          <button
            role="button"
            @click="googleSignIn"
            class="w-[30px] h-[30px] border border-[var(--hover-color)] p-1 rounded-sm text-[var(--hover-color)]"
          >
            <GloogleIcon />
          </button>
          <button
            role="button"
            @click="facebookSignIn"
            class="w-[30px] h-[30px] border border-[var(--hover-color)] p-1 rounded-sm text-[var(--hover-color)]"
          >
            <FacebookIcon />
          </button>
          <button
            role="button"
            @click="githubSignIn"
            class="w-[30px] h-[30px] border border-[var(--hover-color)] p-1 rounded-sm text-[var(--hover-color)]"
          >
            <GithubIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-wrapper {
  /* background-image: url('../components/icons/BgImage.vue'); */
}
</style>
