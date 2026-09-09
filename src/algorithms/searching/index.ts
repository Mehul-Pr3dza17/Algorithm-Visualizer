import type {
  SearchingAlgorithm,
  SearchArrayItem,
  SearchingStep,
} from "../../types/visualizer";

import { generateLinearSearchSteps } from "./linear";
import { generateBinarySearchSteps } from "./binary";

export function generateSearchingSteps(
  algorithm: SearchingAlgorithm,
  array: SearchArrayItem[],
  target: number
): SearchingStep[] {

  switch (algorithm) {

    case "linear":
      return generateLinearSearchSteps(array, target);

    case "binary":
      return generateBinarySearchSteps(array, target);

    default:
      return [];
  }
}