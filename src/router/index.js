import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomePage from '../views/pages/HomePage.vue'
import LoginPage from '../views/pages/LoginPage.vue'
import CreationPage from '../views/pages/CreationPage.vue'
import CreaturePage from '../views/pages/CreaturePage.vue'
import ElementPage from '../views/pages/ElementPage.vue'

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
      path:'/CreationPage',
      name:'CreationPage',
      component: CreationPage
    },
    {
      path: '/creatures',
      name: 'creatures',
      component: CreaturePage
    },
    {
      path: '/elements',
      name: 'elements',
      component: ElementPage
    }
  ]
})

export default router
