<script setup lang="ts">
import { ref } from 'vue'
import LoaderCircle from '@/components/CircleLoader.vue'
import { useToast } from 'vue-toastification'
import { auth } from '@/firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { UserIcon } from '@heroicons/vue/24/solid'
import { EnvelopeIcon } from '@heroicons/vue/24/solid'
import { LockClosedIcon } from '@heroicons/vue/24/solid'
import { EyeIcon } from '@heroicons/vue/24/solid'
import { EyeSlashIcon } from '@heroicons/vue/24/solid'

const loader = ref(false)
const passwordIs = ref(false)
const toast = useToast()
async function UserSignup() {
  loader.value = true
  if (userInfo.value.name === '' || userInfo.value.email === '' || userInfo.value.password === '') {
    loader.value = false
    toast.error('Please fill all fields')
  } else {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userInfo.value.email,
        userInfo.value.password
      )
      toast.success('signup successfully')
      console.log(userCredential.user)
    } catch (error) {
      const errorMessage = (error as Error).message
      toast.error(errorMessage)
    } finally {
      loader.value = false
    }
  }
}

function showPassword() {
  passwordIs.value = !passwordIs.value
}

const userInfo = ref({
  name: '',
  email: '',
  password: ''
})
</script>
<template>
  <div class="h-full signup-wrapper flex items-center justify-center flex-col">
    <div class="form-wrapper">
      <h1 class="main-heading">Register</h1>
      <p class="heading-text">Sign up to get started!</p>
      <form action="#" class="w-full" @submit.prevent="UserSignup()">
        <div class="form-input-wrapper">
          <div class="form-inner-wrapper">
            <label class="form-control-span" for="name">
              <UserIcon />
            </label>
            <input
              type="text"
              class="form-custom-input"
              placeholder="Enter your Name"
              v-model="userInfo.name"
              id="name"
            />
          </div>
        </div>
        <div class="form-input-wrapper">
          <div class="form-inner-wrapper">
            <label class="form-control-span" for="email">
              <EnvelopeIcon />
            </label>

            <input
              type="text"
              class="form-custom-input"
              placeholder="Enter your Email"
              v-model="userInfo.email"
              autocomplete="true"
              id="email"
            />
          </div>
        </div>
        <div class="form-input-wrapper">
          <div class="form-inner-wrapper">
            <label class="form-control-span" for="password">
              <LockClosedIcon />
            </label>
            <input
              :type="passwordIs ? 'text' : 'password'"
              class="form-custom-input"
              placeholder="Enter your Password"
              v-model="userInfo.password"
              autocomplete="true"
              id="password"
            />
            <span class="form-control-span right-span" role="button" @click="showPassword">
              <EyeSlashIcon v-if="passwordIs" />
              <EyeIcon v-else />
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between flex-wrap">
          <button type="submit" class="primary-button" :disabled="loader">
            <span class="button-text">Register</span>
            <span class="h-[20px] w-[20px]" v-if="loader">
              <LoaderCircle />
            </span>
          </button>
          <div class="flex items-center">
            <p class="me-1 primary-text">Already Have account?</p>
            <router-link to="/login" class="underline primary-text">Login</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
