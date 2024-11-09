<template>
  <div class="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">Node Details</h2>
      <button @click="handleCloseDrawer" class="text-gray-500 hover:text-gray-700">
        <XMarkIcon class="w-6 h-6" />
      </button>
    </div>

    <div class="space-y-4">
      <template v-if="node.type === 'addComment'">
        <!-- Add Comment Section -->
        <AddCommentForm :node-data="node" @update="handleUpdateNode" />
      </template>

      <template v-if="node.type === 'sendMessage'">
        <!--        Send Message -->
        <SendMessageForm :node-data="node" @update="handleUpdateNode" />
      </template>

      <template v-if="node.type === 'dateTime'">
        <!-- Business Hours Section -->
        <BusinessHoursForm :node-data="node" @update="handleUpdateNode" />
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
// import { ref, watch, onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import SendMessageForm from '@/components/Drawer/Forms/SendMessageForm.vue'
import BusinessHoursForm from '@/components/Drawer/Forms/BusinessHoursForm.vue'
import AddCommentForm from '@/components/Drawer/Forms/AddCommentForm.vue'

const emit = defineEmits(['close', 'delete', 'update'])

const props = defineProps({
  node: Object,
})

const handleCloseDrawer = () => {
  emit('close')
}

const handleUpdateNode = (updatedData) => {
  emit('update', props.node.id, updatedData)
}
</script>
