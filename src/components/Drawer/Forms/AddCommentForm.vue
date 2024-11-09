<script setup>
import { ref, watchEffect } from 'vue'
import { ChatBubbleLeftEllipsisIcon, TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  nodeData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update'])

const comment = ref('')

// Initialize from props
watchEffect(() => {
  if (props.nodeData) {
    comment.value = props.nodeData.data.comment || ''
  }
})

const updateComment = () => {
  emit('update', {
    comment: comment.value,
  })
}

const clearComment = () => {
  comment.value = ''
  updateComment()
}
</script>

<template>
  <div class="space-y-4">
    <!-- Comment Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <ChatBubbleLeftEllipsisIcon class="w-5 h-5 text-gray-400" />
        <h3 class="text-lg font-medium text-gray-900">Comment</h3>
      </div>

      <!-- Clear button -->
      <button
        v-if="comment"
        @click="clearComment"
        class="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-700 gap-1"
        title="Clear comment"
      >
        <TrashIcon class="w-4 h-4" />
        Clear
      </button>
    </div>

    <!-- Comment Input -->
    <div class="space-y-2">
      <textarea
        v-model="comment"
        rows="4"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-y"
        placeholder="Enter your comment here..."
        @input="updateComment"
      />

      <!-- Character count -->
      <div class="flex justify-end">
        <span class="text-xs text-gray-500"> {{ comment.length }} characters </span>
      </div>
    </div>

    <!-- Preview Section -->
    <div v-if="comment" class="mt-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Preview</h4>
      <div class="bg-gray-50 rounded-lg p-3">
        <p class="text-sm text-gray-600 whitespace-pre-wrap">{{ comment }}</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-4 bg-gray-50 rounded-lg text-gray-500">
      No comment added yet
    </div>
  </div>
</template>
