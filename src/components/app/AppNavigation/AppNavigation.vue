<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHospitalStore } from '@/stores/hospital'

const { isLoggedIn, setUser } = useUserStore()
const { clearHospital } = useHospitalStore()
const router = useRouter()

const onLogout = () => {
  setUser(undefined)
  clearHospital()
  router.push('/login')
}

const appNavigationLinks = computed(() => [
  { name: 'Dashboard', path: '/' },
  isLoggedIn() ? { name: 'Logout', path: '', method: onLogout } : { name: 'Login', path: '/login' },
])
</script>

<template>
  <header>
    <nav
      class="app-navigation no-scrollbar"
      data-test="app-navigation"
    >
      <div class="app-navigation__scrollable container">
        <div class="app-navigation__links">
          <div
            v-for="link in appNavigationLinks"
            :key="link.path"
            class="app-navigation__link"
            data-test="app-navigation-link"
          >
            <router-link
              v-if="link.path"
              :to="link.path"
            >
              {{ link.name }}
            </router-link>
            <button
              v-else-if="link.method"
              @click="link.method"
            >
              {{ link.name }}
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="postcss">
.app-navigation {
  @apply flex bg-gray-50 items-center whitespace-nowrap overflow-x-auto border-solid border-0 border-b border-b-gray-300;

  &__scrollable {
    @apply py-3 md:py-3 flex;
  }

  &__links {
    @apply flex -mx-2;
  }
  &__link {
    @apply px-2;
  }
}
</style>
