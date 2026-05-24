import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MujerView from '@/views/Mujer.vue'
import Producto from '../views/Producto.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Gracias from '../views/Gracias.vue'
import Auth from '@/views/Auth.vue'
import Account from '@/views/Account.vue'
import NewIn from '@/views/NewIn.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/mujer', name: 'mujer', component: MujerView },
    { path: '/sale', component: () => import('../views/ComingSoon.vue') },
    { path: '/cart', component: () => import('../views/Cart.vue') },
    { path: '/producto/:id', name: 'producto', component: Producto},
    { path: '/checkout',  component: Checkout},
    { path: '/gracias',  component: Gracias},
    { path: '/auth', component: Auth },
    { path: '/account', component: Account },
    { path: '/newin', component: NewIn },
    { path: '/tracking',component: () => import('@/views/OrderTracking.vue')},
    { path: '/account/addresses', component: () => import('@/views/Addresses.vue')  }
  ]
})

export default router