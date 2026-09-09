import type {
  SortingArrayItem,
  SortingStep,
} from "../../types/visualizer";

import {
  cloneArray,
  createStep,
  resetStepCounter,
} from "./helpers";

export function generateMergeSortSteps(
  input: SortingArrayItem[]
): SortingStep[] {

  resetStepCounter();

  const array = cloneArray(input);
  const steps: SortingStep[] = [];

  steps.push(createStep(array, "Initial Array"));

  function merge(left: number, mid: number, right: number) {

    const leftHalf = array.slice(left, mid + 1);
    const rightHalf = array.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftHalf.length && j < rightHalf.length) {

      steps.push(
        createStep(
          array,
          `Comparing ${leftHalf[i].value} and ${rightHalf[j].value}`,
          [k]
        )
      );

      if (leftHalf[i].value <= rightHalf[j].value) {
        array[k] = { ...leftHalf[i] };
        i++;
      } else {
        array[k] = { ...rightHalf[j] };
        j++;
      }

      steps.push(
        createStep(
          array,
          `Writing ${array[k].value}`,
          [],
          [k]
        )
      );

      k++;
    }

    while (i < leftHalf.length) {

      array[k] = { ...leftHalf[i] };

      steps.push(
        createStep(
          array,
          `Writing ${array[k].value}`,
          [],
          [k]
        )
      );

      i++;
      k++;
    }

    while (j < rightHalf.length) {

      array[k] = { ...rightHalf[j] };

      steps.push(
        createStep(
          array,
          `Writing ${array[k].value}`,
          [],
          [k]
        )
      );

      j++;
      k++;
    }
  }

  function mergeSort(left: number, right: number) {

    if (left >= right)
      return;

    const mid = Math.floor((left + right) / 2);

    mergeSort(left, mid);
    mergeSort(mid + 1, right);

    steps.push(
      createStep(
        array,
        `Merging [${left}-${mid}] and [${mid + 1}-${right}]`
      )
    );

    merge(left, mid, right);
  }

  mergeSort(0, array.length - 1);

  const sorted = array.map((_, i) => i);

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