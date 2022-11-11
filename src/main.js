import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'

import App from './App.vue'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import router from './router'


import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'

import './assets/scss/argon-dashboard.scss'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/scss/main.scss'

import 'vue-toastification/dist/index.css'

const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router)
app.use(Toast)

app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
});