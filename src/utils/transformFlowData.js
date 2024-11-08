import dagre from 'dagre'

export const NODE_DIMENSIONS = {
  width: 180,
  height: 80
}

export function transformFlowData(flowData) {
  if (!flowData?.nodes || !flowData?.edges) return []

  const { nodes: layoutedNodes, edges } = getLayoutedElements(
    flowData.nodes,
    flowData.edges
  )

  return [...layoutedNodes, ...edges]
}

export function getLayoutedElements(nodes, edges, direction = 'TB') {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: direction })

  // Add nodes to dagre
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: NODE_DIMENSIONS.width,
      height: NODE_DIMENSIONS.height
    })
  })

  // Add edges to dagre
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  // Layout the graph
  dagre.layout(dagreGraph)

  // Get the positioned nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - NODE_DIMENSIONS.width / 2,
        y: nodeWithPosition.y - NODE_DIMENSIONS.height / 2
      }
    }
  })

  return { nodes: layoutedNodes, edges }
}
