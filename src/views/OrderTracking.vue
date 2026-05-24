<template>
  <section class="tracking-page">

  <div class="mujer-header">
      <span>OPHELIA / SEGUIMIENTO DE PEDIDOS</span>
      <h2>Seguimiento de pedidos</h2>
    </div>


    <div v-if="!order" class="empty">
      <p>No hay pedidos aún</p>
    </div>

    <div v-else class="tracking-wrap">

      
      <div class="tracking-top">

        <div class="tracking-meta">
          <h3>Pedido #{{ order.id }}</h3>
          <p>{{ formatDate(order.createdAt) }}</p>
        </div>

        <span class="badge">
          En preparación
        </span>

      </div>

  
      <div class="progress-line">

        <div class="line"></div>

        <div class="progress-steps">

          <div class="step" :class="{ active: step >= 1 }">
            <span class="dot"></span>
            <p>Confirmado</p>
          </div>

          <div class="step" :class="{ active: step >= 2 }">
            <span class="dot"></span>
            <p>Preparación</p>
          </div>

          <div class="step" :class="{ active: step >= 3 }">
            <span class="dot"></span>
            <p>Enviado</p>
          </div>

          <div class="step" :class="{ active: step >= 4 }">
            <span class="dot"></span>
            <p>Entregado</p>
          </div>

        </div>

      </div>


      <div class="tracking-items">

        <div
          v-for="item in order.items"
          :key="item.id + item.size"
          class="tracking-item"
        >

          <img :src="item.images[0]" />

          <div class="item-info">
            <p>{{ item.name }}</p>
            <span>Talla {{ item.size }} · x{{ item.quantity }}</span>
          </div>

          <div class="item-price">
            {{ item.price * item.quantity }} MXN
          </div>

        </div>

      </div>

  
      <div class="tracking-total">
        <span>Total</span>
        <strong>{{ getTotal(order.items) }} MXN</strong>
      </div>

    </div>

  </section>
  <div class="footer-line"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const order = ref(null)
const step = ref(2)

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('lastOrder'))

  if (saved) {
    order.value = saved
    return
  }

  // fallback demo
  order.value = {
    id: Date.now(),
    createdAt: new Date(),
    status: 'En preparación',
    items: [
      {
        id: 1,
        name: 'Blusa de satín',
        size: 'M',
        quantity: 1,
        price: 559,
        images: ["/img/BLU2_4.jpeg"]
      }
    ]
  }
})

function getTotal(items) {
  return items.reduce((a, i) => a + i.price * i.quantity, 0)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-MX')
}
</script>