<template>
  <section class="cart-page">
    <div class="cart-header">
      <span id="cart-breadcrumb">
        {{ view === 'cart'
          ? 'OPHELIA / TU BOLSA'
          : 'OPHELIA / FAVORITOS'
        }}
      </span>

      <div class="cart-title">
        <span
          class="tab"
          :class="{ 'active-tab': view === 'cart' }"
          @click="view = 'cart'"
        >
          Tu bolsa
        </span>

        <span
          class="tab"
          :class="{ 'active-tab': view === 'fav' }"
          @click="view = 'fav'"
        >
          Favoritos
        </span>
      </div>
    </div>

    <div
      v-if="view === 'cart'"
      class="cart-layout"
      :class="{ empty: !cart.length }"
    >

      <div
        v-if="!cart.length"
        class="cart-items"
      >
        <div class="empty-cart">
          <p>
            Aún no tienes ningún artículo en la bolsa,
            descubre todo lo que tenemos para ti.
          </p>

          <RouterLink
            to="/mujer"
            class="empty-cart-btn"
          >
            Descubrir
          </RouterLink>
        </div>
      </div>

      <div
        v-else
        class="cart-items"
      >
        <div
          v-for="item in cart"
          :key="item.id + item.size"
          class="cart-item"
        >

          <div class="cart-image">
            <img :src="item.images[0]" />
          </div>

          <div class="cart-content">

            <div class="cart-details">
              <h3>{{ item.name }}</h3>

              <p class="cart-size">
                Talla: {{ item.size }}
              </p>
            </div>

            <div class="cart-quantity">
              <button
                class="quantity-btn"
                @click="decreaseQuantity(item.id, item.size)"
              >
                −
              </button>

              <span class="quantity-number">
                {{ item.quantity }}
              </span>

              <button
                class="quantity-btn"
                @click="increaseQuantity(item.id, item.size)"
              >
                +
              </button>
            </div>

            <p class="cart-price">
              {{ item.price * item.quantity }} MXN
            </p>

            <button
              class="remove-item"
              @click="removeFromCart(item.id, item.size)"
            >
              ×
            </button>

          </div>
        </div>
      </div>

      <!-- summary -->
      <aside
        v-if="cart.length"
        class="cart-summary"
      >
        <div class="summary-block">

          <div class="summary-row">
            <span>Subtotal</span>
            <span>{{ cartTotal }} MXN</span>
          </div>

          <div class="summary-row">
            <span>Envío</span>
            <span>Gratis</span>
          </div>

          <div class="summary-total">
            <span>Total</span>
            <span>{{ cartTotal }} MXN</span>
          </div>

        </div>

        <button
        class="checkout-btn"
        @click="$router.push('/checkout')"
        >
        CONTINUAR
      </button>
      </aside>
    </div>

    <!-- favoritos -->
    <div
      v-if="view === 'fav'"
      class="cart-layout favorites-mode"
      :class="{ empty: !favoriteProducts.length }"
    >

  
      <div
        v-if="!favoriteProducts.length"
        class="cart-items"
      >
        <div class="empty-cart">
          <p>
            No tienes favoritos aún.
            Inspírate y empieza a crear tu wishlist.
          </p>

          <RouterLink
            to="/mujer"
            class="empty-cart-btn"
          >
            Descubrir
          </RouterLink>
        </div>
      </div>

    
      <div
        v-else
        class="cart-items"
      >
        <div class="favorites-grid">

          <article
            v-for="product in favoriteProducts"
            :key="product.id"
            class="favorite-card"
          >

            <button
              class="favorite-remove"
              @click="toggleFav(product.id)"
            >
              ×
            </button>

            <div class="favorite-image">
              <RouterLink :to="`/producto/${product.id}`">
                <img :src="product.images[0]" />
              </RouterLink>
            </div>

            <div class="favorite-info">

              <span class="favorite-category">
                {{ capitalize(product.category) }}
              </span>

              <h3>{{ product.name }}</h3>

              <p class="favorite-price">
                {{ product.price }} MXN
              </p>

              <button
                class="favorite-cart-btn"
                @click="toggleSizes(product.id)"
              >
                AGREGAR A LA BOLSA
              </button>

              <div
                class="favorite-sizes"
                :class="{ active: activeFav === product.id }"
              >
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  @click="handleFavAdd(product, size)"
                >
                  {{ size }}
                </button>
              </div>

            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <div class="footer-line"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { products } from '@/data/products'
import { useCart } from '@/composables/useCart'
import { useFavorites } from '@/composables/useFavorites'

const view = ref('cart')
const activeFav = ref(null)

const {
  cart,
  cartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  addToCart
} = useCart()

const {
  favorites,
  toggleFav
} = useFavorites()

const favoriteProducts = computed(() =>
  products.filter(product =>
    favorites.value.includes(product.id)
  )
)

function toggleSizes(id) {
  activeFav.value =
    activeFav.value === id
      ? null
      : id
}

function handleFavAdd(product, size) {
  addToCart(product, size)
  activeFav.value = null
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() +
    text.slice(1)
}
</script>