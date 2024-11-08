<template>
  <BaseNode
    :id="id"
    :data="data"
    :selected="selected"
    :icon="ClockIcon"
    :title="data.label || 'Business Hours'"
    :subtitle="timeZoneDisplay"
    icon-background-class="bg-orange-100"
    icon-color-class="text-orange-600"
    :handles="[
      { id: 'top', type: 'target', position: 'top' },
      { id: 'success', type: 'source', position: 'bottom', class: 'bg-green-500' },
      { id: 'failure', type: 'source', position: 'bottom', class: 'bg-red-500' },
    ]"
  >
    <div class="divide-y divide-gray-300">
      <div class="flex items-center gap-2 px-4 pb-4">
        <div :class="['w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100']">
          <component :is="ClockIcon" class="w-4 h-4 text-purple-600" />
        </div>
        <div class="text-sm text-gray-700 capitalize font-semibold">{{ getLabel }}</div>
      </div>

      <div class="text-xs text-gray-400 text-center py-3 p-4">
        {{ getLabel }} - {{ timeZoneDisplay }}
      </div>
    </div>
  </BaseNode>
</template>

<script setup>
import { computed } from 'vue'
import { ClockIcon } from '@heroicons/vue/24/outline'
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

const getLabel = computed(() => {
  return props.data.label
})

const timeZoneDisplay = computed(() => {
  return props.data.timezone || 'UTC'
})
</script>
