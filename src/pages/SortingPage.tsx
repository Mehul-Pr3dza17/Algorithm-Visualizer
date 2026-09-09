import { useMemo, useState } from "react";

import type {
  SortingAlgorithm,
  SortingArrayItem,
} from "../types/visualizer";

import { generateSortingSteps } from "../algorithms/sorting";
import { usePlayback } from "../hooks/usePlayback";
import { generateRandomArray } from "../utils/generateRandomArray";

import SortingVisualizer from "../components/sorting/SortingVisualizer";
import ControlPanel from "../components/controls/ControlPanel";
import InfoPanel from "../components/sorting/InfoPanel";

export default function SortingPage() {
  const [algorithm, setAlgorithm] =
    useState<SortingAlgorithm>("bubble");

  const [arraySize, setArraySize] = useState(10);

  const [speed, setSpeed] = useState(350);

  const [array, setArray] = useState<SortingArrayItem[]>(
    () => generateRandomArray(10)
  );

  const steps = useMemo(
    () => generateSortingSteps(algorithm, array),
    [algorithm, array]
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

  function generateNewArray() {
    setArray(generateRandomArray(arraySize));
  }

  function handleArraySize(size: number) {
    setArraySize(size);
    setArray(generateRandomArray(size));
  }

  return (
    <div className="space-y-6">

      <ControlPanel
        algorithm={algorithm}
        onAlgorithmChange={(value) =>
          setAlgorithm(value as SortingAlgorithm)
        }

        arraySize={arraySize}
        onArraySizeChange={handleArraySize}

        speed={speed}
        onSpeedChange={setSpeed}

        onGenerate={generateNewArray}

        onPlay={play}
        onPause={pause}
        onPrevious={previous}
        onNext={next}
        onReset={reset}
        currentStep={currentStep}
totalSteps={totalSteps}
onSeek={seek}
      />

    <div className="grid grid-cols-12 gap-6">

  <div className="col-span-8">

    <SortingVisualizer
      array={current.array}
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