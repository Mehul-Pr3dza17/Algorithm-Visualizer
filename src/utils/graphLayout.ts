import type { GraphNode } from "../types/visualizer";

export type GraphLayout = "radial" | "rectangular";

export function createGraphLayout(
  nodeCount: number,
  layout: GraphLayout
): GraphNode[] {
  const labels = Array.from(
    { length: nodeCount },
    (_, index) => String.fromCharCode(65 + index)
  );

  if (layout === "radial") {
    const centerX = 450;
    const centerY = 280;
    const radius = Math.min(
      220,
      Math.max(150, nodeCount * 16)
    );

    return labels.map((label, index) => {
      const angle =
        (index / nodeCount) * Math.PI * 2 -
        Math.PI / 2;

      return {
        id: label,
        label,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });
  }

  const columns = Math.ceil(Math.sqrt(nodeCount));
  const rows = Math.ceil(nodeCount / columns);

  const horizontalSpacing =
    columns === 1 ? 0 : 700 / (columns - 1);

  const verticalSpacing =
    rows === 1 ? 0 : 400 / (rows - 1);

  return labels.map((label, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);

    return {
      id: label,
      label,
      x:
        columns === 1
          ? 450
          : 100 + column * horizontalSpacing,
      y:
        rows === 1
          ? 280
          : 80 + row * verticalSpacing,
    };
  });
}