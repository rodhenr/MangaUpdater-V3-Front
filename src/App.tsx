import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Home from "./pages/Home";
import HomeAdmin from "./pages/admin/Home";
import Logs from "./pages/admin/Logs";
import Manga from "./pages/admin/Manga";
import MangaSource from "./pages/admin/MangaSource";
import Queue from "./pages/admin/Queue";
import Source from "./pages/admin/Source";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="queue" element={<Queue />} />
          <Route path="logs" element={<Logs />} />
          <Route path="manga" element={<Manga />} />
          <Route path="source" element={<Source />} />
          <Route path="mangasource" element={<MangaSource />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
