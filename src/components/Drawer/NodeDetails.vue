<template>
  <div class="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">Node Details</h2>
      <button @click="handleCloseDrawer" class="text-gray-500 hover:text-gray-700">
        <XMarkIcon class="w-6 h-6" />
      </button>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="title"
          class="mt-1 w-full rounded-md border-gray-500 shadow-sm p-2"
          @change="updateNode"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="description"
          class="mt-1 w-full rounded-md border-gray-900 shadow-sm p-2"
          @change="updateNode"
        />
      </div>

      <template v-if="node.type === 'sendMessage'">
        <div class="p-4">
          <!-- Send Message Section -->
          <div v-if="node.type === 'sendMessage'">
            <SendMessageForm :node-data="node" @update="handleUpdateNode" />
          </div>
        </div>
      </template>

      <template v-if="node.type === 'dateTime'">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Business Hours</label>
          <div v-for="day in businessHours" :key="day.day" class="flex gap-2">
            <span class="w-20">{{ day.day }}</span>
            <input type="time" v-model="day.startTime" class="border rounded" />
            <input type="time" v-model="day.endTime" class="border rounded" />
          </div>
        </div>
      </template>

      <div class="pt-4">
        <button
          @click="$emit('delete', node.id)"
          class="w-full bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete Node
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import SendMessageForm from '@/components/Drawer/Forms/SendMessageForm.vue'

const emit = defineEmits(['close', 'delete', 'update'])

const props = defineProps({
  node: Object,
})

const title = ref('')
const description = ref('')
const attachments = ref([])
const businessHours = ref([])

// const setNodeDetails = (node) => {
//   title.value = node.name || '';
//   description.value = node.data?.payload?.[0]?.text || node.data?.comment || '';
//   attachments.value = node.data?.payload?.filter((p) => p.type === 'attachment').map((p) => p.attachment) || [];
//   businessHours.value = node.data?.times || [];
// };

const handleCloseDrawer = () => {
  emit('close')
}

const initializeNodeDetails = (node) => {
  if (!node) return

  // Set title
  title.value = node.data?.name || ''

  // Set description based on node type
  if (node.type === 'sendMessage') {
    description.value = node.data?.payload?.[0]?.text || ''
    attachments.value =
      node.data?.payload?.filter((p) => p.type === 'attachment').map((p) => p.attachment) || []
  } else if (node.type === 'addComment') {
    description.value = node.data?.comment || ''
  } else if (node.type === 'dateTime') {
    description.value = ''
    businessHours.value = node.data?.times || []
  }
}

// const updateNode = () => {
//   const updates = {
//     name: title.value,
//   }
//
//   if (props.node.type === 'sendMessage') {
//     updates.data = {
//       ...props.node.data,
//       payload: [
//         { type: 'text', text: description.value },
//         ...attachments.value.map((url) => ({ type: 'attachment', attachment: url })),
//       ],
//     }
//   } else if (props.node.type === 'addComment') {
//     updates.data = {
//       ...props.node.data,
//       comment: description.value,
//     }
//   } else if (props.node.type === 'businessHours') {
//     updates.data = {
//       ...props.node.data,
//       times: businessHours.value,
//     }
//   }
//
//   emit('update', props.node.id, updates)
// }

const handleUpdateNode = (updatedData) => {
  emit('update', props.node.id, updatedData)
}
onMounted(() => {
  initializeNodeDetails(props.node)
})

watch(
  () => props.node,
  (newNode) => {
    initializeNodeDetails(newNode)
  },
  { immediate: true, deep: true },
)
</script>
