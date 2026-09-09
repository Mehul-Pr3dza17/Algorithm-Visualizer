import type {
  SearchArrayItem,
  SearchingStep,
} from "../../types/visualizer";

export function generateBinarySearchSteps(
  input: SearchArrayItem[],
  target: number
): SearchingStep[] {

  const array = input.map(item => ({ ...item }));
  const steps: SearchingStep[] = [];
  let stepNumber = 0;

  let left = 0;
  let right = array.length - 1;

  steps.push({
    stepNumber: stepNumber++,
    array: array.map(item => ({ ...item })),
    currentIndex: -1,
    foundIndex: -1,
    visitedIndices: [],
    message: `Searching for ${target}`,
  });

  while (left <= right) {

    const mid = Math.floor((left + right) / 2);

    const visited: number[] = [];
    for (let i = left; i <= right; i++) {
      visited.push(i);
    }

    steps.push({
      stepNumber: stepNumber++,
      array: array.map(item => ({ ...item })),
      currentIndex: mid,
      foundIndex: -1,
      visitedIndices: visited,
      message: `Middle value is ${array[mid].value}`,
    });

    if (array[mid].value === target) {
      steps.push({
        stepNumber: stepNumber,
        array: array.map(item => ({ ...item })),
        currentIndex: mid,
        foundIndex: mid,
        visitedIndices: visited,
        message: `Found ${target} at index ${mid}`,
      });

      return steps;
    }

    if (array[mid].value < target) {

      steps.push({
        stepNumber: stepNumber++,
        array: array.map(item => ({ ...item })),
        currentIndex: mid,
        foundIndex: -1,
        visitedIndices: visited,
        message: `${target} is greater than ${array[mid].value}. Search right.`,
      });

      left = mid + 1;

    } else {

      steps.push({
        stepNumber: stepNumber++,
        array: array.map(item => ({ ...item })),
        currentIndex: mid,
        foundIndex: -1,
        visitedIndices: visited,
        message: `${target} is less than ${array[mid].value}. Search left.`,
      });

      right = mid - 1;
    }
  }

  steps.push({
    stepNumber: stepNumber,
    array: array.map(item => ({ ...item })),
    currentIndex: -1,
    foundIndex: -1,
    visitedIndices: [],
    message: `${target} not found`,
  });

  return steps;
}