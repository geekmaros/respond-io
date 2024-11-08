<template>
  <div
    :class="[
      'bg-white py-3 rounded-lg border-2 min-w-[200px] cursor-pointer transition-colors duration-200',
      selected ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300',
    ]"
    @click="onNodeClick"
  >
    <!-- Header -->
    <div class="">
      <!-- Icon -->

      <slot></slot>

      <!--      &lt;!&ndash; Title &ndash;&gt;-->
      <!--      <div class="flex-1">-->
      <!--        <div class="font-medium text-sm">{{ data.label }}</div>-->
      <!--        <div class="text-xs text-gray-500">{{ data.type }}</div>-->
      <!--      </div>-->
      <!--    </div>-->

      <!--    &lt;!&ndash; Content Preview &ndash;&gt;-->
      <!--    <div class="mt-2 text-xs text-gray-600">-->
      <!--      <div v-if="data.type === 'sendMessage' && data.payload">-->
      <!--        {{ getMessagePreview(data.payload) }}-->
      <!--      </div>-->
      <!--      <div v-else-if="data.type === 'addComment' && data.comment">-->
      <!--        {{ data.comment }}-->
      <!--      </div>-->
      <!--      <div v-else-if="data.type === 'businessHours' && data.timezone">-->
      <!--        Timezone: {{ data.timezone }}-->
      <!--      </div>-->
    </div>

    <!-- Handles -->
    <Handle type="target" position="top" class="w-3 h-3 !bg-blue-500" />
    <Handle type="source" position="bottom" class="w-3 h-3 !bg-blue-500" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Handle } from '@vue-flow/core'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  BoltIcon,
} from '@heroicons/vue/24/outline'

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

const emit = defineEmits(['click'])

const nodeStyle = computed(() => {
  switch (props.data?.type) {
    case 'sendMessage':
      return {
        icon: ChatBubbleOvalLeftEllipsisIcon,
        bgColor: 'bg-blue-100',
        iconColor: 'text-blue-600',
      }
    case 'addComment':
      return {
        icon: ChatBubbleBottomCenterTextIcon,
        bgColor: 'bg-green-100',
        iconColor: 'text-green-600',
      }
    case 'businessHours':
      return {
        icon: ClockIcon,
        bgColor: 'bg-orange-100',
        iconColor: 'text-orange-600',
      }
    case 'trigger':
      return {
        icon: BoltIcon,
        bgColor: 'bg-purple-100',
        iconColor: 'text-purple-600',
      }
    default:
      return {
        icon: ChatBubbleOvalLeftEllipsisIcon,
        bgColor: 'bg-gray-100',
        iconColor: 'text-gray-600',
      }
  }
})

function getMessagePreview(payload) {
  if (!Array.isArray(payload)) return ''
  const textMessages = payload.filter((p) => p.type === 'text')
  return textMessages.length > 0 ? textMessages[0].text : ''
}

function onNodeClick(event) {
  // Stop the event from bubbling up to prevent multiple clicks
  event.stopPropagation()
  emit('click', {
    id: props.id,
    data: props.data,
    type: props.data.type,
  })
}
</script>

<style scoped>
:deep(.vue-flow__handle) {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3b82f6;
}

:deep(.vue-flow__handle:hover) {
  background-color: #2563eb;
}
</style>
