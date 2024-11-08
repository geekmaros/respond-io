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

  return { nodes, edges, selectedNode, initializeStore }
})
