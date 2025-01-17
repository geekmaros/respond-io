export const processFlowData = (data) => {
  // we get to Convert the JSON data into nodes and edges according to how Vue-flow docs mentioned
  const processedNodes = []
  const processedEdges = []

  data.forEach((item) => {
    const node = {
      id: item.id,
      type: item.type,
      position: { x: 0, y: 0 },
      data: {
        ...item.data,
        label: item.name || item.type,
      },
    }
    processedNodes.push(node)

    // Create edges based on parentId
    if (item.parentId !== undefined && item.parentId !== null) {
      processedEdges.push({
        id: `e${item.parentId}->${item.id}`,
        source: item.parentId.toString(),
        target: item.id.toString(),
      })
    }
  })

  return { nodes: processedNodes, edges: processedEdges }
}
