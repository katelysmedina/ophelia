<template>

  <section class="mujer-catalogo">
    <div class="mujer-header">
      <span id="categoryTitle">{{ title }}</span>
      <h2>Mujer</h2>
    </div>

    <div class="shop-topbar">
      <button
        class="filter-toggle"
        @click="toggleFilters = !toggleFilters"
      >
        FILTRAR
      </button>
    </div>

    <aside
      class="filters-sidebar"
      :class="{ active: toggleFilters }"
    >

      <div class="filters-header">
        <button
          id="closeFilters"
          type="button"
          @click="toggleFilters = false"
        >
          OCULTAR
        </button>
      </div>

      <div class="filter-group">
        <p class="filter-title">
          ORDENAR POR
        </p>

        <label>
          <input
            type="radio"
            value="default"
            v-model="sort"
          >
          Relevancia
        </label>

        <label>
          <input
            type="radio"
            value="low"
            v-model="sort"
          >
          Precio ascendente
        </label>

        <label>
          <input
            type="radio"
            value="high"
            v-model="sort"
          >
          Precio descendente
        </label>

        <label>
          <input
            type="radio"
            value="az"
            v-model="sort"
          >
          A-Z
        </label>
      </div>

      <div class="filter-group">

  <button
    type="button"
    class="accordion-btn"
    @click="accordion = !accordion"
  >
    <span>CATEGORÍA</span>
    <span>{{ accordion ? '-' : '+' }}</span>
  </button>

  <div
    class="accordion-content"
    :class="{ active: accordion }"
  >

    <label
      v-for="c in categories"
      :key="c"
    >
      <input
        type="checkbox"
        :value="c"
        v-model="selectedCategories"
      >
      {{ capitalize(c) }}
    </label>
  </div>
</div>
    </aside>
    <div
      id="mujer-grid"
      class="mujer-grid"
    >

      <article
        v-for="product in filteredProducts"
        :key="product.id"
        class="mujer-card"
      >
      
        <div class="product-image">
          <div class="img-wrap">
  <img :src="product.images[0]" />
</div>
          
          <div class="product-icons">
            <button
              class="icon-btn heart"
              :class="{ active: isFav(product.id) }"
              @click.stop="toggleFav(product.id)"
            >
              <Heart :size="18" />
            </button>

            <button
              class="icon-btn bag"
              @click.stop="openSize(product.id)"
            >
              <ShoppingBag :size="18" />
            </button>
          </div>
          

         <div class="size-selector" :class="{ active: activeSize === product.id }">
         
            <button
              class="close-x"
              @click.stop="activeSize = null"
            >
              x
            </button>

            <div class="size-list">
              <button
                v-for="s in product.sizes"
                :key="s"
                @click.stop="handleAdd(product, s)"
              >
                {{ s }}
              </button>
            </div>
          </div>
        </div>

        <div class="mujer-info">
          <span class="mujer-category">
            {{ capitalize(product.category) }}
          </span>
          <h3>
            {{ product.name }}
          </h3>
          <p class="mujer-price">
            {{ product.price }} MXN
          </p>
        </div>
      </article>
    </div>
  </section>

  <div class="footer-line"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Heart, ShoppingBag } from 'lucide-vue-next'
import { products } from '@/data/products'
import { useCart } from '@/composables/useCart'
import { useFavorites } from '@/composables/useFavorites'

const { addToCart } = useCart()

const {
  toggleFav,
  isFav
} = useFavorites()

/* ui */
const toggleFilters = ref(false)
const accordion = ref(true)
const selectedCategories = ref([])
const sort = ref('default')
const activeSize = ref(null)

/* categorías */
const categories = [
  'abrigos',
  'blazers',
  'blusas',
  'faldas',
  'jeans',
  'pantalones',
  'tops',
  'vestidos'
]

/* title */
const title = computed(() => {
  if (!selectedCategories.value.length) {
    return 'MUJER / ALL'
  }

  if (selectedCategories.value.length === 1) {
    return (
      'MUJER / ' +
      selectedCategories.value[0].toUpperCase()
    )
  }
  return 'MUJER / VARIOS'
})

/* filtros */
const filteredProducts = computed(() => {
  let list = [...products]
  if (selectedCategories.value.length) {
    list = list.filter(product =>
      selectedCategories.value.includes(
        product.category
      )
    )
  }

  if (sort.value === 'az') {
    list.sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }

  if (sort.value === 'low') {
    list.sort((a, b) =>
      a.price - b.price
    )
  }

  if (sort.value === 'high') {
    list.sort((a, b) =>
      b.price - a.price
    )
  }
  return list
})

/* abrir selector */
function openSize(id) {
  if (activeSize.value === id) {
    activeSize.value = null
  } else {
    activeSize.value = id
  }

}

function handleAdd(product, size) {
  addToCart(product, size)
  activeSize.value = null
}

function capitalize(text) {
  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  )

}
</script>