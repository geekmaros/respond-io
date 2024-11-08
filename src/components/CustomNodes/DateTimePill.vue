<template>
  <BaseNode
    :id="id"
    :data="data"
    :selected="selected"
    :icon="BoltIcon"
    :title="data.label || 'Trigger'"
    :subtitle="getTriggerType"
    icon-background-class="bg-purple-100"
    icon-color-class="text-purple-600"
    :handles="[{ id: 'bottom', type: 'source', position: 'bottom' }]"
  >
    <div class="flex justify-center items-center">
      <div class="text-xs text-gray-400 text-center py-3 p-4">{{ getLabel }}</div>
    </div>
  </BaseNode>
</template>

<script setup>
import { computed } from 'vue'
import BaseNode from './BaseNode.vue'

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
</script>
