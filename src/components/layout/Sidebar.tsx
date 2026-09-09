import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-8 text-2xl font-bold">

        Visualizer

      </h2>

      <nav className="space-y-3">


        <NavLink to="/sorting" className={linkStyle}>
           Sorting
        </NavLink>

        <NavLink to="/searching" className={linkStyle}>
           Searching
        </NavLink>

        <NavLink to="/graphs" className={linkStyle}>
           Graphs
        </NavLink>

      </nav>

    </aside>
  );
}