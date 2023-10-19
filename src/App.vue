<template>
  <app-navigation />
  <main class="main">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavigation from '@/components/app/AppNavigation/AppNavigation.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const { setUser } = useUserStore()

onMounted(() => {
  let user = localStorage.getItem('user')

  if (user) {
    setUser(JSON.parse(user))
  }
})
</script>

<style scoped lang="postcss">
.main {
  @apply my-4;
}
</style>
