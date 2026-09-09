import { useEffect, useState } from "react";

export function usePlayback<T>(
  steps: T[],
  interval = 400
) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || steps.length <= 1) {
      return;
    }

    if (currentStep >= steps.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      const nextStep = Math.min(
        currentStep + 1,
        steps.length - 1
      );

      setCurrentStep(nextStep);

      if (nextStep >= steps.length - 1) {
        setIsPlaying(false);
      }
    }, interval);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, interval]);

  function play() {
    if (steps.length <= 1) return;

    if (currentStep >= steps.length - 1) {
      return;
    }

    setIsPlaying(true);
  }

  function pause() {
    setIsPlaying(false);
  }

  function reset() {
    setCurrentStep(0);
    setIsPlaying(false);
  }

  function next() {
    setIsPlaying(false);

    setCurrentStep((prev) =>
      Math.min(prev + 1, steps.length - 1)
    );
  }

  function previous() {
    setIsPlaying(false);

    setCurrentStep((prev) =>
      Math.max(prev - 1, 0)
    );
  }

  function seek(step: number) {
    setIsPlaying(false);

    setCurrentStep(
      Math.max(0, Math.min(step, steps.length - 1))
    );
  }

  return {
    currentStep,
    totalSteps: steps.length,
    current: steps[currentStep],
    isPlaying,
    play,
    pause,
    reset,
    next,
    previous,
    seek,
  };
}