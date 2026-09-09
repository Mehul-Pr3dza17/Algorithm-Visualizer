import type {
  GraphNode,
  GraphEdge,
  GraphStep,
} from "../../types/visualizer";

export function generateBFSSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string
): GraphStep[] {

  const steps: GraphStep[] = [];
  let stepNumber = 0;

  const visited = new Set<string>();
  const visitedEdges = new Set<string>();

  const queue: string[] = [];

  const adjacency = new Map<string, { node: string; edge: string }[]>();

  for (const node of nodes) {
    adjacency.set(node.id, []);
  }

  for (const edge of edges) {
    adjacency.get(edge.source)?.push({
      node: edge.target,
      edge: edge.id,
    });

    adjacency.get(edge.target)?.push({
      node: edge.source,
      edge: edge.id,
    });
  }

  queue.push(startNodeId);
  visited.add(startNodeId);

  while (queue.length > 0) {

    const current = queue.shift()!;

    steps.push({
      stepNumber: stepNumber++,
      visitedNodes: new Set(visited),
      visitedEdges: new Set(visitedEdges),
      currentNodeId: current,
      distances: {},
      message: `Visiting ${current}`,
    });

    for (const neighbor of adjacency.get(current) ?? []) {

      if (!visited.has(neighbor.node)) {

        visited.add(neighbor.node);
        visitedEdges.add(neighbor.edge);

        queue.push(neighbor.node);

        steps.push({
          stepNumber: stepNumber++,
          visitedNodes: new Set(visited),
          visitedEdges: new Set(visitedEdges),
          currentNodeId: neighbor.node,
          distances: {},
          message: `Discovered ${neighbor.node}`,
        });
      }
    }
  }

  steps.push({
    stepNumber: stepNumber,
    visitedNodes: new Set(visited),
    visitedEdges: new Set(visitedEdges),
    currentNodeId: null,
    distances: {},
    message: "Breadth-First Search Complete",
  });

  return steps;
}