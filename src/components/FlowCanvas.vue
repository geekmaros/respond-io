<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { useFlowStore } from '@/stores/flowStore.js'
import { Controls } from '@vue-flow/controls'
import { getLayoutedElements, transformFlowData } from '@/utils/transformFlowData.js'
import TriggerNode from '@/components/CustomNodes/TriggerNode.vue'
import BusinessHoursNode from '@/components/CustomNodes/BusinessHoursNode.vue'
import { MiniMap } from '@vue-flow/minimap'
import DateTimePill from '@/components/CustomNodes/DateTimePillNode.vue'
import AddCommentNode from '@/components/CustomNodes/AddCommentNode.vue'
import SendMessageNode from '@/components/CustomNodes/SendMessageNode.vue'
import NodeDetails from '@/components/Drawer/NodeDetails.vue'
import { useDrawer } from '@/composables/drawer.js'
import CreateNodeModal from '@/components/Modal/CreateNodeModal.vue'
import CreateNodeButton from '@/components/Modal/CreateNodeButton.vue'

const { isOpen, openDrawer, closeDrawer } = useDrawer()

const router = useRouter()

const store = useFlowStore()

const elements = ref([])

const showCreateModal = ref(false)

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

// const handleCreateNode = (nodeData) => {
//   // const updatedData = store.addNode(nodeData)
//   // elements.value = transformFlowData(updatedData)
//   // closeDrawer()
//   // router.push({ name: 'home' })
//
//   // Calculate position for new node (e.g., center of viewport)
//   const position = {
//     x: window.innerWidth / 20,
//     y: window.innerHeight / 20,
//   }
//
//   // Create the new node
//   const newNode = {
//     id: nodeData.id,
//     type: nodeData.type,
//     position,
//     data: {
//       name: nodeData.label,
//       ...nodeData.data,
//     },
//   }
//
//   // Add node to store
//   const updatedData = store.createNode(newNode)
//   elements.value = transformFlowData(updatedData)
// }

const handleCreateNode = (nodeData) => {

  //TODO: can still be modified if it does not need to be connected
  // First create the new node
  const newNode = {
    id: nodeData.id,
    type: nodeData.type,
    // Initial position doesn't matter as dagre will calculate it
    position: { x: 0, y: 0 },
    data: {
      name: nodeData.label,
      ...nodeData.data,
    },
  }

  // Add the new node to the existing nodes
  const updatedNodes = [...store.nodes, newNode]

  // Create edges if needed (e.g., connecting to the previous node)
  const lastNode = store.nodes[store.nodes.length - 1]
  let updatedEdges = [...store.edges]

  if (lastNode) {
    const newEdge = {
      id: `e${lastNode.id}-${newNode.id}`,
      source: lastNode.id,
      target: newNode.id,
    }
    updatedEdges.push(newEdge)
  }

  // Get the layouted elements
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    updatedNodes,
    updatedEdges,
    'TB', // Top to Bottom direction
  )

  // Update the store with the new layout
  store.nodes = layoutedNodes
  store.edges = layoutedEdges

  const updatedData = {
    nodes: layoutedNodes,
    edges: layoutedEdges,
  }
  elements.value = transformFlowData(updatedData)
}

// const onConnect = (connection) => {
//   store.addConnection(connection)
// }

const onPaneReady = () => {
  fitView()
}

const handleCloseDrawer = () => {
  closeDrawer()
  router.push({ name: 'home' })
}

const handleNodeDelete = (nodeId) => {
  //TODO: for weird reasons trigger not deleted
  const updatedData = store.removeNode(nodeId)
  elements.value = transformFlowData(updatedData)
  closeDrawer()
  router.push({ name: 'home' })
}

const handleNodeUpdate = (nodeId, newData) => {
  const updatedData = store.updateNodeData(nodeId, newData)
  elements.value = transformFlowData(updatedData)
}

onMounted(async () => {
  const data = await store.initializeStore()

  elements.value = transformFlowData(data)

  // load data from store if there is a param id
  if (router.currentRoute.value.params.id) {
    const node = store.getNodeById(router.currentRoute.value.params.id)
    if (node) {
      store.setSelectedNode(node)
      openDrawer()
    }
  }
})
</script>

<template>
  <div class="h-screen w-screen">
    <!--    <VueFlow :nodes="store.nodes" :edges="store.edges">-->
    <VueFlow v-model="elements" @node-click="onNodeClick" @paneReady="onPaneReady">
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

    <CreateNodeButton @click="showCreateModal = true" />
    <CreateNodeModal
      :is-open="showCreateModal"
      @close="showCreateModal = false"
      @create="handleCreateNode"
    />
    <transition name="drawer">
      <NodeDetails
        @close="handleCloseDrawer"
        @delete="handleNodeDelete"
        @update="handleNodeUpdate"
        v-if="isOpen"
        :node="store.selectedNode"
      />
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
