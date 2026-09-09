import type {
  SortingArrayItem,
  SortingStep,
} from "../../types/visualizer";

import {
  cloneArray,
  createStep,
  swap,
} from "./helpers";

import{
  resetStepCounter,
} from  "./helpers";

export function generateBubbleSortSteps(
  input: SortingArrayItem[]
): SortingStep[] {

  resetStepCounter();
  const array = cloneArray(input);

  const steps: SortingStep[] = [];

  const sorted: number[] = [];

  steps.push(
    createStep(array, "Initial Array")
  );

  for (let i = 0; i < array.length - 1; i++) {

    for (let j = 0; j < array.length - i - 1; j++) {

      steps.push(
        createStep(
          array,
          `Comparing ${array[j].value} and ${array[j + 1].value}`,
          [j, j + 1],
          [],
          sorted
        )
      );

      if (array[j].value > array[j + 1].value) {

        steps.push(
          createStep(
            array,
            `Swapping ${array[j].value} and ${array[j + 1].value}`,
            [],
            [j, j + 1],
            sorted
          )
        );

        swap(array, j, j + 1);
      }
    }

    sorted.push(array.length - i - 1);

    steps.push(
      createStep(
        array,
        `Element ${array[array.length - i - 1].value} is in its final position`,
        [],
        [],
        sorted
      )
    );
  }

  sorted.push(0);

  steps.push(
    createStep(
      array,
      "Sorting Complete",
      [],
      [],
      sorted
    )
  );

  return steps;
}