import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomePage from '../views/pages/HomePage.vue'
import LoginPage from '../views/pages/LoginPage.vue'
import CreationPage from'../views/pages/CreationPage.vue'

const router = createRouter({
  history: import.meta.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes: [
    {
      path: '/homePage',
      name: 'home',
      component: HomePage
    },
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path:'/register',
      name:'register',
      component: CreationPage
    },
    {
      path:'/creatures',
      name:'creatures',
      component: CreaturePage
    },
  ]
})

export default router
