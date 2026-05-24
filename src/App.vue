<template>
  <div>
    <Navbar />
    <router-view />
    <Footer v-if="!hideFooter" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

const hideFooter = computed(() => {
  return route.path === '/checkout'
})
</script>