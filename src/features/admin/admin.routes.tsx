import { Route } from "react-router";
import { LayoutAdmin } from "./layouts/LayoutAdmin";
import { Home } from "./pages/Home";
import { Logs } from "./pages/Logs";
import { Manga } from "./pages/Manga";
import { MangaSource } from "./pages/MangaSource";
import { Queue } from "./pages/Queue";
import { Source } from "./pages/Source";

export const adminRoutes = (
  <Route path="/admin" element={<LayoutAdmin />}>
    <Route index element={<Home />} />
    <Route path="queue" element={<Queue />} />
    <Route path="logs" element={<Logs />} />
    <Route path="manga" element={<Manga />} />
    <Route path="source" element={<Source />} />
    <Route path="mangasource" element={<MangaSource />} />
  </Route>
);
