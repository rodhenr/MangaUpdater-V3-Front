import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
