import type {
  SearchArrayItem,
  SearchingStep,
} from "../../types/visualizer";

export function generateLinearSearchSteps(
  input: SearchArrayItem[],
  target: number
): SearchingStep[] {
  const array = input.map(item => ({ ...item }));
  const steps: SearchingStep[] = [];
  let stepNumber = 0;

  steps.push({
    stepNumber: stepNumber++,
    array: array.map(item => ({ ...item })),
    currentIndex: -1,
    foundIndex: -1,
    visitedIndices: [],
    message: `Searching for ${target}`,
  });

  const visited: number[] = [];

  for (let i = 0; i < array.length; i++) {
    visited.push(i);

    steps.push({
      stepNumber: stepNumber++,
      array: array.map(item => ({ ...item })),
      currentIndex: i,
      foundIndex: -1,
      visitedIndices: [...visited],
      message: `Checking ${array[i].value}`,
    });

    if (array[i].value === target) {
      steps.push({
        stepNumber: stepNumber,
        array: array.map(item => ({ ...item })),
        currentIndex: i,
        foundIndex: i,
        visitedIndices: [...visited],
        message: `Found ${target} at index ${i}`,
      });

      return steps;
    }
  }

  steps.push({
    stepNumber: stepNumber,
    array: array.map(item => ({ ...item })),
    currentIndex: -1,
    foundIndex: -1,
    visitedIndices: [...visited],
    message: `${target} not found`,
  });

  return steps;
}