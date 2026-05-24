<script setup>
import { ref, computed } from 'vue'
import { ShoppingBag, User, Search, X, Menu } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart'
import { products } from '@/data/products'

const user = JSON.parse(localStorage.getItem('opheliaUser'))
const { cartCount } = useCart()

const searchOpen = ref(false)
const mobileOpen = ref(false)
const query = ref('')

const filteredProducts = computed(() => {
  if (!query.value) return []
  return products
    .filter(p =>
      p.name.toLowerCase().includes(query.value.toLowerCase())
    )
    .slice(0, 6)
})

function goToProduct(id) {
  searchOpen.value = false
  query.value = ''
  window.location.href = `/producto/${id}`
}

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header class="navbar">

    <div class="nav-left">
      <router-link to="/" class="logo">OPHELIA</router-link>
    </div>

    
    <button class="menu-toggle" @click="mobileOpen = true">
      <Menu />
    </button>

    
    <nav class="nav-center">
      <router-link to="/mujer">Mujer</router-link>
      <router-link to="/newin">New In</router-link>
      <router-link to="/sale">Sale</router-link>
    </nav>

    <div class="nav-right">

      <div class="search-wrapper">
        <Search class="nav-icon" @click="searchOpen = !searchOpen" />

        <div v-if="searchOpen" class="search-dropdown">
          <div class="search-input-box">
            <input
              v-model="query"
              type="text"
              placeholder="Buscar..."
              autofocus
            />
            <button class="close-btn" @click="searchOpen = false">
              <X :size="16" />
            </button>
          </div>

          <div class="search-results">
            <div
              v-for="p in filteredProducts"
              :key="p.id"
              class="search-item"
              @click="goToProduct(p.id)"
            >
              <img :src="p.images[0]" />
              <div>
                <p class="name">{{ p.name }}</p>
                <span class="price">{{ p.price }} MXN</span>
              </div>
            </div>

            <div v-if="query && filteredProducts.length === 0" class="no-results">
              Sin resultados
            </div>
          </div>
        </div>
      </div>

      <RouterLink :to="user ? '/account' : '/auth'">
        <User class="nav-icon" />
      </RouterLink>

      <router-link to="/cart" class="cart-link">
        <ShoppingBag class="nav-icon" />
        <span v-if="cartCount > 0" class="cart-badge">
          {{ cartCount }}
        </span>
      </router-link>

    </div>

    
    <div class="mobile-menu" :class="{ active: mobileOpen }">

      <button class="close-menu" @click="mobileOpen = false">
        <X />
      </button>

      <router-link to="/mujer" @click="closeMobile">Mujer</router-link>
      <router-link to="/newin" @click="closeMobile">New In</router-link>
      <router-link to="/sale" @click="closeMobile">Sale</router-link>

    </div>

  </header>
</template>