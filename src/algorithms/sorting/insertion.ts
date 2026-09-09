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

export function generateInsertionSortSteps(
  input: SortingArrayItem[]
): SortingStep[] {
  resetStepCounter();

  const array = cloneArray(input);

  const steps: SortingStep[] = [];

  const sorted: number[] = [0];

  steps.push(createStep(array, "Initial Array"));

  for (let i = 1; i < array.length; i++) {
    let j = i;

    steps.push(
      createStep(
        array,
        `Inserting ${array[j].value} into the sorted portion`,
        [j],
        [],
        sorted
      )
    );

    while (
      j > 0 &&
      array[j - 1].value > array[j].value
    ) {
      steps.push(
        createStep(
          array,
          `Comparing ${array[j - 1].value} and ${array[j].value}`,
          [j - 1, j],
          [],
          sorted
        )
      );

      steps.push(
        createStep(
          array,
          `Swapping ${array[j - 1].value} and ${array[j].value}`,
          [],
          [j - 1, j],
          sorted
        )
      );

      swap(array, j - 1, j);

      j--;
    }

    sorted.length = 0;

    for (let k = 0; k <= i; k++) {
      sorted.push(k);
    }

    steps.push(
      createStep(
        array,
        `${array[j].value} inserted successfully`,
        [],
        [],
        [...sorted]
      )
    );
  }

  return steps;
}