import type {
  SortingArrayItem,
  SortingStep,
  BarState,
} from "../../types/visualizer";

let currentStep = 0;
/**
 * Creates a deep copy of the array so every step is independent.
 */
export function cloneArray(
  array: SortingArrayItem[]
): SortingArrayItem[] {
  return array.map(item => ({
    ...item
  }));
}

/**
 * Swaps two elements.
 */
export function swap(
  array: SortingArrayItem[],
  i: number,
  j: number
): void {
  [array[i], array[j]] = [array[j], array[i]];
}

export function resetStepCounter() {
  currentStep = 0;
}
/**
 * Generates a visualization step.
 */
export function createStep(
  array: SortingArrayItem[],
  message: string,
  activeIndices: number[] = [],
  swapIndices: number[] = [],
  sortedIndices: number[] = [],
  pivotIndex?: number
): SortingStep {

  const snapshot = cloneArray(array);

  snapshot.forEach((item, index) => {

    let state: BarState = "default";

    if (sortedIndices.includes(index))
      state = "sorted";
    else if (pivotIndex === index)
      state = "pivot";
    else if (swapIndices.includes(index))
      state = "swapping";
    else if (activeIndices.includes(index))
      state = "comparing";

    item.state = state;
  });

  
  return {
    stepNumber: currentStep++,
    array: snapshot,
    activeIndices,
    swapIndices,
    sortedIndices,
    pivotIndex,
    message
  };
}