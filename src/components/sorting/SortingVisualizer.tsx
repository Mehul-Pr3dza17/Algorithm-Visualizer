import type { SortingArrayItem } from "../../types/visualizer";
import Bar from "./Bar";

interface Props {
  array: SortingArrayItem[];
}

export default function SortingVisualizer({ array }: Props) {
  const count = array.length;

  const gap =
    count <= 15
      ? 8
      : count <= 30
      ? 4
      : count <= 60
      ? 2
      : 1;

  const barWidth = Math.max(
    4,
    Math.floor((1100 - gap * (count - 1)) / count)
  );

  return (
    <div className="h-[520px] rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div
        className="flex h-full items-end"
        style={{
          gap: `${gap}px`,
        }}
      >
        {array.map((item) => (
          <Bar
            key={item.id}
            item={item}
            width={barWidth}
          />
        ))}
      </div>

    </div>
  );
}