<template>
  <section class="auth-page">

    <div class="auth-box">

      <span class="auth-breadcrumb">
        OPHELIA / ACCOUNT
      </span>


      <template v-if="mode === 'login'">
        <h1>
          Iniciar sesión
        </h1>
        <p class="auth-subtext">
          Accede a tu cuenta para consultar pedidos y guardar tus favoritos.
        </p>
        <form
          class="auth-form"
          @submit.prevent="login"
        >

          <input
            v-model="loginData.email"
            type="email"
            placeholder="Correo electrónico"
          >

          <input
            v-model="loginData.password"
            type="password"
            placeholder="Contraseña"
          >

          <button
            type="submit"
            class="auth-btn"
          >
            INICIAR SESIÓN
          </button>

          <div class="auth-bottom">

            <button
              type="button"
              class="text-link"
              @click="mode = 'register'"
            >
              ¿No tienes cuenta? Crear cuenta
            </button>

          </div>

        </form>

      </template>


      <template v-else>

        <h1>
          Crear cuenta
        </h1>

        <p class="auth-subtext">
          Crea una cuenta para realizar seguimiento de tus pedidos.
        </p>

        <form
          class="auth-form"
          @submit.prevent="register"
        >

          <input
            v-model="registerData.name"
            type="text"
            placeholder="Nombre completo"
          >

          <input
            v-model="registerData.email"
            type="email"
            placeholder="Correo electrónico"
          >

          <input
            v-model="registerData.password"
            type="password"
            placeholder="Contraseña"
          >

          <button
            type="submit"
            class="auth-btn"
          >
            CREAR CUENTA
          </button>

          <div class="auth-bottom">

            <button
              type="button"
              class="text-link"
              @click="mode = 'login'"
            >
              Ya tengo una cuenta.
            </button>
          </div>
        </form>
      </template>
    </div>
  </section>

  <div class="footer-line"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mode = ref('login')

const loginData = ref({
  email: '',
  password: ''
})

const registerData = ref({
  name: '',
  email: '',
  password: ''
})

function login() {
  localStorage.setItem(
    'opheliaUser',
    JSON.stringify(loginData.value)
  )

  router.push('/account')
}

function register() {
  localStorage.setItem(
    'opheliaUser',
    JSON.stringify(registerData.value)
  )

  router.push('/account')
}
</script>