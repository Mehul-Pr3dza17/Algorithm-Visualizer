import type {
  SortingArrayItem,
  SortingStep,
} from "../../types/visualizer";

import {
  cloneArray,
  createStep,
  resetStepCounter,
  swap,
} from "./helpers";

export function generateHeapSortSteps(
  input: SortingArrayItem[]
): SortingStep[] {

  resetStepCounter();

  const array = cloneArray(input);
  const steps: SortingStep[] = [];
  const sorted: number[] = [];

  steps.push(createStep(array, "Initial Array"));

  function heapify(size: number, root: number) {

    let largest = root;

    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {

      steps.push(
        createStep(
          array,
          `Comparing ${array[left].value} with ${array[largest].value}`,
          [left, largest],
          [],
          sorted
        )
      );

      if (array[left].value > array[largest].value) {
        largest = left;
      }
    }

    if (right < size) {

      steps.push(
        createStep(
          array,
          `Comparing ${array[right].value} with ${array[largest].value}`,
          [right, largest],
          [],
          sorted
        )
      );

      if (array[right].value > array[largest].value) {
        largest = right;
      }
    }

    if (largest !== root) {

      steps.push(
        createStep(
          array,
          `Swapping ${array[root].value} and ${array[largest].value}`,
          [],
          [root, largest],
          sorted
        )
      );

      swap(array, root, largest);

      heapify(size, largest);
    }
  }

  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  steps.push(
    createStep(
      array,
      "Max Heap Built"
    )
  );

  for (let end = n - 1; end > 0; end--) {

    steps.push(
      createStep(
        array,
        `Moving maximum ${array[0].value} to index ${end}`,
        [],
        [0, end],
        sorted
      )
    );

    swap(array, 0, end);

    sorted.unshift(end);

    heapify(end, 0);
  }

  sorted.unshift(0);

  steps.push(
    createStep(
      array,
      "Sorting Complete",
      [],
      [],
      [...sorted]
    )
  );

  return steps;
}