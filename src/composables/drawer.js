import { ref } from 'vue'

export function useDrawer() {
  const isOpen = ref(false)

  const openDrawer = () => {
    isOpen.value = true
  }

  const closeDrawer = () => {
    isOpen.value = false
  }

  const toggleDrawer = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  }
}
