import type { SearchingAlgorithm } from "../../types/visualizer";

interface InfoPanelProps {
  algorithm: SearchingAlgorithm;
  message: string;
  currentStep: number;
  totalSteps: number;
}

const metadata = {
  linear: {
    name: "Linear Search",
    best: "O(1)",
    average: "O(n)",
    worst: "O(n)",
    space: "O(1)",
    description:
      "Checks each element from left to right until the target is found or the array is exhausted.",
  },

  binary: {
    name: "Binary Search",
    best: "O(1)",
    average: "O(log n)",
    worst: "O(log n)",
    space: "O(1)",
    description:
      "Repeatedly divides a sorted search range in half, eliminating half of the remaining elements each step.",
  },
} satisfies Record<SearchingAlgorithm, {
  name: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  description: string;
}>;

export default function InfoPanel({
  algorithm,
  message,
  currentStep,
  totalSteps,
}: InfoPanelProps) {
  const info = metadata[algorithm];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-semibold">
        {info.name}
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {info.description}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-slate-500">Best</p>
          <p>{info.best}</p>
        </div>

        <div>
          <p className="text-slate-500">Average</p>
          <p>{info.average}</p>
        </div>

        <div>
          <p className="text-slate-500">Worst</p>
          <p>{info.worst}</p>
        </div>

        <div>
          <p className="text-slate-500">Space</p>
          <p>{info.space}</p>
        </div>

      </div>

      <div className="mt-8 border-t border-slate-800 pt-5">

        <p className="text-sm text-slate-500">
          Current Step
        </p>

        <p className="mt-2">
          {message}
        </p>

        <p className="mt-5 text-sm text-slate-400">
          Step {currentStep + 1} of {totalSteps}
        </p>

      </div>

    </div>
  );
}