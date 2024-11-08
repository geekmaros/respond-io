<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow, Panel } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { useFlowStore } from '@/stores/flowStore.js'
import { Controls } from '@vue-flow/controls'
import { transformFlowData } from '@/utils/transformFlowData.js'
import TriggerNode from '@/components/CustomNodes/TriggerNode.vue'
import BusinessHoursNode from '@/components/CustomNodes/BusinessHoursNode.vue'
import { MiniMap } from '@vue-flow/minimap'
import DateTimePill from '@/components/CustomNodes/DateTimePillNode.vue'
import AddCommentNode from '@/components/CustomNodes/AddCommentNode.vue'
import SendMessageNode from '@/components/CustomNodes/SendMessageNode.vue'

const store = useFlowStore()

const elements = ref([])

onMounted(async () => {
  const data = await store.initializeStore()

  elements.value = transformFlowData(data)

  console.log(elements.value)
})
</script>

<template>
  <div class="h-screen w-screen">
    <!--    <VueFlow :nodes="store.nodes" :edges="store.edges">-->
    <VueFlow v-model="elements">
      <!--      <Panel>-->
      <!--        <button type="button" @click="addNode">Add a node</button>-->
      <!--      </Panel>-->
      <template #node-trigger="triggerNodeProps">
        <TriggerNode v-bind="triggerNodeProps" />
      </template>

      <template #node-dateTime="dateTimeNodeProps">
        <BusinessHoursNode v-bind="dateTimeNodeProps" />
      </template>

      <template #node-dateTimeConnector="dateTimeConnectorNodeProps">
        <DateTimePill v-bind="dateTimeConnectorNodeProps" />
      </template>

      <template #node-addComment="addCommentNodeProps">
        <AddCommentNode v-bind="addCommentNodeProps" />
      </template>

      <template #node-sendMessage="sendMessageNodeProps">
        <SendMessageNode v-bind="sendMessageNodeProps" />
      </template>


      <Controls class="bg-white shadow-lg rounded-lg" />
      <MiniMap class="bg-white shadow-lg rounded-lg" /><Controls />
      <Background variant="dots" />
    </VueFlow>
  </div>
</template>
