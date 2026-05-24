<template>
  <section
    v-if="product"
    class="product-page"
  >
    <div class="product-gallery-wrapper">
      <div class="product-thumbs">
        <img
          v-for="img in product.images"
          :key="img"
          :src="img"
          @click="mainImage = img"
        >
      </div>

      <div class="product-main-image">

        <img
          id="main-product-image"
          :src="mainImage"
          :alt="product.name"
        >
      </div>
    </div>
    <div class="product-info-page">
      <span class="product-category">
        {{ capitalize(product.category) }}
      </span>
      <h1>
        {{ product.name }}
      </h1>
      <p class="product-price-page">
        {{ product.price }} MXN
      </p>

      <p class="product-color">
        Color: {{ product.color }}
      </p>

      <p class="product-description">
        Silueta minimalista con acabado premium. Diseñada para elevar cualquier look cotidiano con una estética sofisticada y atemporal.
      </p>

      <div class="product-sizes">
        <button
          v-for="size in product.sizes"
          :key="size"
          class="size-btn"
          :class="{ 'active-size': selectedSize === size }"
          @click="selectedSize = size"
        >
          {{ size }}
        </button>
      </div>
      <div class="product-actions">

        <button
          class="product-add-btn"
          @click="handleAddToCart"
        >
          AGREGAR A LA BOLSA
        </button>

        <button
          class="product-heart"
          :class="{ 'active-heart': isFav(product.id) }"
          @click="toggleFav(product.id)"
        >
          <Heart :size="20" />
        </button>
      </div>
    </div>
  </section>
<div class="footer-line"></div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Heart } from 'lucide-vue-next'

import { products } from '@/data/products'
import { useCart } from '@/composables/useCart'
import { useFavorites } from '@/composables/useFavorites'

const route = useRoute()

const { addToCart } = useCart()
const { toggleFav, isFav } = useFavorites()

const selectedSize = ref(null)

const product = computed(() =>
  products.find(
    p => p.id === Number(route.params.id)
  )
)

const mainImage = ref(
  product.value?.images?.[0] || ''
)

function handleAddToCart() {

  if (!selectedSize.value) {

    alert('Selecciona una talla')
    return

  }

  addToCart(
    product.value,
    selectedSize.value
  )

}

function capitalize(text) {

  return text.charAt(0).toUpperCase() + text.slice(1)

}
</script>