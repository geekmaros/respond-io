<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core'
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
import NodeDetails from '@/components/Drawer/NodeDetails.vue'
import { useDrawer } from '@/composables/drawer.js'

const { isOpen, openDrawer, closeDrawer } = useDrawer()

const router = useRouter()

const store = useFlowStore()

const elements = ref([])

const { fitView } = useVueFlow()

const onNodeClick = (nodeMouseEvent) => {
  const {
    node: { id, type, data },
  } = nodeMouseEvent // Destructure to get the node
  // console.log(node)

  if (type !== 'dateTimeConnector') {
    //set node as selected
    store.setSelectedNode({ id, type, data })
    //set URL
    router.push({ name: 'detail', params: { id: id } })

    // //open drawer
    openDrawer()
  }
}

// const onConnect = (connection) => {
//   flowStore.addConnection(connection)
// }

const onPaneReady = () => {
  fitView()
}

const handleCloseDrawer = () => {
  closeDrawer()
  router.push({ name: 'home' })
}

onMounted(async () => {
  const data = await store.initializeStore()

  elements.value = transformFlowData(data)
})
</script>

<template>
  <div class="h-screen w-screen">
    <!--    <VueFlow :nodes="store.nodes" :edges="store.edges">-->
    <VueFlow v-model="elements" @node-click="onNodeClick" @paneReady="onPaneReady">
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
    <transition name="drawer">
      <NodeDetails  @close="handleCloseDrawer" v-if="isOpen" :node="store.selectedNode" />
    </transition>
  </div>
</template>
<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.drawer-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.drawer-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.drawer-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.drawer-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
