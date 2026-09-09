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

export function generateSelectionSortSteps(
  input: SortingArrayItem[]
): SortingStep[] {
  resetStepCounter();

  const array = cloneArray(input);
  const steps: SortingStep[] = [];
  const sorted: number[] = [];

  steps.push(createStep(array, "Initial Array"));

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    steps.push(
      createStep(
        array,
        `Assuming ${array[minIndex].value} is the minimum`,
        [i],
        [],
        sorted,
        minIndex
      )
    );

    for (let j = i + 1; j < array.length; j++) {
      steps.push(
        createStep(
          array,
          `Comparing ${array[j].value} with current minimum ${array[minIndex].value}`,
          [j, minIndex],
          [],
          sorted,
          minIndex
        )
      );

      if (array[j].value < array[minIndex].value) {
        minIndex = j;

        steps.push(
          createStep(
            array,
            `New minimum found: ${array[minIndex].value}`,
            [minIndex],
            [],
            sorted,
            minIndex
          )
        );
      }
    }

    if (minIndex !== i) {
      steps.push(
        createStep(
          array,
          `Swapping ${array[i].value} and ${array[minIndex].value}`,
          [],
          [i, minIndex],
          sorted
        )
      );

      swap(array, i, minIndex);
    }

    sorted.push(i);

    steps.push(
      createStep(
        array,
        `${array[i].value} is now in its final position`,
        [],
        [],
        sorted
      )
    );
  }

  return steps;
}