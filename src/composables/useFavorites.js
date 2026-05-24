import { ref } from 'vue'

const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

function toggleFav(id) {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter(f => f !== id)
  } else {
    favorites.value.push(id)
  }

  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

function isFav(id) {
  return favorites.value.includes(id)
}

export function useFavorites() {
  return {
    favorites,
    toggleFav,
    isFav
  }
}