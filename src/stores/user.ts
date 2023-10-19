import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { User } from '@/models/auth/User'

export const useUserStore = defineStore('userStore', () => {
  const user: Ref<User | undefined> = ref(undefined)

  const isLoggedIn = (): boolean => {
    return !!user.value
  }
  const getUser = () => {
    return user.value
  }

  const setUser = (userData: User | undefined) => {
    user.value = userData
    // primitive staff for save session, normally we need token and put it to cookies
    localStorage.setItem('user', user.value ? JSON.stringify(user.value) : '')
  }

  return {
    getUser,
    setUser,
    isLoggedIn
  }
})
