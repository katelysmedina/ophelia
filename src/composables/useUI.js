import { ref } from 'vue'

export function useUI() {
  const filtersOpen = ref(false)
  const categoryOpen = ref(false)

  const activeSizeProduct = ref(null)

  function openFilters() {
    filtersOpen.value = true
  }

  function closeFilters() {
    filtersOpen.value = false
  }

  function toggleCategory() {
    categoryOpen.value = !categoryOpen.value
  }

  function openSizeSelector(id) {
    activeSizeProduct.value = id
  }

  function closeSizeSelector() {
    activeSizeProduct.value = null
  }

  return {
    filtersOpen,
    categoryOpen,
    activeSizeProduct,
    openFilters,
    closeFilters,
    toggleCategory,
    openSizeSelector,
    closeSizeSelector
  }
}