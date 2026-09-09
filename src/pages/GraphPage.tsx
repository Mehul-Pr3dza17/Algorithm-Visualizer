import { useMemo, useState } from "react";

import type {
  GraphAlgorithm,
  GraphEdge,
  GraphNode,
} from "../types/visualizer";

import {
  createGraphLayout,
  type GraphLayout,
} from "../utils/graphLayout";

import { generateGraphSteps } from "../algorithms/graphs";
import { usePlayback } from "../hooks/usePlayback";

import GraphVisualizer from "../components/graph/GraphVisualizer";
import GraphEditorPanel from "../components/graph/GraphEditorPanel";
import InfoPanel from "../components/graph/InfoPanel";

const INITIAL_EDGES: GraphEdge[] = [
  { id: "AB", source: "A", target: "B", weight: 4 },
  { id: "AC", source: "A", target: "C", weight: 2 },
  { id: "BD", source: "B", target: "D", weight: 5 },
  { id: "CD", source: "C", target: "D", weight: 1 },
  { id: "CE", source: "C", target: "E", weight: 7 },
  { id: "DE", source: "D", target: "E", weight: 3 },
  { id: "DF", source: "D", target: "F", weight: 6 },
  { id: "EF", source: "E", target: "F", weight: 2 },
  { id: "FG", source: "F", target: "G", weight: 4 },
  { id: "GH", source: "G", target: "H", weight: 3 },
  { id: "EH", source: "E", target: "H", weight: 5 },
];

export default function GraphPage() {
  const [algorithm, setAlgorithm] =
    useState<GraphAlgorithm>("bfs");

  const [layout, setLayout] =
    useState<GraphLayout>("radial");

  const [nodes, setNodes] = useState<GraphNode[]>(
    () => createGraphLayout(8, "radial")
  );

  const [edges, setEdges] =
    useState<GraphEdge[]>(INITIAL_EDGES);

  const [startNodeId, setStartNodeId] =
    useState("A");

  const [speed, setSpeed] =
    useState(350);

  const steps = useMemo(
    () =>
      generateGraphSteps(
        algorithm,
        nodes,
        edges,
        startNodeId
      ),
    [algorithm, nodes, edges, startNodeId]
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
    value: GraphAlgorithm
  ) {
    setAlgorithm(value);
    reset();
  }

  function handleLayoutChange(
    value: GraphLayout
  ) {
    setLayout(value);

    setNodes(
      createGraphLayout(
        nodes.length,
        value
      )
    );

    reset();
  }

  function handleStartNodeChange(
    value: string
  ) {
    setStartNodeId(value);
    reset();
  }

  function handleNodeCountChange(
    count: number
  ) {
    const nextCount = Math.max(
      4,
      Math.min(12, count)
    );

    setNodes(
      createGraphLayout(
        nextCount,
        layout
      )
    );

    setEdges((currentEdges) =>
      currentEdges.filter((edge) => {
        const sourceIndex =
          edge.source.charCodeAt(0) - 65;

        const targetIndex =
          edge.target.charCodeAt(0) - 65;

        return (
          sourceIndex < nextCount &&
          targetIndex < nextCount
        );
      })
    );

    setStartNodeId((currentStart) => {
      const index =
        currentStart.charCodeAt(0) - 65;

      return index < nextCount
        ? currentStart
        : "A";
    });

    reset();
  }

  function handleAddEdge(
    source: string,
    target: string,
    weight: number
  ): string | null {
    if (source === target) {
      return "A node cannot connect to itself.";
    }

    if (
      !Number.isInteger(weight) ||
      weight < 1 ||
      weight > 99
    ) {
      return "Edge weight must be an integer from 1 to 99.";
    }

    const alreadyExists = edges.some(
      (edge) =>
        (edge.source === source &&
          edge.target === target) ||
        (edge.source === target &&
          edge.target === source)
    );

    if (alreadyExists) {
      return "That edge already exists.";
    }

    const [first, second] = [
      source,
      target,
    ].sort();

    setEdges((currentEdges) => [
      ...currentEdges,
      {
        id: `${first}${second}`,
        source,
        target,
        weight,
      },
    ]);

    reset();

    return null;
  }

  function handleRemoveEdge(
    edgeId: string
  ) {
    setEdges((currentEdges) =>
      currentEdges.filter(
        (edge) => edge.id !== edgeId
      )
    );

    reset();
  }

  function handleNodeMove(
    nodeId: string,
    x: number,
    y: number
  ) {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              x,
              y,
            }
          : node
      )
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Graph Algorithms
        </h1>

        <p className="mt-2 text-slate-400">
          Build a graph manually and visualize
          traversal and shortest-path algorithms.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">

        <div className="flex flex-wrap items-center gap-4">

          <select
            value={algorithm}
            onChange={(event) =>
              handleAlgorithmChange(
                event.target.value as GraphAlgorithm
              )
            }
            className="rounded border border-slate-700 bg-slate-800 px-3 py-2"
          >
            <option value="bfs">
              Breadth-First Search
            </option>

            <option value="dfs">
              Depth-First Search
            </option>

            <option value="dijkstra">
              Dijkstra
            </option>
          </select>

          <select
            value={layout}
            onChange={(event) =>
              handleLayoutChange(
                event.target.value as GraphLayout
              )
            }
            className="rounded border border-slate-700 bg-slate-800 px-3 py-2"
          >
            <option value="radial">
              Radial Layout
            </option>

            <option value="rectangular">
              Rectangular Layout
            </option>
          </select>

          <select
            value={startNodeId}
            onChange={(event) =>
              handleStartNodeChange(
                event.target.value
              )
            }
            className="rounded border border-slate-700 bg-slate-800 px-3 py-2"
          >
            {nodes.map((node) => (
              <option
                key={node.id}
                value={node.id}
              >
                Start: {node.label}
              </option>
            ))}
          </select>

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
            <span>
              Speed: {speed} ms
            </span>

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
              setSpeed(
                Number(event.target.value)
              )
            }
            className="w-full"
          />

        </div>

        <div className="mt-5">

          <div className="mb-2 flex justify-between text-sm text-slate-400">
            <span>
              Timeline
            </span>

            <span>
              Step {currentStep + 1} / {totalSteps}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={Math.max(
              totalSteps - 1,
              0
            )}
            value={currentStep}
            onChange={(event) =>
              seek(
                Number(event.target.value)
              )
            }
            className="w-full"
          />

        </div>

      </div>

      <GraphEditorPanel
        nodeCount={nodes.length}
        nodes={nodes}
        edges={edges}
        onNodeCountChange={
          handleNodeCountChange
        }
        onAddEdge={handleAddEdge}
        onRemoveEdge={
          handleRemoveEdge
        }
      />

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-8">

          <GraphVisualizer
            nodes={nodes}
            edges={edges}
            step={current}
            onNodeMove={
              handleNodeMove
            }
          />

        </div>

        <div className="col-span-4">

          <InfoPanel
            algorithm={algorithm}
            message={current.message}
            currentStep={currentStep}
            totalSteps={totalSteps}
            nodeCount={nodes.length}
            edgeCount={edges.length}
          />

        </div>

      </div>

    </div>
  );
}