<template>
  <div :id="id" class="font-semibold rounded" :class="getStylingClass">
    <div class="flex justify-center items-center">
      <div class="text-xs text-center py-2 p-4">{{ getLabel }}</div>
    </div>

    <!-- Handles -->
    <Handle type="target" position="top" class="w-3 h-3 !bg-blue-500" />
    <Handle type="source" position="bottom" class="w-3 h-3 !bg-blue-500" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Handle } from '@vue-flow/core'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const getTriggerType = computed(() => {
  return props.data.type === 'conversationOpened' ? 'Conversation Opened' : props.data.type
})

const getLabel = computed(() => {
  return props.data.label
})

const getStylingClass = computed(() => {
  return props.data.connectorType === 'success'
    ? 'border-2 border-green-700 bg-green-300 text-green-700'
    : 'border-2 border-red-700 bg-red-300 text-red-700'
})
</script>
