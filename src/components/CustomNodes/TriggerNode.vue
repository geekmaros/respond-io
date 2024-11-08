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
    <div class="divide-y divide-gray-300">
      <div class="flex items-center gap-2 px-4 pb-4">
        <div :class="['w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100']">
          <component :is="BoltIcon" class="w-4 h-4 text-purple-600" />
        </div>
        <div class="text-sm text-gray-700 capitalize font-semibold">{{ getLabel }}</div>
      </div>

      <div class="text-xs text-gray-400 text-center py-3 p-4">{{ getTriggerType }}</div>
    </div>
  </BaseNode>
</template>

<script setup>
import { computed } from 'vue'
import { BoltIcon } from '@heroicons/vue/24/outline'
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
