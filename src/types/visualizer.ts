export type PlaybackStatus = "idle" | "running" | "paused" | "completed";

/* ---------- Sorting ---------- */

export type SortingAlgorithm =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick"
  | "heap";

export type BarState =
  | "default"
  | "comparing"
  | "swapping"
  | "sorted"
  | "pivot";

export interface SortingArrayItem {
  id: string;
  value: number;
  state: BarState;
}

export interface SortingStep {
  stepNumber: number;
  array: SortingArrayItem[];
  activeIndices: number[];
  swapIndices: number[];
  sortedIndices: number[];
  pivotIndex?: number;
  message: string;
}

/* ---------- Searching ---------- */

export type SearchingAlgorithm =
  | "linear"
  | "binary";

export type SearchState =
  | "default"
  | "current"
  | "range"
  | "found"
  | "eliminated";

export interface SearchArrayItem {
  id: string;
  value: number;
  state: SearchState;
}

export interface SearchingStep {
  stepNumber: number;
  array: SearchArrayItem[];
  currentIndex: number;
  foundIndex: number;
  visitedIndices: number[];
  message: string;
}

/* ---------- Graph ---------- */

export type GraphAlgorithm =
  | "bfs"
  | "dfs"
  | "dijkstra";

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
}

export interface GraphStep {
  stepNumber: number;
  visitedNodes: Set<string>;
  visitedEdges: Set<string>;
  currentNodeId: string | null;
  distances: Record<string, number>;
  message: string;
}