<template>
  <BaseNode
    :id="id"
    :data="data"
    :selected="selected"
    :icon="ChatBubbleBottomCenterTextIcon"
    :title="data.label || 'Trigger'"
    icon-background-class="bg-green-100"
    icon-color-class="text-green-600"
    :handles="[{ id: 'bottom', type: 'source', position: 'bottom' }]"
  >
    <div class="divide-y divide-gray-300">
      <div class="flex items-center gap-2 px-4 pb-4">
        <div :class="['w-8 h-8 rounded-lg flex items-center justify-center bg-green-100']">
          <component :is="ChatBubbleBottomCenterTextIcon" class="w-4 h-4 green" />
        </div>
        <div class="text-sm text-gray-700 capitalize font-semibold">{{ getLabel }}</div>
      </div>

      <div class="text-sm text-gray-400 text-center py-3 p-4">{{ getComment }}</div>
    </div>
  </BaseNode>
</template>

<script setup>
import { computed } from 'vue'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline'
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

const getComment = computed(() => {
  return props.data.comment
})

const getLabel = computed(() => {
  return props.data.label
})
</script>
