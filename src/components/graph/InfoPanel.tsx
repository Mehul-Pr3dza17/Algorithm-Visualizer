import type { GraphAlgorithm } from "../../types/visualizer";

interface InfoPanelProps {
  algorithm: GraphAlgorithm;
  message: string;
  currentStep: number;
  totalSteps: number;
  nodeCount: number;
  edgeCount: number;
}

const metadata = {
  bfs: {
    name: "Breadth-First Search",
    time: "O(V + E)",
    space: "O(V)",
    description:
      "Explores a graph level by level using a queue. It visits all reachable neighbors before moving deeper.",
  },

  dfs: {
    name: "Depth-First Search",
    time: "O(V + E)",
    space: "O(V)",
    description:
      "Explores as far as possible along each branch before backtracking.",
  },

  dijkstra: {
    name: "Dijkstra's Algorithm",
    time: "O(V² + E)",
    space: "O(V + E)",
    description:
      "Finds shortest paths from a starting node to reachable nodes using the smallest currently known distance.",
  },
} satisfies Record<
  GraphAlgorithm,
  {
    name: string;
    time: string;
    space: string;
    description: string;
  }
>;

export default function InfoPanel({
  algorithm,
  message,
  currentStep,
  totalSteps,
  nodeCount,
  edgeCount,
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
          <p className="text-slate-500">
            Time
          </p>
          <p>{info.time}</p>
        </div>

        <div>
          <p className="text-slate-500">
            Space
          </p>
          <p>{info.space}</p>
        </div>

        <div>
          <p className="text-slate-500">
            Nodes
          </p>
          <p>{nodeCount}</p>
        </div>

        <div>
          <p className="text-slate-500">
            Edges
          </p>
          <p>{edgeCount}</p>
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