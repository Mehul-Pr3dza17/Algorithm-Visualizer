import type {
  GraphNode,
  GraphEdge,
  GraphStep,
} from "../../types/visualizer";

export function generateDijkstraSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string
): GraphStep[] {

  const steps: GraphStep[] = [];
  let stepNumber = 0;

  const visitedNodes = new Set<string>();
  const visitedEdges = new Set<string>();

  const distances: Record<string, number> = {};

  const adjacency = new Map<
    string,
    {
      node: string;
      edge: string;
      weight: number;
    }[]
  >();

  for (const node of nodes) {
    distances[node.id] = Infinity;
    adjacency.set(node.id, []);
  }

  distances[startNodeId] = 0;

  for (const edge of edges) {
    adjacency.get(edge.source)?.push({
      node: edge.target,
      edge: edge.id,
      weight: edge.weight,
    });

    adjacency.get(edge.target)?.push({
      node: edge.source,
      edge: edge.id,
      weight: edge.weight,
    });
  }

  while (visitedNodes.size < nodes.length) {

    let current: string | null = null;
    let smallest = Infinity;

    for (const node of nodes) {

      if (
        !visitedNodes.has(node.id) &&
        distances[node.id] < smallest
      ) {
        smallest = distances[node.id];
        current = node.id;
      }
    }

    if (current === null) {
      break;
    }

    visitedNodes.add(current);

    steps.push({
      stepNumber: stepNumber++,
      visitedNodes: new Set(visitedNodes),
      visitedEdges: new Set(visitedEdges),
      currentNodeId: current,
      distances: { ...distances },
      message: `Processing ${current}`,
    });

    for (const neighbor of adjacency.get(current) ?? []) {

      if (visitedNodes.has(neighbor.node)) {
        continue;
      }

      const newDistance =
        distances[current] + neighbor.weight;

      if (newDistance < distances[neighbor.node]) {

        distances[neighbor.node] = newDistance;
        visitedEdges.add(neighbor.edge);

        steps.push({
          stepNumber: stepNumber++,
          visitedNodes: new Set(visitedNodes),
          visitedEdges: new Set(visitedEdges),
          currentNodeId: neighbor.node,
          distances: { ...distances },
          message: `Updated distance to ${neighbor.node}: ${newDistance}`,
        });
      }
    }
  }

  steps.push({
    stepNumber: stepNumber,
    visitedNodes: new Set(visitedNodes),
    visitedEdges: new Set(visitedEdges),
    currentNodeId: null,
    distances: { ...distances },
    message: "Dijkstra Complete",
  });

  return steps;
}