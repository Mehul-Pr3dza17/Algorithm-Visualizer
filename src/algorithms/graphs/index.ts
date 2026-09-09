import type {
  GraphAlgorithm,
  GraphNode,
  GraphEdge,
  GraphStep,
} from "../../types/visualizer";

import { generateBFSSteps } from "./bfs";
import { generateDFSSteps } from "./dfs";
import { generateDijkstraSteps } from "./dijkstra";

export function generateGraphSteps(
  algorithm: GraphAlgorithm,
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string
): GraphStep[] {
  switch (algorithm) {
    case "bfs":
      return generateBFSSteps(nodes, edges, startNodeId);

    case "dfs":
      return generateDFSSteps(nodes, edges, startNodeId);

    case "dijkstra":
      return generateDijkstraSteps(nodes, edges, startNodeId);

    default:
      return [];
  }
}