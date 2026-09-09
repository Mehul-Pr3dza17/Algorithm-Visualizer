import { useRef, useState } from "react";

import type {
  GraphNode,
  GraphEdge,
  GraphStep,
} from "../../types/visualizer";

interface GraphVisualizerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  step: GraphStep;
  onNodeMove: (
    nodeId: string,
    x: number,
    y: number
  ) => void;
}

export default function GraphVisualizer({
  nodes,
  edges,
  step,
  onNodeMove,
}: GraphVisualizerProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [draggingNodeId, setDraggingNodeId] =
    useState<string | null>(null);

  const nodeMap = new Map(
    nodes.map((node) => [node.id, node])
  );

  function getSvgPosition(
    clientX: number,
    clientY: number
  ) {
    const svg = svgRef.current;

    if (!svg) {
      return null;
    }

    const rect = svg.getBoundingClientRect();

    const x =
      ((clientX - rect.left) / rect.width) * 900;

    const y =
      ((clientY - rect.top) / rect.height) * 560;

    return {
      x: Math.max(35, Math.min(865, x)),
      y: Math.max(35, Math.min(525, y)),
    };
  }

  function handlePointerDown(
    event: React.PointerEvent,
    nodeId: string
  ) {
    event.preventDefault();

    setDraggingNodeId(nodeId);

    svgRef.current?.setPointerCapture(
      event.pointerId
    );
  }

  function handlePointerMove(
    event: React.PointerEvent
  ) {
    if (!draggingNodeId) {
      return;
    }

    const position = getSvgPosition(
      event.clientX,
      event.clientY
    );

    if (!position) {
      return;
    }

    onNodeMove(
      draggingNodeId,
      position.x,
      position.y
    );
  }

  function handlePointerUp(
    event: React.PointerEvent
  ) {
    if (
      svgRef.current?.hasPointerCapture(
        event.pointerId
      )
    ) {
      svgRef.current.releasePointerCapture(
        event.pointerId
      );
    }

    setDraggingNodeId(null);
  }

  return (
    <div className="h-[560px] overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

      <svg
        ref={svgRef}
        viewBox="0 0 900 560"
        className="h-full w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >

        {edges.map((edge) => {
          const source = nodeMap.get(edge.source);
          const target = nodeMap.get(edge.target);

          if (!source || !target) {
            return null;
          }

          const isVisited =
            step.visitedEdges.has(edge.id);

          const midpointX =
            (source.x + target.x) / 2;

          const midpointY =
            (source.y + target.y) / 2;

          return (
            <g key={edge.id}>

              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={
                  isVisited
                    ? "#22c55e"
                    : "#475569"
                }
                strokeWidth={
                  isVisited ? 4 : 2
                }
              />

              <rect
                x={midpointX - 10}
                y={midpointY - 13}
                width="20"
                height="18"
                rx="4"
                fill="#0f172a"
                opacity="0.9"
              />

              <text
                x={midpointX}
                y={midpointY}
                textAnchor="middle"
                className="fill-slate-300 text-xs"
              >
                {edge.weight}
              </text>

            </g>
          );
        })}

        {nodes.map((node) => {
          const isVisited =
            step.visitedNodes.has(node.id);

          const isCurrent =
            step.currentNodeId === node.id;

          let fill = "#3b82f6";

          if (isVisited) {
            fill = "#22c55e";
          }

          if (isCurrent) {
            fill = "#f59e0b";
          }

          const distance =
            step.distances[node.id];

          return (
            <g
              key={node.id}
              onPointerDown={(event) =>
                handlePointerDown(
                  event,
                  node.id
                )
              }
              className="cursor-grab active:cursor-grabbing"
            >

              <circle
                cx={node.x}
                cy={node.y}
                r={30}
                fill={fill}
                stroke="#e2e8f0"
                strokeWidth={2}
              />

              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="pointer-events-none fill-white text-sm font-semibold"
              >
                {node.label}
              </text>

              {distance !== undefined && (
                <text
                  x={node.x}
                  y={node.y + 48}
                  textAnchor="middle"
                  className="pointer-events-none fill-slate-400 text-xs"
                >
                  {distance === Infinity
                    ? "∞"
                    : distance}
                </text>
              )}

              <title>
                Node {node.label}
              </title>

            </g>
          );
        })}

      </svg>
    </div>
  );
}