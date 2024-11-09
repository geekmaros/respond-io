<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="absolute top-4 left-4 z-50">
    <button
      class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <PlusIcon class="h-5 w-5 mr-1" />
      Create Node
    </button>
  </div>
</template>

<style scoped></style>
