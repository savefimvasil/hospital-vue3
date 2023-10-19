import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView/HomeView.vue'),
      meta: {
        auth: true,
        title: 'Dashboard',
        metaTags: [
          {
            name: 'description',
            content: 'A new dashboard'
          }
        ],
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView/LoginView.vue'),
      meta: {
        auth: false,
        title: 'Login',
        metaTags: [
          {
            name: 'Login',
            content: 'Login page'
          }
        ],
      }
    }
  ]
})

router.beforeEach((to, from) => {
  const { isLoggedIn } = useUserStore()

  if (isLoggedIn()) {
    if (!to.meta.auth) {
      return { name: 'home' }
    }
  } else {
    if (to.meta.auth) {
      return { name: 'login' }
    }
  }
  return true
})

export default router
