import { useUserStore } from '@/stores/user'

export const authMiddleware = (to: any, from: any, next: any) => {
  const { isLoggedIn } = useUserStore()

  if (isLoggedIn()) next('/')
  else next('/login')
};
