<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToOrders() {
  router.push('/tracking')
}

function logout() {
  localStorage.removeItem('opheliaUser')
  router.push('/auth')
}
</script>

<template>
  <section class="account-page">

    <div class="mujer-header">
      <span>
        OPHELIA / MI CUENTA
      </span>

      <h2>
        ¡Hola!
      </h2>
    </div>

    <div class="account-grid">

      <div class="account-card">

        <span class="account-label">
          PEDIDOS
        </span>

        <h3>
          Seguimiento de pedidos
        </h3>

        <p>
          Consulta el estado y seguimiento
          de tus compras recientes.
        </p>

        <button @click="goToOrders">
        VER PEDIDOS
        </button>

      </div>

      <div class="account-card">

        <span class="account-label">
          DIRECCIONES
        </span>

        <h3>
          Tus direcciones
        </h3>

        <p>
          Administra tus direcciones
          de envío y facturación.
        </p>

        <button @click="router.push('/account/addresses')">EDITAR</button>

      </div>

      <div class="account-card">

        <span class="account-label">
          SESIÓN
        </span>

        <h3>
          Cerrar sesión
        </h3>

        <p>
          Salir de tu cuenta actual.
        </p>

        <button @click="logout">
          CERRAR SESIÓN
        </button>

      </div>

    </div>

  </section>

  <div class="footer-line"></div>
</template>