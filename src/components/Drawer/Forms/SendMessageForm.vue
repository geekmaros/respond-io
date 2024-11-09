# src/components/FlowChart/drawer-forms/SendMessageForm.vue
<script setup>
import { ref, watchEffect } from 'vue'
import { TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  nodeData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update'])

// Form state
const messages = ref([])
const attachments = ref([])

// Initialize form with node data
watchEffect(() => {
  if (props.nodeData.data.payload) {
    messages.value = props.nodeData.data.payload
      .filter((item) => item.type === 'text')
      .map((item) => item.text)

    attachments.value = props.nodeData.data.payload
      .filter((item) => item.type === 'attachment')
      .map((item) => item.attachment)
  }
})

// Handle text message updates
const addMessage = () => {
  messages.value.push('')
  updateNode()
}

const removeMessage = (index) => {
  messages.value.splice(index, 1)
  updateNode()
}

const updateMessage = (index, value) => {
  messages.value[index] = value
  updateNode()
}

// Handle attachment updates
const addAttachment = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      attachments.value.push(e.target.result)
      updateNode()
    }
    reader.readAsDataURL(file)
  }
}

const removeAttachment = (index) => {
  attachments.value.splice(index, 1)
  updateNode()
}

// Update node data
const updateNode = () => {
  const payload = [
    ...messages.value.map((text) => ({
      type: 'text',
      text,
    })),
    ...attachments.value.map((url) => ({
      type: 'attachment',
      attachment: url,
    })),
  ]

  emit('update', { payload })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Text Messages Section -->
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <label class="block text-sm font-medium text-gray-700"> Messages </label>
        <button
          type="button"
          @click="addMessage"
          class="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <PlusIcon class="w-4 h-4 mr-1" />
          Add Message
        </button>
      </div>

      <div class="space-y-3">
        <div v-for="(message, index) in messages" :key="index" class="flex gap-2">
          <textarea
            :value="message"
            @input="updateMessage(index, $event.target.value)"
            rows="2"
            class="block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter message text..."
          />
          <button
            @click="removeMessage(index)"
            class="flex-shrink-0 text-red-500 hover:text-red-700"
            title="Remove message"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Attachments Section -->
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <label class="block text-sm font-medium text-gray-700"> Attachments </label>
        <label
          class="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          <PlusIcon class="w-4 h-4 mr-1" />
          Add Attachment
          <input type="file" class="hidden" accept="image/*" @change="addAttachment" />
        </label>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="(attachment, index) in attachments"
          :key="index"
          class="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
        >
          <img :src="attachment" class="w-full h-full object-cover" alt="Attachment preview" />

          <!-- Delete Overlay -->
          <div
            class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <button
              @click="removeAttachment(index)"
              class="text-white hover:text-red-200 transition-colors"
              title="Remove attachment"
            >
              <TrashIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Section -->
    <div class="mt-6 bg-gray-50 p-4 rounded-lg">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Preview</h4>
      <div class="space-y-2">
        <div v-if="attachments.length" class="border-t border-gray-200 pt-2 mt-2">
          <p class="text-sm text-gray-500 mb-1">{{ attachments.length }} attachment(s)</p>
          <div class="grid grid-cols-4 gap-1">
            <img
              v-for="(attachment, index) in attachments"
              :key="`preview-att-${index}`"
              :src="attachment"
              class="w-full h-12 object-cover rounded"
              alt="Attachment thumbnail"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
