<script setup>
import { ref, onMounted } from 'vue'

const address = ref({
  name: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: ''
})

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('opheliaAddress'))
  if (saved) address.value = saved
})

function saveAddress() {
  localStorage.setItem('opheliaAddress', JSON.stringify(address.value))
}
</script>

<template>
  <section class="account-page">

    <div class="mujer-header">
      <span>OPHELIA / DIRECCIONES</span>
      <h2>Direcciones</h2>
    </div>

    <div class="address-page">

      <div class="address-form">

        <input v-model="address.name" placeholder="Nombre completo" />
        <input v-model="address.street" placeholder="Calle y número" />
        <input v-model="address.city" placeholder="Ciudad" />
        <input v-model="address.state" placeholder="Estado" />
        <input v-model="address.zip" placeholder="Código postal" />
        <input v-model="address.country" placeholder="País" />

        <button class="save-btn" @click="saveAddress">
          GUARDAR DIRECCIÓN
        </button>

      </div>

    </div>

  </section>

  <div class="footer-line"></div>
</template>