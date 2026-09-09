import type {
  SortingAlgorithm,
  SortingArrayItem,
  SortingStep,
} from "../../types/visualizer";

import { generateBubbleSortSteps } from "./bubble";


import { generateSelectionSortSteps } from "./selection";
import { generateInsertionSortSteps } from "./insertion";
import { generateMergeSortSteps } from "./merge";
import { generateQuickSortSteps } from "./quick";
import { generateHeapSortSteps } from "./heap";

export function generateSortingSteps(
  algorithm: SortingAlgorithm,
  array: SortingArrayItem[]
): SortingStep[] {
  switch (algorithm) {
    case "bubble":
      return generateBubbleSortSteps(array);

    case "selection":
      return generateSelectionSortSteps(array);

    case "insertion":
      return generateInsertionSortSteps(array);

    case "merge":
      return generateMergeSortSteps(array);

    case "quick":
      return generateQuickSortSteps(array);

    case "heap":
      return generateHeapSortSteps(array);

    default:
      return [];
  }
}