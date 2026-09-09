import { sortingMetadata } from "../../data/sortingMetadata";
import type { SortingAlgorithm } from "../../types/visualizer";

interface InfoPanelProps {
  algorithm: SortingAlgorithm;
  message: string;
  currentStep: number;
  totalSteps: number;
}

export default function InfoPanel({
  algorithm,
  message,
  currentStep,
  totalSteps,
}: InfoPanelProps) {
  const info = sortingMetadata[algorithm];

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

        <div>
          <p className="text-slate-500">Stable</p>
          <p>{info.stable}</p>
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