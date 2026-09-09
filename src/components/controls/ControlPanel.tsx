interface ControlPanelProps {
  algorithm: string;
  onAlgorithmChange: (value: string) => void;

  arraySize: number;
  onArraySizeChange: (value: number) => void;

  speed: number;
  onSpeedChange: (value: number) => void;

  onGenerate: () => void;

  onPlay: () => void;
  onPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
 onReset: () => void;

currentStep: number;
totalSteps: number;
onSeek: (step: number) => void;
}

export default function ControlPanel({
  algorithm,
  onAlgorithmChange,

  arraySize,
  onArraySizeChange,

  speed,
  onSpeedChange,

  onGenerate,

  onPlay,
  onPause,
  onPrevious,
  onNext,
  onReset,

currentStep,
totalSteps,
onSeek,
}: ControlPanelProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">

      <div className="flex flex-wrap items-center gap-4">

        <select
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          className="rounded border border-slate-700 bg-slate-800 px-3 py-2"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="heap">Heap Sort</option>
        </select>

        <button
          onClick={onGenerate}
          className="rounded bg-slate-700 px-4 py-2"
        >
          Generate Array
        </button>

        <button onClick={onPlay} className="rounded bg-blue-600 px-4 py-2">
          Play
        </button>

        <button onClick={onPause} className="rounded bg-yellow-600 px-4 py-2">
          Pause
        </button>

        <button onClick={onPrevious} className="rounded bg-slate-700 px-4 py-2">
          Previous
        </button>

        <button onClick={onNext} className="rounded bg-slate-700 px-4 py-2">
          Next
        </button>

        <button onClick={onReset} className="rounded bg-red-600 px-4 py-2">
          Reset
        </button>

      </div>

      <div className="mt-5 grid grid-cols-2 gap-6">

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Array Size: {arraySize}
          </label>

          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) =>
              onArraySizeChange(Number(e.target.value))
            }
            className="w-full"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Speed: {speed} ms
          </label>

          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) =>
              onSpeedChange(Number(e.target.value))
            }
            className="w-full"
          />

        </div>

      </div>
<div className="mt-6">

  <div className="mb-2 flex justify-between text-sm text-slate-400">
    <span>Timeline</span>
    <span>
      Step {currentStep + 1} / {totalSteps}
    </span>
  </div>

  <input
    type="range"
    min={0}
    max={Math.max(totalSteps - 1, 0)}
    value={currentStep}
    onChange={(e) => onSeek(Number(e.target.value))}
    className="w-full"
  />

</div>
    </div>
  );
}