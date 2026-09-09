import { useMemo, useState } from "react";

import type {
  SearchArrayItem,
  SearchingAlgorithm,
} from "../types/visualizer";

import InfoPanel from "../components/searching/InfoPanel";
import { generateSearchingSteps } from "../algorithms/searching";
import { usePlayback } from "../hooks/usePlayback";

import SearchVisualizer from "../components/searching/SearchVisualizer";

function generateSortedSearchArray(size: number): SearchArrayItem[] {
  const values = new Set<number>();

  while (values.size < size) {
    values.add(Math.floor(Math.random() * 991) + 10);
  }

  return Array.from(values)
    .sort((a, b) => a - b)
    .map((value, index) => ({
      id: index.toString(),
      value,
      state: "default",
    }));
}

export default function SearchingPage() {
  const [algorithm, setAlgorithm] =
    useState<SearchingAlgorithm>("linear");

  const [target, setTarget] = useState(42);

  const [speed, setSpeed] = useState(350);
const [arraySize, setArraySize] = useState(10);
const [array, setArray] = useState<SearchArrayItem[]>(
  () => generateSortedSearchArray(10)
);
  const steps = useMemo(
    () => generateSearchingSteps(algorithm, array, target),
    [algorithm, array, target]
  );

  const {
    current,
    currentStep,
    totalSteps,
    play,
    pause,
    reset,
    next,
    previous,
    seek,
  } = usePlayback(steps, speed);

  function handleAlgorithmChange(
    nextAlgorithm: SearchingAlgorithm
  ) {
    setAlgorithm(nextAlgorithm);

    if (nextAlgorithm === "binary") {
      setArray((currentArray) =>
        [...currentArray].sort((a, b) => a.value - b.value)
      );
    }
  }

function randomizeArray() {
  setArray(generateSortedSearchArray(arraySize));
}
  return (
    <div className="space-y-6">

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">

        <div className="flex flex-wrap items-center gap-4">

          <select
            value={algorithm}
            onChange={(event) =>
              handleAlgorithmChange(
                event.target.value as SearchingAlgorithm
              )
            }
            className="rounded border border-slate-700 bg-slate-800 px-3 py-2"
          >
            <option value="linear">Linear Search</option>
            <option value="binary">Binary Search</option>
          </select>

          <label className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Target
            </span>

            <input
              type="number"
              value={target}
              onChange={(event) =>
                setTarget(Number(event.target.value))
              }
              className="w-24 rounded border border-slate-700 bg-slate-800 px-3 py-2"
            />
          </label>

<button
  onClick={randomizeArray}
  className="rounded bg-slate-700 px-4 py-2"
>
  Randomize
</button>

          <button
            onClick={play}
            className="rounded bg-blue-600 px-4 py-2"
          >
            Play
          </button>

          <button
            onClick={pause}
            className="rounded bg-yellow-600 px-4 py-2"
          >
            Pause
          </button>

          <button
            onClick={previous}
            className="rounded bg-slate-700 px-4 py-2"
          >
            Previous
          </button>

          <button
            onClick={next}
            className="rounded bg-slate-700 px-4 py-2"
          >
            Next
          </button>

          <button
            onClick={reset}
            className="rounded bg-red-600 px-4 py-2"
          >
            Reset
          </button>

        </div>

        <div className="mt-5">

          <div className="mb-2 flex justify-between text-sm text-slate-400">
            <span>Speed: {speed} ms</span>

            <span>
              Step {currentStep + 1} / {totalSteps}
            </span>
          </div>

          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(event) =>
              setSpeed(Number(event.target.value))
            }
            className="w-full"
          />

        </div>

<div className="mt-5">

  <div className="mb-2 flex justify-between text-sm text-slate-400">
    <span>Array Size: {arraySize}</span>
    <span>10–100</span>
  </div>

  <input
    type="range"
    min="10"
    max="100"
    value={arraySize}
    onChange={(event) => {
      const size = Number(event.target.value);
      setArraySize(size);
      setArray(generateSortedSearchArray(size));
    }}
    className="w-full"
  />

</div>

        <div className="mt-5">

          <div className="mb-2 flex justify-between text-sm text-slate-400">
            <span>Timeline</span>

            <span>
              Step {currentStep + 1} / {totalSteps}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={Math.max(totalSteps - 1, 0)}
            value={currentStep}
            onChange={(event) =>
              seek(Number(event.target.value))
            }
            className="w-full"
          />

        </div>

      </div>

     <div className="grid grid-cols-12 gap-6">

  <div className="col-span-8">
    <SearchVisualizer
      array={current.array}
      currentIndex={current.currentIndex}
      foundIndex={current.foundIndex}
      visitedIndices={current.visitedIndices}
    />
  </div>

  <div className="col-span-4">
    <InfoPanel
      algorithm={algorithm}
      message={current.message}
      currentStep={currentStep}
      totalSteps={totalSteps}
    />
  </div>

</div>

    </div>
  );
}