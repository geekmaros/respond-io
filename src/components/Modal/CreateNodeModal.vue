// src/components/flow/CreateNodeModal.vue
<template>
  <Transition appear>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity" @click="onClose" />

      <!-- Modal -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div
          class="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all"
        >
          <!-- Header -->
          <div class="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Create New Node</h3>
            <button
              @click="onClose"
              class="rounded-md p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>

          <!-- Form -->
          <div class="px-4 py-4">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Title -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Title</label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter node title"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  v-model="form.description"
                  rows="2"
                  class="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter node description"
                />
              </div>

              <!-- Node Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Node Type</label>
                <div class="mt-1 grid grid-cols-1 gap-3">
                  <div
                    v-for="type in nodeTypes"
                    :key="type.value"
                    @click="form.type = type.value"
                    :class="[
                      'relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50',
                      form.type === type.value
                        ? 'border-blue-500 ring-2 ring-blue-500'
                        : 'border-gray-300',
                    ]"
                  >
                    <div class="flex items-center">
                      <div
                        :class="[
                          'flex h-10 w-10 items-center justify-center rounded-lg',
                          type.bgColor,
                        ]"
                      >
                        <component :is="type.icon" class="h-6 w-6" :class="type.iconColor" />
                      </div>
                      <div class="ml-3">
                        <h4 class="text-sm font-medium text-gray-900">
                          {{ type.label }}
                        </h4>
                        <p class="text-sm text-gray-500">{{ type.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="mt-5 flex gap-3 justify-end border-t pt-4">
                <button
                  type="button"
                  @click="onClose"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="!isValid"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create Node
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close', 'create'])

const nodeTypes = [
  {
    value: 'sendMessage',
    label: 'Send Message',
    description: 'Send a message or attachment to the user',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    value: 'addComment',
    label: 'Add Comment',
    description: 'Add a comment or note to the flow',
    icon: ChatBubbleBottomCenterTextIcon,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    value: 'dateTime',
    label: 'Business Hours',
    description: 'Set up business hours and time-based routing',
    icon: ClockIcon,
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
]

const form = ref({
  title: '',
  description: '',
  type: '',
})

const isValid = computed(() => {
  return form.value.title.trim() && form.value.type
})

const handleSubmit = () => {
  if (!isValid.value) return

  const nodeData = {
    label: form.value.title,
    description: form.value.description,
    type: form.value.type,
    id: Date.now().toString(),
    // Initialize default data based on node type
    data: initializeNodeData(form.value.type),
  }

  emit('create', nodeData)
  resetForm()
  onClose()
}

const initializeNodeData = (type) => {
  switch (type) {
    case 'sendMessage':
      return {
        label: form.value.title,
        payload: [
          {
            type: 'text',
            text: form.value.description || '',
          },
        ],
      }
    case 'addComment':
      return {
        label: form.value.title,
        comment: form.value.description || '',
      }
    case 'dateTime':
      return {
        timezone: 'UTC',
        label: form.value.title,
        times: [
          { startTime: '09:00', endTime: '17:00', day: 'mon' },
          { startTime: '09:00', endTime: '17:00', day: 'tue' },
          { startTime: '09:00', endTime: '17:00', day: 'wed' },
          { startTime: '09:00', endTime: '17:00', day: 'thu' },
          { startTime: '09:00', endTime: '17:00', day: 'fri' },
        ],
      }
    default:
      return {}
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    type: '',
  }
}

const onClose = () => {
  emit('close')
  resetForm()
}
</script>
