<template>
  <section class="mujer-catalogo">

    <div class="mujer-header">
      <span>NEW IN</span>
      <h2>Novedades</h2>
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

    <div class="mujer-grid">

      <article
        v-for="product in filteredProducts"
        :key="product.id"
        class="mujer-card"
      >

        <div class="product-image">
          <img :src="product.images[0]" />
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

            <button class="close-x" @click="activeSize = null">
              x
            </button>

            <div class="size-list">

              <button
                v-for="s in product.sizes"
                :key="s"
                @click="handleAdd(product, s)"
              >
                {{ s }}
              </button>

            </div>

          </div>

        </div>

        <div class="mujer-info">
          <span>{{ capitalize(product.category) }}</span>
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }} MXN</p>
        </div>

      </article>

    </div>

  </section>

  <div class="footer-line"></div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { Heart, ShoppingBag } from 'lucide-vue-next'
import { products } from '@/data/products'
import { useCart } from '@/composables/useCart'
import { useFavorites } from '@/composables/useFavorites'

const { addToCart } = useCart()
const { toggleFav, isFav } = useFavorites()

const toggleFilters = ref(false)
const accordion = ref(true)
const selectedCategories = ref([])
const sort = ref('default')
const activeSize = ref(null)


const base = computed(() =>
  products.filter(p => p.isNew).slice(0, 6)
)

const categories = [
  'abrigos','blazers','blusas','faldas',
  'jeans','pantalones','tops','vestidos'
]

const filteredProducts = computed(() => {
  let list = [...base.value]

  if (selectedCategories.value.length) {
    list = list.filter(p =>
      selectedCategories.value.includes(p.category)
    )
  }

  if (sort.value === 'az')
    list.sort((a,b) => a.name.localeCompare(b.name))

  if (sort.value === 'low')
    list.sort((a,b) => a.price - b.price)

  if (sort.value === 'high')
    list.sort((a,b) => b.price - a.price)

  return list
})

function openSize(id) {
  activeSize.value = activeSize.value === id ? null : id
}

function handleAdd(product, size) {
  addToCart(product, size)
  activeSize.value = null
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

onMounted(async () => {
  await nextTick()
  window.lucide?.createIcons()
})
</script>