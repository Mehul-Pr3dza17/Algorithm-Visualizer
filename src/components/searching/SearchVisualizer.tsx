import { useState } from "react";
import type { SearchArrayItem } from "../../types/visualizer";

interface SearchVisualizerProps {
  array: SearchArrayItem[];
  currentIndex: number;
  foundIndex: number;
  visitedIndices: number[];
}

export default function SearchVisualizer({
  array,
  currentIndex,
  foundIndex,
  visitedIndices,
}: SearchVisualizerProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...array.map((item) => item.value), 1);

  const showLabels = array.length <= 25;

  return (
    <div className="h-[520px] overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex h-full w-full items-end justify-center gap-1">
        {array.map((item, index) => {
          const isFound = index === foundIndex;
          const isCurrent = index === currentIndex;
          const isVisited = visitedIndices.includes(index);
          const isHovered = index === hoveredIndex;

          let background = "#3b82f6";

          if (isFound) {
            background = "#22c55e";
          } else if (isCurrent) {
            background = "#f59e0b";
          } else if (isVisited) {
            background = "#64748b";
          }

          const height = Math.max(
            (item.value / maxValue) * 440,
            8
          );

          return (
            <div
              key={item.id}
              className="relative flex h-full min-w-0 flex-1 flex-col items-center justify-end"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {isHovered && !showLabels && (
                <div className="absolute bottom-[450px] z-10 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white shadow-lg">
                  Value: {item.value} · Index: {index}
                </div>
              )}

              <div
                className="w-full rounded-t transition-opacity"
                style={{
                  height: `${height}px`,
                  maxWidth: "48px",
                  background,
                  opacity:
                    hoveredIndex !== null && !isHovered
                      ? 0.65
                      : 1,
                }}
              />

              {showLabels && (
                <>
                  <span className="mt-2 text-xs text-slate-400">
                    {item.value}
                  </span>

                  <span className="text-xs text-slate-600">
                    {index}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}