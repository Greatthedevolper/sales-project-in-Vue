<script setup lang="ts">
import { ref } from 'vue'
import LoaderCircle from '@/components/CircleLoader.vue'
import { useToast } from 'vue-toastification'
import { auth } from '@/firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
const loader = ref(false)
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

const userInfo = ref({
  name: '',
  email: '',
  password: ''
})
</script>
<template>
  <div class="h-full signup-wrapper flex items-center justify-center">
    <div
      class="relative z-20 flex flex-col gap-2 bg-[var(--hover-color)] p-4 rounded max-w-[340px] w-full"
    >
      <h1 class="main-heading">Sign up Here</h1>
      <form action="#" class="w-full" @submit.prevent="UserSignup()">
        <div class="form-input-wrapper">
          <label for="" class="form-custom-label">Name</label>
          <input
            type="text"
            class="form-custom-input"
            placeholder="Enter your Name"
            v-model="userInfo.name"
          />
        </div>
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
          <button type="submit" class="primary-button" :disabled="loader">
            <span class="button-text">Sign Up</span>
            <span class="h-[20px] w-[20px]" v-if="loader">
              <LoaderCircle />
            </span>
          </button>
          <div class="flex items-center">
            <p class="me-1 text-[var(--primary-text)]">Already Have account?</p>
            <router-link to="/login" class="underline text-[var(--primary-text)]"
              >Login</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
