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

export function generateQuickSortSteps(
  input: SortingArrayItem[]
): SortingStep[] {

  resetStepCounter();

  const array = cloneArray(input);
  const steps: SortingStep[] = [];
  const sorted: number[] = [];

  steps.push(createStep(array, "Initial Array"));

  function partition(low: number, high: number): number {

    const pivot = array[high].value;

    steps.push(
      createStep(
        array,
        `Choosing ${pivot} as pivot`,
        [],
        [],
        sorted,
        high
      )
    );

    let i = low - 1;

    for (let j = low; j < high; j++) {

      steps.push(
        createStep(
          array,
          `Comparing ${array[j].value} with pivot ${pivot}`,
          [j],
          [],
          sorted,
          high
        )
      );

      if (array[j].value < pivot) {

        i++;

        if (i !== j) {

          steps.push(
            createStep(
              array,
              `Swapping ${array[i].value} and ${array[j].value}`,
              [],
              [i, j],
              sorted,
              high
            )
          );

          swap(array, i, j);
        }
      }
    }

    steps.push(
      createStep(
        array,
        `Placing pivot in correct position`,
        [],
        [i + 1, high],
        sorted,
        high
      )
    );

    swap(array, i + 1, high);

    sorted.push(i + 1);

    return i + 1;
  }

  function quickSort(low: number, high: number) {

    if (low < high) {

      const pivotIndex = partition(low, high);

      quickSort(low, pivotIndex - 1);
      quickSort(pivotIndex + 1, high);

    } else if (
      low === high &&
      !sorted.includes(low)
    ) {
      sorted.push(low);
    }
  }

  quickSort(0, array.length - 1);

  const finalSorted = array.map((_, i) => i);

  steps.push(
    createStep(
      array,
      "Sorting Complete",
      [],
      [],
      finalSorted
    )
  );

  return steps;
}