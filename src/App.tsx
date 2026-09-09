import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";


import SortingPage from "./pages/SortingPage";
import SearchingPage from "./pages/SearchingPage";
import GraphPage from "./pages/GraphPage";

import { Navigate } from "react-router-dom";

function App() {
  return (
   <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Navigate to="/sorting" replace />} />
    <Route path="sorting" element={<SortingPage />} />
    <Route path="searching" element={<SearchingPage />} />
    <Route path="graphs" element={<GraphPage />} />
  </Route>
</Routes>
  );
}

export default App;