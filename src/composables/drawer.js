import { reactive } from 'vue'

export const useDrawer = reactive({
  isOpen: false,
  openDrawer() {
    this.isOpen = true
  },

  closeDrawer() {
    this.isOpen = false
  },
})
