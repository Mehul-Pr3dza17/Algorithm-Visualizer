import { motion } from "framer-motion";
import type { SortingArrayItem } from "../../types/visualizer";

interface Props {
  item: SortingArrayItem;
  width: number;
}

export default function Bar({
  item,
  width,
}: Props) {

  function getColor() {
    switch (item.state) {
      case "comparing":
        return "#f59e0b";

      case "swapping":
        return "#ef4444";

      case "sorted":
        return "#22c55e";

      case "pivot":
        return "#8b5cf6";

      default:
        return "#3b82f6";
    }
  }

  return (
    <motion.div
      layout
      transition={{
        layout: {
          duration: 0.22,
        },
      }}
      style={{
        width,
        height: `${item.value}%`,
        background: getColor(),
      }}
      className="rounded-t"
    />
  );
}