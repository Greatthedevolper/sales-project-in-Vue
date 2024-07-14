import { createRouter, createWebHistory } from 'vue-router'
import { useUserAuthStore } from '@/stores/userAuth'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/product',
      name: 'products',
      component: () => import('../views/productsPage.vue')
    },
    {
      path: '/single-product',
      name: 'single product',
      component: () => import('../views/ShowProduct.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userAuthStore = useUserAuthStore()
  if (userAuthStore.isUserLogin || userAuthStore.UserToken) {
    if (to.name === 'login' || to.name === 'signup') {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    if (to.name !== 'login' && to.name !== 'signup') {
      next({ name: 'login' })
      toast.error('please login first')
    } else {
      next()
    }
  }
})
export default router
