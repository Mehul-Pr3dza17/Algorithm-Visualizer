import type { SortingArrayItem } from "../types/visualizer";

export function generateRandomArray(size: number): SortingArrayItem[] {
  return Array.from({ length: size }, (_, index) => ({
    id: index.toString(),
    value: Math.floor(Math.random() * 90) + 10,
    state: "default",
  }));
}