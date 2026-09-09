import { useState } from "react";

import type {
  GraphEdge,
  GraphNode,
} from "../../types/visualizer";

interface GraphEditorPanelProps {
  nodeCount: number;
  nodes: GraphNode[];
  edges: GraphEdge[];

  onNodeCountChange: (count: number) => void;

  onAddEdge: (
    source: string,
    target: string,
    weight: number
  ) => string | null;

  onRemoveEdge: (edgeId: string) => void;
}

export default function GraphEditorPanel({
  nodeCount,
  nodes,
  edges,
  onNodeCountChange,
  onAddEdge,
  onRemoveEdge,
}: GraphEditorPanelProps) {
  const [source, setSource] = useState("A");
  const [target, setTarget] = useState("B");
  const [weight, setWeight] = useState(1);
  const [removeEdgeId, setRemoveEdgeId] = useState(
    edges[0]?.id ?? ""
  );
  const [error, setError] = useState("");

  const selectedEdgeExists = edges.some(
    (edge) => edge.id === removeEdgeId
  );

  const activeRemoveEdgeId = selectedEdgeExists
    ? removeEdgeId
    : edges[0]?.id ?? "";

  function handleAddEdge() {
    const message = onAddEdge(
      source,
      target,
      weight
    );

    if (message) {
      setError(message);
      return;
    }

    setError("");
  }

  function handleRemoveEdge() {
    if (!activeRemoveEdgeId) {
      return;
    }

    onRemoveEdge(activeRemoveEdgeId);
    setRemoveEdgeId("");
    setError("");
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h2 className="text-lg font-semibold">
        Graph Editor
      </h2>

      <div className="mt-5 flex flex-wrap items-center gap-4">

        <div className="flex items-center gap-2">

          <span className="text-sm text-slate-400">
            Nodes
          </span>

          <button
            onClick={() =>
              onNodeCountChange(nodeCount - 1)
            }
            disabled={nodeCount <= 4}
            className="rounded bg-slate-700 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>

          <span className="min-w-8 text-center">
            {nodeCount}
          </span>

          <button
            onClick={() =>
              onNodeCountChange(nodeCount + 1)
            }
            disabled={nodeCount >= 12}
            className="rounded bg-slate-700 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>

        </div>

      </div>

      <div className="mt-5 border-t border-slate-800 pt-5">

        <h3 className="text-sm font-medium text-slate-300">
          Add Edge
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-3">

          <select
            value={source}
            onChange={(event) =>
              setSource(event.target.value)
            }
            className="rounded border border-slate-700 bg-slate-800 px-3 py-2"
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                Source: {node.label}
              </option>
            ))}
          </select>

          <select
            value={target}
            onChange={(event) =>
              setTarget(event.target.value)
            }
            className="rounded border border-slate-700 bg-slate-800 px-3 py-2"
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                Target: {node.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            max="99"
            value={weight}
            onChange={(event) =>
              setWeight(Number(event.target.value))
            }
            className="w-24 rounded border border-slate-700 bg-slate-800 px-3 py-2"
          />

          <button
            onClick={handleAddEdge}
            className="rounded bg-blue-600 px-4 py-2"
          >
            Add Edge
          </button>

        </div>

        {error && (
          <p className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}

      </div>

      <div className="mt-5 border-t border-slate-800 pt-5">

        <h3 className="text-sm font-medium text-slate-300">
          Remove Edge
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-3">

          <select
            value={activeRemoveEdgeId}
            onChange={(event) =>
              setRemoveEdgeId(event.target.value)
            }
            disabled={edges.length === 0}
            className="rounded border border-slate-700 bg-slate-800 px-3 py-2 disabled:opacity-40"
          >
            {edges.map((edge) => (
              <option key={edge.id} value={edge.id}>
                {edge.source} — {edge.target} ({edge.weight})
              </option>
            ))}
          </select>

          <button
            onClick={handleRemoveEdge}
            disabled={edges.length === 0}
            className="rounded bg-red-600 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Remove Edge
          </button>

        </div>

      </div>

      <div className="mt-5 border-t border-slate-800 pt-5">

        <p className="text-sm text-slate-500">
          Drag nodes directly in the graph to reposition them.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Graph: {nodes.length} nodes, {edges.length} edges
        </p>

      </div>

    </div>
  );
}