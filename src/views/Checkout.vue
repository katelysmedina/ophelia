<template>
  <section class="checkout-page">
    <div class="checkout-left">

      <span class="checkout-breadcrumb">
        OPHELIA / CHECKOUT
      </span>

      <h1>
        Finalizar compra
      </h1>

      <form
        class="checkout-form"
        @submit.prevent="placeOrder"
      >

        <div class="checkout-block">
          <span class="checkout-label">
            INFORMACIÓN
          </span>

          <input
            type="text"
            placeholder="Nombre completo"
            v-model="form.name"
          >

          <input
            type="email"
            placeholder="Correo electrónico"
            v-model="form.email"
          >

        </div>

        <div class="checkout-block">
          <span class="checkout-label">
            ENVÍO
          </span>
          <input
            type="text"
            placeholder="Dirección"
            v-model="form.address"
          >

          <div class="checkout-row">
            <input
              type="text"
              placeholder="Ciudad"
              v-model="form.city"
            >

            <input
              type="text"
              placeholder="CP"
              v-model="form.zip"
            >

          </div>
        </div>
        <div class="checkout-block">
          <span class="checkout-label">
            PAGO
          </span>

          <input
            type="text"
            placeholder="Número de tarjeta"
            v-model="form.card"
          >

          <div class="checkout-row">
            <input
              type="text"
              placeholder="MM/YY"
              v-model="form.exp"
            >

            <input
              type="text"
              placeholder="CVV"
              v-model="form.cvv"
            >
          </div>
        </div>
        <div class="checkout-actions">
          <button
            type="submit"
            class="place-order-btn"
          >
            FINALIZAR PEDIDO
          </button>

          <RouterLink
            to="/cart"
            class="checkout-cancel"
          >
            ← REGRESAR
          </RouterLink>

        </div>

      </form>

    </div>

    <div class="checkout-right">
      <div
        v-for="item in cart"
        :key="item.id + item.size"
        class="checkout-item"
      >

        <img :src="item.images[0]" />
        <div>
          <h3>
            {{ item.name }}
          </h3>
          <p>
            Talla: {{ item.size }}
          </p>
          <span>
            {{ item.price * item.quantity }} MXN
          </span>
        </div>
      </div>
      <div class="checkout-total">
        <span>Total</span>
        <span>
          {{ cartTotal }} MXN
        </span>
      </div>
    </div>
  </section>
  <div class="footer-line"></div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'

const router = useRouter()
const {
  cart,
  cartTotal,
  clearCart
} = useCart()
const form = reactive({
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  card: '',
  exp: '',
  cvv: ''
})

function placeOrder() {
  const fakeOrder = {
    id: Date.now(),
    items: cart.value,
    createdAt: new Date()
  }

const orders = JSON.parse(localStorage.getItem("orders")) || []
orders.push(fakeOrder)
localStorage.setItem("orders", JSON.stringify(orders))

  clearCart()
  router.push('/gracias')
}
</script>