import { ref, computed } from 'vue'
import { products } from '@/data/products'

export function useProducts() {
  const selectedCategories = ref([])
  const sort = ref('default')

  const filteredProducts = computed(() => {
    let result = [...products]

    // filtros
    if (selectedCategories.value.length) {
      result = result.filter(p =>
        selectedCategories.value.includes(p.category)
      )
    }

    // sort
    if (sort.value === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sort.value === 'low') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sort.value === 'high') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  })

  function toggleCategory(cat) {
    if (selectedCategories.value.includes(cat)) {
      selectedCategories.value =
        selectedCategories.value.filter(c => c !== cat)
    } else {
      selectedCategories.value.push(cat)
    }
  }

  return {
    selectedCategories,
    sort,
    filteredProducts,
    toggleCategory
  }
}