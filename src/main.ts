import '@/assets/tailwind.css'
import '@/assets/main.css'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import App from './App.vue'
import router from './router'

const pinia = createPinia()

pinia.use(piniaPluginPersistedState)

const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable)
app.use(pinia)
app.use(Toast)
app.use(router)

app.mount('#app')
