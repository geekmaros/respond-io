<template>
  <BaseNode
    :id="id"
    :data="data"
    :selected="selected"
    :icon="ChatBubbleLeftEllipsisIcon"
    :title="data.label || 'Trigger'"
    icon-background-class="bg-purple-100"
    icon-color-class="text-purple-600"
    :handles="[{ id: 'bottom', type: 'source', position: 'bottom' }]"
  >
    <div class="divide-y divide-gray-300">
      <div class="flex items-center gap-2 px-4 pb-4">
        <div :class="['w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100']">
          <component :is="ChatBubbleLeftEllipsisIcon" class="w-4 h-4 text-purple-600" />
        </div>
        <div class="text-sm text-gray-700 capitalize font-semibold">{{ getLabel }}</div>
      </div>

      <div class="text-sm text-gray-400 text-lefts py-3 p-4">
        <span class="font-normal">Message:</span>

        <div class="font-normal message overflow-hidden overflow-ellipsis w-48">
          <p class="break-words">{{ getMessage }}</p>
        </div>
      </div>
    </div>
  </BaseNode>
</template>

<script setup>
import { computed } from 'vue'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/outline'
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

const getMessage = computed(() => {
  const length = props.data.payload.length
  return props.data.payload[length - 1].text || props.data.payload[length - 1].attachment
})

const getLabel = computed(() => {
  return props.data.label
})
</script>
