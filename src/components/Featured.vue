<template>
  <section class="featured">

    <div class="section-title">
      <span>BESTSELLERS</span>
      <h2>Favoritos de la semana</h2>
    </div>

    <div class="products-grid">
      <article
        class="product-card"
        v-for="product in bestsellers"
        :key="product.id"
      >

        <img
          :src="product.images[0]"
          :alt="product.name"
        >
      </article>

    </div>

  </section>
</template>

<script setup>
import { computed } from 'vue'
import { products } from '../data/products'

const bestsellers = computed(() => {
  return products.slice(0, 5)
})
</script>