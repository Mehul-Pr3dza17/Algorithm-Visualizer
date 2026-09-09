import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const title =
    pathname === "/sorting"
      ? "Sorting Algorithms"
      : pathname === "/searching"
      ? "Searching Algorithms"
      : "Graph Algorithms";

  return (
    <header className="flex h-16 items-center border-b border-slate-800 bg-slate-900 px-8">
      <h1 className="text-xl font-semibold">{title}</h1>
    </header>
  );
}