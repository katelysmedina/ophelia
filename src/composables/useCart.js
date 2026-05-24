import { ref, computed } from 'vue'
const cart = ref(
  JSON.parse(localStorage.getItem('cart')) || []
)

/* contador navbar */
const cartCount = computed(() =>
  cart.value.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
)

/* subtotal */
const subtotal = computed(() =>
  cart.value.reduce((acc, item) => {
    return acc + (item.price * item.quantity)
  }, 0)
)

const cartTotal = computed(() => subtotal.value)

function saveCart() {
  localStorage.setItem(
    'cart',
    JSON.stringify(cart.value)
  )
}

function addToCart(product, size) {
  const existing = cart.value.find(
    item =>
      item.id === product.id &&
      item.size === size
  )

  if (existing) {
    existing.quantity++

  } else {
    cart.value.push({
      ...product,
      size,
      quantity: 1
    })

  }
  saveCart()
}

function increaseQuantity(id, size) {
  const item = cart.value.find(
    item =>
      item.id === id &&
      item.size === size
  )

  if (!item) return
  item.quantity++
  saveCart()
}

function decreaseQuantity(id, size) {

  const item = cart.value.find(
    item =>
      item.id === id &&
      item.size === size
  )

  if (!item) return

  if (item.quantity > 1) {
    item.quantity--

  } else {
    removeFromCart(id, size)
    return
  }

  saveCart()
}

/* eliminar */
function removeFromCart(id, size) {
  cart.value = cart.value.filter(
    item =>
      !(
        item.id === id &&
        item.size === size
      )
  )

  saveCart()
}

function removeItem(index) {
  cart.value.splice(index, 1)
  saveCart()
}

function clearCart() {
  cart.value = []
  saveCart()
}

export function useCart() {
  return {
    cart,
    cartCount,
    subtotal,
    cartTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    removeItem,
    clearCart
  }
}