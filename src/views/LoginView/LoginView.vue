<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import BaseForm from '@/components/base/BaseForm/BaseForm.vue'
import { Auth } from '@/models/auth/Auth'
import { User } from '@/models/auth/User'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const { setUser } = useUserStore()
const router = useRouter()

const loginData = ref<{ username: string, password: string }>({ username: '', password: '' })

const formRef = ref()
const onLogin = async () => {
  try {
    const auth = new Auth()
    const loggedInUser = await auth.login(loginData.value.username, loginData.value.password)

    setUser(loggedInUser as User)
    await router.push('/')
  } catch (e) {
    formRef.value.showError(e)
  }
}
</script>

<template>
  <div class="login">
    <div class="container">
      <h1>This is an login page</h1>
      <base-form
        ref="formRef"
      >
        <base-input
          v-model:input="loginData.username"
          name="login"
          placeholder="enter login"
          :value="loginData.username"
          label="Login"
        />
        <base-input
          v-model:input="loginData.password"
          type="password"
          name="password"
          placeholder="enter password"
          :value="loginData.password"
          label="Password"
        />
      </base-form>
      <base-button
        class="login__submit"
        type="submit"
        @click.prevent="onLogin"
      >
        Login
      </base-button>
    </div>
  </div>
</template>

<style lang="postcss">
.login {
  &__submit {
    @apply mt-3
  }
}
</style>
