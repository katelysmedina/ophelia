<template>
  <section class="newsletter">
    <span>OPHELIA NEWSLETTER</span>

    <h2>
      Recibe novedades, lanzamientos y ofertas exclusivas.
    </h2>

    <form @submit.prevent="subscribe">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
      />

      <button type="submit" class=submit-newsletter>
        Suscribirse
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

function subscribe() {
  if (!email.value) return

  alert(`Suscrito: ${email.value}`)
  email.value = ''
}
</script>