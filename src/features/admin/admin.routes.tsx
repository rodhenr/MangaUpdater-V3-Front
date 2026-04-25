import { Route } from "react-router-dom";
import { RequireAdminAuth } from "./auth/RequireAdminAuth";
import { LayoutAdmin } from "./layouts/LayoutAdmin";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Logs } from "./pages/Logs";
import { Manga } from "./pages/Manga";
import { MangaSource } from "./pages/MangaSource";
import { Queue } from "./pages/Queue";
import { Source } from "./pages/Source";

export const adminRoutes = (
  <Route path="/admin">
    <Route path="login" element={<Login />} />
    <Route element={<RequireAdminAuth />}>
      <Route element={<LayoutAdmin />}>
        <Route index element={<Home />} />
        <Route path="queue" element={<Queue />} />
        <Route path="logs" element={<Logs />} />
        <Route path="manga" element={<Manga />} />
        <Route path="source" element={<Source />} />
        <Route path="mangasource" element={<MangaSource />} />
      </Route>
    </Route>
  </Route>
);
