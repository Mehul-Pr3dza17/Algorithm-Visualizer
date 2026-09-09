import type { SortingAlgorithm } from "../types/visualizer";

export interface SortingMetadata {
  name: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  stable: string;
  description: string;
}

export const sortingMetadata: Record<
  SortingAlgorithm,
  SortingMetadata
> = {
  bubble: {
    name: "Bubble Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Yes",
    description:
      "Repeatedly compares adjacent elements and swaps them until the array is sorted.",
  },

  selection: {
    name: "Selection Sort",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "No",
    description:
      "Repeatedly selects the minimum element from the unsorted portion.",
  },

  insertion: {
    name: "Insertion Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Yes",
    description:
      "Builds the sorted array one element at a time.",
  },

  merge: {
    name: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: "Yes",
    description:
      "Uses divide-and-conquer by recursively splitting and merging arrays.",
  },

  quick: {
    name: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    stable: "No",
    description:
      "Partitions the array around a pivot and recursively sorts each partition.",
  },

  heap: {
    name: "Heap Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",
    stable: "No",
    description:
      "Builds a max heap and repeatedly extracts the largest element.",
  },
};