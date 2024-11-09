import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { processFlowData } from '@/utils/processFlow.js'

export const useFlowStore = defineStore('flow', () => {
  const nodes = ref([])
  const edges = ref([])
  const selectedNode = ref(null)

  async function initializeStore() {
    try {
      const response = await fetch('/data/data.json')
      const data = await response.json()
      const processedData = processFlowData(data)
      nodes.value = processedData.nodes
      edges.value = processedData.edges

      return processedData
    } catch (e) {
      console.error(e)
    }
  }

  function setSelectedNode(node) {
    selectedNode.value = node
  }

  function removeNode(nodeId) {
    // Clear or nulify the selected node if removing selected node
    if (selectedNode.value?.id === nodeId) {
      selectedNode.value = null
    }
    // Remove node from store
    nodes.value = nodes.value.filter((node) => node.id !== nodeId)
    edges.value = edges.value.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)

    // Return the updated data for transformation
    return {
      nodes: nodes.value,
      edges: edges.value,
    }
  }

  const getNodeById = computed(() => (id) => {
    return nodes.value.find((node) => node.id === id)
  })

  function updateNodeData(nodeId, newData) {
    console.log(nodeId, newData)
    const nodeIndex = nodes.value.findIndex((node) => node.id === nodeId)

    if (nodeIndex !== -1) {
      nodes.value[nodeIndex] = {
        ...nodes.value[nodeIndex],
        data: {
          ...nodes.value[nodeIndex].data,
          ...newData,
        },
      }

      // Update selected node if it's the one being modified
      if (selectedNode.value?.id === nodeId) {
        selectedNode.value = nodes.value[nodeIndex]
      }

      return {
        nodes: nodes.value,
        edges: edges.value,
      }
    }
  }

  return {
    nodes,
    edges,
    selectedNode,
    initializeStore,
    setSelectedNode,
    getNodeById,
    removeNode,
    updateNodeData,
  }
})
